setwd("/home/william/桌面/Thesis_XeTex/")

getwd()

##--------------------------
##-------- Time Series: packages
# install.packages(c("MASS","strucchange","zoo","sandwich","urca","lmtest","vars"))

library(MASS)
library(strucchange)
library(zoo)
library(sandwich)
library(urca)
library(lmtest)
library(MASS)
library(vars)

library(stargazer)
##--------------------------
par(cex.lab=0.9, cex.axis=0.9, cex.main=1.0)

data <- read.table("data", header = TRUE)

head(data)

data <- data[1:372,]    ## [1:372,-1]
                          ## [1:182,-1]
                          ## [183:372,-1]
summary(data)

n.data <- nrow(data)                  ## number of data

## maturity <- c(1, 3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 48, 60, 72, 84, 96, 108, 120)
maturity <- c(3,6, 9, 12, 15, 18, 21, 24, 30, 36,
         48, 60, 72, 84, 96, 108, 120)
n.maturity <- length(maturity)                  ## number of maturity

lambda <- 0.0609   ## As in Diebold-Li(2006)
#######################################
if (maturity[1]==3){
  yld <- as.matrix(data[,3:(3+n.maturity - 1)])
  n.my <- 3+n.maturity - 1
  my <- as.matrix(data[, (n.my+5):(n.my+21)])
}else{
  yld <- as.matrix(data[,2:(2+n.maturity - 1)])
  n.my <- 3+n.maturity - 1
  my <- as.matrix(data[, (n.my+3):(n.my+20)])
}

head(yld)
head(my)

M <- matrix(, nrow = n.maturity, ncol = 2) 
rownames(M) <- c("3m", "6m", "9m", "12m", "15m", "18m", "21m", "24m", "30m", "36m",
                 "48m", "60m", "72m", "84m", "96m", "108m", "120m")

for (i in 1:n.maturity){
  M[i,1] = ( 1 - exp( - lambda * maturity[i]) ) / ( lambda * maturity[i] )
  M[i,2] = ( 1 - exp( - lambda * maturity[i]) ) / ( lambda * maturity[i] ) - exp( - lambda * maturity[i]) 
}

Beta <- matrix(, nrow = n.data, ncol = 2)
colnames(Beta) <- c("beta2", "beta3")

for (i in 1:n.data){
  Beta[i,] <- coef( lm(yld[i, 1:n.maturity] ~ M -1) )
}

#beta2 <- ts(Beta[,1],start=c(1970, 1), end=c(2000, 12), frequency=12)
#beta3 <- ts(Beta[,2],start=c(1970, 1), end=c(2000, 12), frequency=12)
beta2 <- Beta[,1]
beta3 <- Beta[,2]

summary(Beta)

print(acf(beta2,lag=30))
print(acf(beta3,lag=30))

## ADF
beta2.adf1 <- summary(ur.df(beta2,type="trend",lags=2))
 beta2.adf1 

beta2.adf2 <- summary(ur.df(diff(beta2),type="drift",lags=1))
 beta2.adf2 

beta3.adf1 <- summary(ur.df(beta3,type="trend",lags=2))
beta3.adf1 

beta3.adf2 <- summary(ur.df(diff(beta3),type="drift",lags=1))
beta3.adf2 

## Josen Cointegation
summary(ca.jo(Beta, type = "eigen", ecdet = "trend", K = 2))
summary(ca.jo(Beta, type = "eigen", ecdet = "trend", K = 3))
## select lags
# VARselect(Beta, lag.max=8,type="both")

VARselect(diff(Beta), lag.max=8,type="both")
# stargazer(VARselect(diff(Beta), lag.max=8,type="both"))
BETA <- VAR(diff(Beta), p = 1, type="const")  ## diff, p = 1 

summary(BETA)
plot(BETA, equation="beta2")

summary(BETA, equation="beta3")
plot(BETA, equation="beta3")

plot(stability(BETA),nc=2)

arch2 <- arch.test(BETA)
plot(arch2)

## Forecasting:pred

BETA.predict <- predict(BETA, n.ahead = 132, ci = 0.95)
fanchart(BETA.predict)
#Impulse response analysis
par(mfrow=c(2,2))
BETA.irf <- irf(BETA, impulse = "beta2", n.ahead = 6, response = c("beta3"), boot =TRUE)
plot(BETA.irf)

BETA.irf <- irf(BETA, impulse = "beta3", n.ahead = 6, response = c("beta3"), boot =TRUE)
plot(BETA.irf)
##########################################
yld.tilde <- yld - Beta %*% t(M)

w <-matrix(, nrow = n.maturity, ncol = 1)  ## demographic loadings
for ( i in 1:n.maturity ){
  w[i] <- coef(lm(yld.tilde[,i] ~ my[,i] - 1))
}

yld.fit <- matrix(, nrow = n.data, ncol = n.maturity)
for (j in 1:n.data){
  for (i in 1:n.maturity){
    yld.fit[j,i] <- w[i] * my[j,i] + M[i,1] * Beta[j,1] + M[i,2] * Beta[j,2]
  }
}

M.tilde <- matrix(, nrow = 18, ncol = 3) 
rownames(M.tilde) <- c("1m","3m", "6m", "9m", "12m", "15m", "18m", "21m", "24m", "30m", "36m",
                 "48m", "60m", "72m", "84m", "96m", "108m", "120m")

for (i in 1:n.maturity){
  M.tilde[i,1] = 1
  M.tilde[i,2] = ( 1 - exp( - lambda * maturity[i]) ) / ( lambda * maturity[i] )
  M.tilde[i,3] = ( 1 - exp( - lambda * maturity[i]) ) / ( lambda * maturity[i] ) - exp( - lambda * maturity[i]) 
}

plot(maturity,.3*w,pch=25,col="blue",lwd=4, main="Laoding Factors",ylab="")
lines(maturity[1:8],.3*w[1:8],col="green",lwd=4)
lines(maturity[8:n.maturity],.3*w[8:n.maturity],col="yellow",lwd=4)

lines(maturity, M[,1], lwd=3,type="o")
lines(maturity, M[,2], lwd=3,type="o")
lines(maturity, rep(1,17), lwd=3,type="o")
abline(v=24,col="red", lwd=2)
abline(v=3,col="gray", lty = 4)
abline(h=0,col="red", lwd=2)
abline(h=1,col="gray", lwd=3)
text(28,-.68,"24M")
text(3,-.68,"3M")
text(15,-.28,"w-")
text(70,.5,"w+")

## Covariance-Coefficience matrix
cov.coef <- cbind(level.fit,slope.fit,curvature.fit,level,slope,curvature)
stargazer(cor(cov.coef))
## yld.tilde <- ts(yld.tilde,start=c(1970, 1), end=c(2000, 12), frequency=12)
##################
par(mfrow=c(2,2))
plot(maturity, yld[15,], xlab = "Maturity(months)", ylab = "Yield", main="Yield Curve on 03/31/1971", pch = 19, col = "blue")
lines(maturity, yld.fit[15,], lty = "dashed", lwd = 3, col = "red")

plot(maturity, yld[122,], ylim = c (8,16),xlab = "Maturity(months)", ylab = "Yield", main="Yield Curve on 02/28/1982",pch = 19, col = "blue")
lines(maturity, yld.fit[122,], lty = "dashed", lwd = 3, col = "red")

plot(maturity, yld[218,], xlab = "Maturity(months)", ylab = "Yield", main="Yield Curve on 02/28/1988",pch = 19, col = "blue")
lines(maturity, yld.fit[218,], lty = "dashed", lwd = 3, col = "red")

plot(maturity, yld[233,], xlab = "Maturity(months)", ylab = "Yield", main="Yield Curve on 05/31/1989",pch = 19, col = "blue")
lines(maturity, yld.fit[233,], lty = "dashed", lwd = 3, col = "red")
##################
level <- ts(data[,41],start=c(1970, 1), end=c(2000, 12), frequency=12)
slope <- ts(data[,42],start=c(1970, 1), end=c(2000, 12), frequency=12)
curvature <- ts(data[,43],start=c(1970, 1), end=c(2000, 12), frequency=12)

head(level)
head(slope)
head(curvature)

yld.tilde <- ts(yld.tilde,start=c(1970, 1), end=c(2000, 12), frequency=12)
level.fit <- ts(yld.tilde[,n.maturity],start=c(1970, 1), end=c(2000, 12), frequency=12)
slope.fit <- ts(-Beta[,1],start=c(1970, 1), end=c(2000, 12), frequency=12)
curvature.fit <- ts(-Beta[,2],start=c(1970, 1), end=c(2000, 12), frequency=12)
##################

##################
par(mfrow=c(3,1))

plot.ts(.5*level, ylab = "", xlab="", main="Level",pch = 19, col = "blue", lwd = 3)
lines(level.fit, lty = "dashed", lwd = 3, col = "red")

plot.ts(slope,ylim = c(-10, 5), ylab = "", xlab="", main="Slope" ,pch = 19, col = "blue", lwd = 3)
lines(3.2+slope.fit, lty = "dashed", lwd = 3, col = "red")

plot.ts(5 * curvature, ylim = c(-10, 20),  ylab = "", xlab="", main="Curvature" ,pch = 19, col = "blue", lwd = 3)
lines( -25+ -1 * curvature.fit, lty = "dashed", lwd = 3, col = "red")

##################

##################
par(mfrow=c(1,1))
   plot(yld.tilde[,1],col=1, ylim=c(-3,7), ylab = "Yiled(%)", lwd=1)
   for (i in 2:(n.maturity)){
     lines(yld.tilde[,i], col = i, lwd=1)
   }
   lines(.5*level, ylab = "Level", xlab="",lwd=4, col = "blue")
   lines(level.fit, lty = "dashed", lwd = 5, col = "red")
##################plot(maturi

##################
par(mfrow=c(3,1))

plot.ts(.5*level, main="Short Term",ylab = "Level", xlab="",col = "blue",lwd=4)
lines(3+yld.tilde[,1], lty = "dotted", lwd = 3, col = "gray")
lines(3+yld.tilde[,2], lty = "dotdash", lwd = 3, col = "brown")
lines(3+yld.tilde[,3], lty = "dashed", lwd = 3, col = "red")

plot.ts(.5*level, main="Medium Term", ylab = "Level", xlab="",col = "blue",lwd=4)
lines(5+yld.tilde[,9], lty = "dotted", lwd = 3, col = "gray")
lines(5+yld.tilde[,10], lty = "dotdash", lwd = 3, col = "brown")
lines(5+yld.tilde[,11], lty = "dashed", lwd = 3, col = "red")

plot.ts(.5*level, main="Long Term", ylab = "Level", xlab="",col = "blue",lwd=4)
lines(yld.tilde[,15], lty = "dotted", lwd = 3, col = "gray")
lines(yld.tilde[,16], lty = "dotdash", lwd = 3, col = "brown")
lines(yld.tilde[,17], lty = "dashed", lwd = 3, col = "red")
##################

##################
par(mfrow=c(2,2))
plot(tau, yld[25,],pch=19,main="上升的收益率曲线：01/31/1972",ylab="Yield(%)",xlab="Maturity")

plot(tau, yld[347,],pch=19,main="持平的收益率曲线：11/31/1998",ylab="Yield(%)",xlab="Maturity")

plot(tau, yld[138,],pch=19,main="下降的收益率曲线：06/30/1981",ylab="Yield(%)",xlab="Maturity")

plot(tau, yld[364,],pch=19,main="马鞍型的收益率曲线：04/28/2000",ylab="Yield(%)",xlab="Maturity")

##################
par(mfrow=c(2,2))

p1 <- ggplot(data.frame(tau, yld[25,]),aes(tau, yld[25,]),geom_point())

p2 <- ggplot(data.frame(tau, yld[25,]),aes(tau, yld[25,]),geom_point())


p <- ggplot(tau, yld[347,],pch=19,main="持平的收益率曲线：11/31/1998",ylab="Yield(%)",xlab="Maturity")

p <- ggplot(tau, yld[138,],pch=19,main="下降的收益率曲线：06/30/1981",ylab="Yield(%)",xlab="Maturity")

p <- ggplot(tau, yld[364,],pch=19,main="马鞍型的收益率曲线：04/28/2000",ylab="Yield(%)",xlab="Maturity")

##################
##################
par(mfrow=c(1,1))

yld.aver <- rep(0,n.maturity)
yld.fit.aver <- rep(0,n.maturity)
for (i in 1:n.maturity){
  yld.aver[i] <- mean(yld[1:182,i])
  yld.fit.aver[i] <- mean(yld.fit[1:182,i])
}

plot(maturity, yld.aver, ylim=c(7.8,9),xlab = "Maturity(months)", ylab = "Yield", main="Average Yield Curve: Actual vs Fitted", cex.lab=0.8, cex.axis=0.7, cex.main=1.0,pch = 19, col = "blue", lwd = 3)
lines(maturity, yld.fit.aver, lty = "dashed", lwd = 3, col = "red")
##################

##################
summary(Beta)
beta2 <- Beta[,1]
##################
