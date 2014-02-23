---
layout: post
title: "不规范地简述一下JPEG原理"
description: ""
category: misc
tags: [jpeg]
---

最近在做水得一比的信安大赛，按指导老师要求，去看了JPEG相关的东西。这里稍微记录一下。

如果对JPEG的背景什么的感兴趣可以去看看 [JPEG的wiki页面](http://en.wikipedia.org/wiki/JPEG ) 。

说到JPEG，就不能不说DCT。

所谓[DCT (Discrete Cosine Transform)](http://en.wikipedia.org/wiki/Discrete_cosine_transform )，离散余弦变换，跟离散傅里叶变换类似，可以用来把时空域的数据变换到频域上。

这里直接说二维DCT变换，变换的输入是一个矩阵A（比如一个方阵，内容是0到255，即一个字节的整数）：
![jpeg-thoughts-mat-a.png](/assets/images/jpeg-thoughts/jpeg-thoughts-mat-a.png)
变换的输出是一个浮点数矩阵B ![jpeg-thoughts-mat-b.png](/assets/images/jpeg-thoughts/jpeg-thoughts-mat-b.png)
可以看到除了矩阵左上角以外，其他元素基本上都是0左右的数。如果把这些数全部取值为0得到B'，再做逆变换得到矩阵A'，可以发现，A'的每个元素值跟A的每个元素值差距不大。也就是说，A的能量，经过DCT，被很好的聚集到了B的左上角（实际上如果去看DCT-I的公式可以发现结果向量的第一个值实际上就是输入向量的所有元素的平均值）。位于(0, 0)的值就是DC系数，左上角的其他值可以被认为是低频的AC系数，除了左上角的值可以称为是高频的AC系数，由于人对低频信息敏感，对高频信息不敏感，也就可以认为原对于人来说，矩阵A的主要信息都在B（和B'）的左上角。

JPEG能压缩图片的最主要的原理就在DCT里面：经过DCT变换之后，再舍去一部分无关紧要的信息，这样就减少了要编码的信息的量，从而达到压缩的功能。

JPEG规范要求将输入图片（比如灰度图）按8x8分块，每块做DCT变换，然后舍去一些高频信息（也叫量化），然后编码器用熵编码之类的方法对量化过的信息进行无损压缩，也就是说JPEG的压缩损失来自于量化这一步，最后是编码器按照JPEG规范，使用规范好的语法和结构来写出合法的JPEG文件。

JPEG解码基本上是上面的逆变换。

用语和概念可能并不规范，甚至有误，请包涵。

