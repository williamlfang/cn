---
layout:   post
title:    "使用 Rmarkdown 发表博客"
category: Tech 
tags:     [R,Rmarkdown]
description: 
published: true
status: publish
---
 
1. 将文件 `rmd.sh` 与 `rmarkdown.r` 需要运行 `.R` 程序的地方，这样我们以后就可以直接运行 `rmd.sh` 来自动的转化 `.Rmd` 为 `.md` 格式。
 
 如果想要具体的设置，我们可以
  - 首先在目录下建立一个 `image` 文件用于存放图片
  - 定义图片文件的链接，`images.url='/cn/_post/images/'`，也就是将来直接发布时的图片链接。
 
2. 需要在 `YAML` 前面写入
  - `published: false`:也没有发表
  - `status:    process`：运行 `rmd.sh` 后会自动改为 `published`。
 
比如这个 `R` 代码

    x = rnorm(100)
    plot(density(x))

![plot of chunk unnamed-chunk-1](/cn/_posts/images/figs/2014-01-24-shi-yong--rmarkdown--fa-biao-bo-ke/unnamed-chunk-1.png) 

 
 
