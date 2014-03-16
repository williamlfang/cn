---
layout:   post
title:    "庖丁解牛之 Ito 公式"
category: 金融数学 
tags:     
- Ito
- 股票
- 价格
description: 
published: false
status:    process
---

假设股票价格的变化服从以下运动方程（随机微分方程，SDE）：
$$
\begin{align}
 d S_t = \mu S_t dt + \sigma S_t dW_t,
\end{align}
$$
其中 $dW_t$ 是一个（连续的）**Brownian motion**，$W_t \sim \mathcal{N} (0, t)$。等价的，我们可以得到股票价格变化率：
$$
\begin{align}
 d \ln S_t = \frac{ d S_t }{ S_t } = \mu dt + \sigma dW_t.
\end{align}
$$

下面我们来推到股票价格 $S_t$ 的动态方程，这主要是使用著名的 **Ito 公式**。过于理论的东西我在这里不推导了，主要是利用一个简单的例子来说明如何使用 **Ito 公式** 解 **SDE** 类问题。

<!-- more -->

## Ito 公式求解

首先，令 $Y_t = ln S_t$，由简单的偏微分求导得到
$$
\begin{align}
\frac{ \partial Y }{ \partial t} &= 0 \\
\frac{ \partial Y }{ \partial S} &= \frac{ 1 }{ S } \\
\frac{ \partial^2 Y }{ \partial S^2} &= - \frac{ 1 }{ S^2 } \\
\end{align}
$$
则根据 **Ito 公式**，我们可以推出以下方程
$$
\begin{align}
 d \ln S_t = d Y_t 
  &= \frac{ \partial Y }{ \partial t} dt + \frac{ \partial Y }{ \partial S} dS_t + \frac{1}{2} \frac{ \partial^2 Y }{ \partial S^2} dS_t dS_t \\
  &= 0 · dt + \frac{ 1 }{ S_t } dS_t - \frac{1}{2} · \frac{ 1 }{ S_t^2 } dS_t dS_t \\
  &=  \frac{ 1 }{ S_t } · S_t · (\mu dt + \sigma dW_t) - \frac{1}{2} · \frac{ 1 }{ S_t^2 } · \sigma^2 S_t^2 dt
 \\
  &= (\mu - \frac{1}{2} \sigma^2) dt + \sigma dW_t. \\
\end{align}
$$
两边求积分，得到如下式子
$$
\begin{align}
 \int_{0}^{t} d \ln S_u = \int_{0}^{t} d Y_u 
    &= \int_{0}^{t}  (\mu - \frac{1}{2} \sigma^2) du + \int_{0}^{t}  \sigma dW_u \\
\Rightarrow \ln S_t - \ln S_0 = Y_t - Y_0 &= (\mu - \frac{1}{2} \sigma^2) t + \int_{0}^{t}  \sigma dW_u.
\end{align}
$$
我们知道，**Brownian Motion** 表示在一定时间段内随机游走走过的路径，并且如果我们假定在初始阶段为 $W(0)=0$，那么，上面等式的最后一项是
$$
\begin{align}
\int_{0}^{t}  \sigma dW_u &= \sigma (W_t - W_0 ) = \sigma W_t.
\end{align}
$$

因此，我们有
$$
\begin{align}
 \ln S_t - \ln S_0 = Y_t - Y_0 &= (\mu - \frac{1}{2} \sigma^2) t + \sigma W_t \\
  \Rightarrow Y_t &= Y_0 + (\mu - \frac{1}{2} \sigma^2) t + \sigma W_t \\
 \Rightarrow S_t &= S_0 · \exp\{  (\mu - \frac{1}{2} \sigma^2) t + \sigma W_t  \}.
\end{align}
$$

## 几何布朗运动

我们知道，对于任何一个正态分布做线性转换后依然服从正态分布。由于布朗运动 $W_t \sim \mathcal{N} (0, t)$，则
$$
\begin{align}
  Y_t &= Y_0 + (\mu - \frac{1}{2} \sigma^2) t + \sigma W_t \\
\Rightarrow E[Y_t|Y_0] &= E[ Y_0 + (\mu - \frac{1}{2} \sigma^2) t + \sigma W_t] \\
                       &= Y_0 + (\mu - \frac{1}{2} \sigma^2) t + \underbrace{E[\sigma W_t]}_{0} = Y_0 + (\mu - \frac{1}{2} \sigma^2) t \\
\Rightarrow Var[Y_t|Y_0] &= Var [\sigma W_t] = \sigma^2 Var(Wt) = \sigma^2 ·t \\
\Rightarrow Y_t &\sim \mathcal{N}(  Y_0 + (\mu - \frac{1}{2} \sigma^2) t, \sigma^2 t  ) \label{gbm_norm}
\end{align} 
$$

那么，$\ln S_t = Y_t$ 则服从 **正态分布**，则 $S_t = e^{Y_t}$服从 *log-normal disctribution*，即 $\ln S_t \sim \mathcal{N} (E[S_t], Var[S_t])$.

下面我们来推导 $S_t$ 的分布特征。

### Moment Generation Function

我们知道，对于对任何一个随机变量建模，往往需要假设该变量服从某一类随机过程，而这个随机过程由分布函数（distribution function）给定。可是，有些时候，我们并不一定需要知道整个分布函数的具体形式，而只是关注该随机变量的几个「统计特征」，如一阶矩、二阶矩等。下面要介绍的「矩条件生成函数」就针对这种情况提出的。随机变量的矩条件可以在 **Moment Generation Function** (MGF) 十分方便的推导出来。比如，对于正态分布，我们只需要知道一阶矩和二阶矩条件就可以对变量做统计推断（method of moment, MM，还有更一般的 GMM）。

对于一个**可测空间** $(\Omega, \mathcal{F}, P)$，随机变量 $X \in \sigma(\mathcal{F})$ 的 MGF 定义为
$$
\begin{align}
 M_{X}(\tau) &= E[ e^{x\tau}] = \int_{\Omega} e^{x(\omega)\tau} dP(\omega)
\end{align}
$$
其任一 $m-$ 阶的矩公式可以对 $\tau$ 在 $\tau = 0$ 处求 $m$ 次导数得到
$$
\begin{align}
  \frac{\partial M_{X}(\tau)}{\partial \tau}|_{\tau = 0} 
  &=   \frac{\partial}{\partial \tau} E[ e^{x\tau}] |_{\tau = 0}  
  =  E[ x · e^{x\tau}] |_{\tau = 0}    \\
  &= E[x] \\
   \frac{\partial ^2 M_{X}(\tau)}{\partial \tau ^2 }|_{\tau = 0} 
 &= E[x^2] \\
 \frac{\partial ^m M_{X}(\tau)}{\partial \tau ^m }|_{\tau = 0} 
 &= E[x^m]
\end{align}
$$
特别的，对于一个正态分布，$X \sim \mathcal{N}(\mu, \sigma^2)$，有
$$
\begin{align}
  M_{X}(\tau) &= E[ e^{x\tau}] = \exp\{ \mu \tau + \frac{1}{2} \sigma^2 \tau^2 \}
\end{align} \\
$$

### 期望与方差

这个特征对于求一个「对数正态分布」十分有用。由$\ref{gbm_norm}$
$$
\begin{align}
  Y_t &\sim \mathcal{N}(  Y_0 + (\mu - \frac{1}{2} \sigma^2) t, \sigma^2 t  ) 
\end{align}
$$
则其 MGF 为
$$
\begin{align}
 M_{Y}(\tau) &= E[e^{y\tau}] = \exp\{ \tilde{\mu} \tau + \frac{1}{2} \tilde{\sigma}^2 \tau^2 \},
\end{align}
$$
其中，$\tilde{\mu} = Y_0 + (\mu - \frac{1}{2} \sigma^2) t$，$\tilde{\sigma}^2= \sigma ^2 t$ .

因此，我们可以得到如下公式
$$
\boxed{
 \begin{align}
  E[S^{\tau}] &=  E[e^{y\tau}]  = \exp\{ \tilde{\mu} \tau + \frac{1}{2} \tilde{\sigma}^2 \tau^2 \}
 \end{align}
}
$$

即，期望可以表示为
$$
\boxed{
 \begin{align}
  E[S_t] &=  E[e^{y\tau}]|_{\tau = 1}  = \exp\{ \tilde{\mu}  + \frac{1}{2} \tilde{\sigma}^2  \}  \\
        &= \exp\{ Y_0 + (\mu - \frac{1}{2} \sigma^2) t + \frac{1}{2} \sigma^2 t  \} \\
        &= S_0 · e^{\mu t } \\
\end{align}
}
$$

$$
\boxed{
 \begin{align}
  E[S^2] &= E[e^{y\tau}]|_{\tau = 2}  = \exp\{ 2 \tilde{\mu}  + 2 \tilde{\sigma}^2  \} \\
  &= \exp\{ 2 [Y_0 + (\mu - \frac{1}{2} \sigma^2) t ] + 2 \sigma^2 t \}   \\
  &= S_0^2 · \exp\{ 2 \mu t + \sigma^2 t\}
 \end{align}
}
$$

因此，$S_t$ 的方差可以表示为
$$
\boxed{
 \begin{align}
  Var[S_t] 
  &=   E[S^2] -  ( E[S] )^2 \\
  &= S_0^2 · \exp\{ 2 \mu t + \sigma^2 t\} - S_0^2 · \exp\{ 2 \mu t \} \\
  &= S_0^2 · e^{ 2 \mu t } · (e^{ \sigma^2 t - 1 })
 \end{align}
}
$$











