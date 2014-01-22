---
layout:   post
title:    Advanced R Programming:"Data Structure"
category: Programming 
tags:
- R
- Note
description: 
---

这一章主要介绍了在 **R** 中最基本的元素：数据。前段时间我在网上看到一个帖子（暂时忘记在哪里找到了），强调「data science」的重心不是在前面的那个「data」，而是后面的「science」。这是因为随着互联网的深入发展，我们现在不再是缺乏数据，反而是面临着「big data」造成的「information rich」（信息冗余）的困扰。因此，今后的数据科学应当更进一步的发展新的理论与方法来解决大数据分析。

好了，这个扯远了。不过在 **R** 中，我们最紧要的事情就是：给了一大箩筐的数据，可能是排列完整的，不过大多数情况下是混乱不堪的，要求对这些数据做统计分析与可视化工作。这个基本上是一件既头疼又心烦的苦差事。首先的任务是，先对这些数据做一定格局的处理，得到我们后续需要使用的信息变量。因此，熟练掌握处理数据的基本方法，对未来的分析至关重要。

## 概览

Wickham 用一张表格总结了  **R** 中的数据结构
> R's base data structures are summarised in the table below, organised by their dimensionality and whether they're homogeneous (all contents must be of the same type) or heterogeneous (the contents can be of different types):
>
> |    | Homogeneous   | Heterogeneous |
> |----|---------------|---------------|
> | 1d | Atomic vector | List          |
> | 2d | Matrix        | Data frame    |
> | nd | Array         |               |

需要解释的是标量（scalar）。什么是标量呢？就是一个个单独的变量，如



