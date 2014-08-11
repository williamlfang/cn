## vars.R

setwd("/home/william/桌面/Thesis_XeTex/")
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

data.all <- data[1:372,]
data <- data[1:300,]    ## 1970,01 -- 1989,12

n.data <- nrow(data)                  ## number of data

## maturity <- c(1, 3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 48, 60, 72, 84, 96, 108, 120)
maturity <- c(3,6, 9, 12, 15, 18, 21, 24, 30, 36,
              48, 60, 72, 84, 96, 108, 120)
n.maturity <- length(maturity)                  ## number of maturity

lambda <- 0.0609   ## As in Diebold-Li(2006)
#######################################

  yld <- as.matrix(data[,3:(3+n.maturity - 1)])
  n.my <- 3+n.maturity - 1
  my <- as.matrix(data[, (n.my+5):(n.my+21)])

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

# VARselect(Beta, lag.max=8,type="both")

VARselect(diff(Beta), lag.max=8,type="both")
# stargazer(VARselect(diff(Beta), lag.max=8,type="both"))
BETA <- VAR(Beta, p = 2, type="none")  ## diff, p = 1 

summary(BETA)
plot(BETA, equation="beta2")

summary(BETA, equation="beta3")
plot(BETA, equation="beta3")

plot(stability(BETA),nc=2)

arch2 <- arch.test(BETA)
plot(arch2)

## Forecasting:pred

BETA.predict <- predict(BETA, n.ahead = 72, ci = 0.95)
plot(BETA.predict,name="beta2",main="Out-of-sample Predict value: Slope")
fanchart(BETA.predict,name="beta2",main="Out-of-sample Predict value: Slope")

plot(BETA.predict,name="beta3",main="Out-of-sample Predict value: Curvature")
fanchart(BETA.predict,name="beta3",main="Out-of-sample Predict value: Curvature")

beta2.predict <- BETA.predict$fcst$beta2
#beta2.pred <- matrix(1, nrow = 72, ncol = 1)
#for (i in 1:72){
#  beta2.pred[i] <- cumsum(beta2.predict[i]) + 1.77967415
#}

beta3.predict <- BETA.predict$fcst$beta3
#beta3.pred <- matrix(1, nrow = 72, ncol = 1)
#for (i in 1:72){
#  beta3.pred[i] <- cumsum(beta3.predict[i]) + 1.77967415
#}
##########################################
print(BETA.predict, name="Beta")

##############################################################################
# 3m 
my.pred <- data.all[301:372,24:40]
yld.pred.3m <- matrix(, nrow = 72, ncol = 1)

for(i in 1:72){
  yld.pred.3m[i,] <- w[12] * my.pred[i,12] + M[12,1] * beta2.pred[i] + M[12,2] * beta3.pred[i]
}

yld.actual.3m <- data.all[301:372,19] 

plot(yld.pred.3m)
plot(yld.actual.3m)

##############################################################################


lines(yld.actual.3m)

## install.packages(c("dse","tframe","setRNG","tfplot"))
library(tframe)
library(setRNG)
library(tfplot)
library(dse1)

library(MASS)
library(strucchange)
library(zoo)
library(sandwich)
library(urca)
library(lmtest)
library(MASS)
library(vars)

Apoly <- array(c(1.0, -0.5, 0.3, 0,0.2, 0.1, 0, -0.2, 0.7, 1, 0.5, -0.3) , c(3, 2, 2))
B <- diag(2)
var2 <- ARMA(A = Apoly, B = B)
varsim <- simulate(var2, sampleT = 500, noise = list(w = matrix(rnorm(1000), nrow = 500, ncol = 2)),rng = list(seed = c(123456)))
vardat <- matrix(varsim$output,nrow = 500, ncol = 2)
colnames(vardat) <- c("y1", "y2")
infocrit <- VARselect(vardat, lag.max = 3,type = "const")
varsimest <- VAR(vardat, p = 2,type = "none")
roots <- roots(varsimest)

predictions <- predict(varsimest, n.ahead = 50)
plot(predictions)
fanchart(predictions)
