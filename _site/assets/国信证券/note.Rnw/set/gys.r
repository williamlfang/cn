#' Saves symbols (from an environment) to a specified directory
#' 
#' The files (one per symbol) are saved in \code{dir}. The file name
#' is the symbol itself, and the file extension is RData.
#' 
#' @param symbols The symbols
#' @param dir The destination folder (file system directory). It must exist.
#' @param env The environment containing the symbols
#' 
#' @examples
#' \dontrun{
#' data = new.env()
#' tickers = spl('SPY,EFA,EWJ,EEM,IYR,RWX,IEF,TLT,DBC,GLD,USO')
#' getSymbols(tickers, src="yahoo", from="1980-01-01", auto.assign=T, env=data)
#' save.symbols(tickers, "~/yahoo_data/", envir=data)
#' }
save.symbols = function(symbols, dir, env=parent.frame())
{
   for(each.symbol in symbols) {
      # Leading '^' (used for indexes, like ^DJI) is dropped when
      # quantmod constructs the variable name
      var.name = gsub('^\\^', '', each.symbol)
      save(list=var.name, file=paste(dir, '/', each.symbol, ".RData", sep=''), envir=env)
   }
}

#' Retrieves symbols from Yahoo using an intermidiate directory as a cache.
#' 
#' Loads symbols from a directory. If any of the symbols is not available,
#' a call to \code{getSymbols} is driven to download all symbols. The
#' downloaded symbols are saved to the specified directory before returning
#' them to the used (via the environment parameter).
#' 
#' If \code{force} is \code{TRUE}, then the symbols are downloaded regardless.
#' 
#' @param symbols The symbols
#' @param dir The destination folder (file system directory). It must exist.
#' @param env The environment used to return the symbols
#' @param force If true, the downloaded is performed
#' 
#' @examples
#' \dontrun{
#' data = new.env()
#' tickers = spl('SPY,EFA,EWJ,EEM,IYR,RWX,IEF,TLT,DBC,GLD,USO')
#' get.yahoo.symbols(tickers, "~/yahoo_data/", env=data)
#' }
get.yahoo.symbols = function(symbols, dir, env, force=FALSE) {
   # Leading '^' (used for indexes, like ^DJI) is dropped when
   # quantmod constructs the variable name
   var.names = gsub('^\\^', '', symbols)
   
   done = FALSE
   if(!force) {
      # Try the local cache first
      getSymbols(symbols, src="RData", ext="RData", dir=dir, env=env, auto.assign=TRUE)
      
      # Verify that we got all symbols, in which case we are done
      if(!any(is.na(match(var.names, ls(env))))) {
         done = TRUE
      }
   }
   
   if(!done) {
      # Either a symbol was not found in the cache, or the caller forced us to download and cache
      getSymbols(symbols, env=env, src="yahoo", from="1900-01-01", auto.assign=TRUE)
      for(ss in ls(env)) {
         # Adjust only for splits
         env[[ss]] = adjustOHLC(env[[ss]], use.Adjusted=F, adjust="split", symbol.name=symbols[as.numeric(match(ss, var.names))])
      }
      
      # Cache the symbols
      save.symbols(symbols, dir=dir, env=env)
   }
}

gyss = function(symbols, dir, env, force=FALSE) {
   if(missing(dir)) {
      dir = default.yahoo.dir
   }
   symbols = toupper(symbols)
   return(get.yahoo.symbols(symbols, dir, env, force))
}

adjust.yahoo.symbols = function(env) {
   for(ss in ls(env)) {
      env[[ss]] = adjustOHLC(env[[ss]], use.Adjusted=T)
   }
}

get.yahoo.symbol = function(symbol, dir, force=FALSE) {
   data = new.env()
   
   if(!force) {
      # Try the local cache first
      ss = getSymbols(symbol, src="RData", ext="RData", dir=dir, env=data, auto.assign=TRUE)
   }
   
   if(length(ls(data)) != 1) {
      ss = getSymbols(symbol, env=data, src="yahoo", from="1900-01-01", auto.assign=TRUE)
      data[[ss]] = adjustOHLC(data[[ss]], use.Adjusted=F, adjust="split", symbol.name=symbol)
      
      # Cache the symbols
      save.symbols(symbol, dir=dir, env=data)
   }
   
   return(data[[ss]])
}

default.yahoo.dir = "~/yahoo.data/"

gys = function(symbol, dir, force=FALSE) {
   if(missing(dir)) {
      dir = default.yahoo.dir
   }
   symbol = toupper(symbol)
   return(get.yahoo.symbol(symbol, dir, force))
}