## ggplot2.R

## install.packages(c("ggplot2","quantmod"),dependencies=TRUE)
library(ggplot2,quantmod)

library(quantmod)
library(ggplot2)
getSymbols('^SSEC',src='yahoo',from = '1997-01-01')
close <- (Cl(SSEC))
time <- index(close)
value <- as.vector(close)
g <- ggplot(data.frame(time,value),aes(time,value))
g + geom_line()



g <- ggplot(data.frame(maturity,w),aes(maturity,w))
g + geom_line()
