setwd("/home/william/桌面/Thesis_XeTex/")

getwd()

data <- read.table("data", header = TRUE)

head(data)

summary(data[1:372,-1])

##################
 yld1 <- data$yld1[1:372]    ## no. = 372
 my1 <-data$my1[1:372]
 lmout <- lm(yld1 ~ my1 -1)

 omega1 <- coef(lmout)
##################

##################
 yld <- as.matrix(data[1:372,2:19])
 my <- as.matrix(data[1:372,23:40])

 w <- rep(0, 18)  ## demographic loadings
 for ( i in 1:18 ){
   w[i] <- coef(lm(yld[,i] ~ my[,i] ))
 }
##################

##################
 yld.tilde <- yld - my %*% diag(w)
 gm
 head(yld.tilde)
##################

##################
head( data$yld24[1:372] - data$my24[1:372] * w[9] )
##################

##################
 M <- matrix(, nrow = 18, ncol = 4) 
 rownames(M) <- c("1m", "3m", "6", "9m", "12m", "15m", "18m", "21m", "24m", "30m", "36m",
                  "48m", "60m", "72m", "84m", "96m", "108m", "120m")
 M[,1] <- rep(1,18)
 M[,2] <- w
 lambda <- 0.0609   ## As in Diebold-Li(2006)
 tau <- c(1, 3, 6, 9, 12, 15, 18, 21, 24, 30, 36,
          48, 60, 72, 84, 96, 108, 120)
 for (i in 1:18){
   M[i,3] = ( 1 - exp( - lambda * tau[i]) ) / ( lambda * tau[i] )
   M[i,4] =  ( 1 - exp( - lambda * tau[i]) ) / ( lambda * tau[i] ) +
            - exp( - lambda * tau[i]) 
 }
 
 theta <- matrix(, nrow = 372, ncol = 4)
 colnames(theta) <- c("u","MY", "beta1", "beta2")
 for (i in 1:372){
   theta[i,] <- coef( lm(yld.tilde[i, 1:18] ~ M -1) )
 }
 
##################

##################
 par(mfrow=c(2,2), mar=c(4,4,2,2))
 plot(tau, yld[25,], xlab = "Maturity(months)", ylab = "Yield", pch = 19, col = "blue")
 lines(M*theta[25])

plot(tau, yld[75,], ylim = c(5,11), xlab = "Maturity(months)", ylab = "Yield", pch = 19, col = "blue")
 
 par(mfrow=c(1,1))
 plot(tau, yld[231,],xlab = "Maturity(months)", ylab = "Yield", pch = 19, col = "blue")
##################

##################
par(mfrow=c(1,1))
plot(tau, yld[25,], ylim = c(3,7), xlab = "Maturity(months)", ylab = "Yield", pch = 19, col = "blue")
yld.fit <- M %*% theta[25,]
lines(tau, yld.fit)
##################=]

##################
par(mfrow=c(1,1))
plot(tau, yld[158,], ylim = c(6,12), xlab = "Maturity(months)", ylab = "Yield", pch = 19, col = "blue")
yld.fit <- M %*% theta[158,]
lines(tau, yld.fit+8)
##################



