---
layout:     post
title:      本本的"转型"
category:   
- Tech
tags: 
- Linux
- Github
- Jekyll
- 博客
description: 
---

## 换系统

最近给这台老机子换了一个新系统.多年前买的一个笔记本,折旧损耗的严重,配置也不能满足当下的计算需要.想着是不是该从Win8换回XP,想来如此可能会提高些运行速度.可是听说微软竟然在不久前就宣布停止对XP的更新维护.一想到我这脆弱的本本与孱弱的数据,不免心生忧虑.

### Windows -> Linux

然后就想到了对硬件配置没那么高要求的Linux系统.这个是一个开源系统(话说当今最实用的软件基本上都或多或少的属于开源项目),以前在Win系统时是装在虚拟机上运行的,当时用的是Red Hat,貌似版本不是很好,试试了就放弃了.这次既然对Win不再抱有任何幻想,那就痛定思痛,直接安装Linux.

第一次是使用Ubuntu 13.04,有遇到过死机的,而且是Unixy界面,刚从Win系统转移阵地,当真有许多的不习惯.然后在[Stackover](http://stackoverflow.com/)上得到启发,可以先使用Linux Mint的KDE版本,基本上是模范Win的操作界面,对于新手比较直观明了.

这就是我目前的操作系统了:[Linux Mint 16 "Petra"](http://www.linuxmint.com/).以后有机会再写一个post单独谈谈如何安装系统的问题.

### 自由软件体

在步入Linux大队伍后,我也逐渐开始接触自由软件项目(Free Software Programs).

其实最早我接触到的自由软件体是Latex文档编辑系统.当初课程老师要求term paper必须是使用Tex编辑的,无奈之下从Office搬家,开始使用Latex处理文档.那时是一个阵的痛苦啊,对着花花的满屏幕代码.好在有google这个科研神器,在不时的google一下后,好歹是把term paper给整出了一个看起来还是有点econ专业的模样.

然后是[R](http://www.r-project.org/),最早是在Time Series Analysis课程中使用.这个软件在统计分析是算是轻量级的,不比Matlab之庞大,SAS之冗余,而且有一个广泛而活跃的社区可以寻求帮助,免费得到最前沿的数据分析包.

而目前我在捣鼓着Git.

## Git与Github

Git是一个分散化的版本管理系统(DVCS),最早是用于处理Linux的远程协作编程,后来开始在编程社区逐渐受到关注,在程序猿们广泛流传.而Github就相当于给Git安装了一个在线的存储系统,用于远程协同,相当于码农们的Facebook.

## Jekyll

> Transform your plain text into static websites and blogs.

## 使用 Github 和 Jekyll 发表博客

以下是在 Linux 系统下的 bash 命令语句:

### 复制库到本地磁盘

从 github 将项目 (project) 复制 (fork) 到本地磁盘中,基本格式是:

    git clone git@github.com:USERNAME/USERNAME.github.com.git TARGETED_FILE
    
    git clone git@github.com:USERNAME/Project_Name.git TARGETED_FILE

其中,TARGETED_FILE 通常是以 USERNAME.github.com.git 作为存放目录.

- /home/william/williamlfang.github.com. 

    git clone git@github.com:williamlfang/williamlfang.github.com.git williamlfang.github.com

- /home/william/cn

    git clone git@github.com:williamlfang/cn.git cn

- /home/william/en

    git clone git@github.com:williamlfang/en.git en


###  更改项目文件

对于修改的文件,如果想要将其上传到 Github 空间存储,需要经过如下几个步骤

#### williamlfang.github.com

    cd /home/william/williamlfang.github.com        # 指定路径
    git add . -A           # 上传全部文件 -A
    git commit -m ""       #  加上注解说明有助于日后维护:-m
    
    git remote rm origin   # 删除历史保存
    git remote add origin git@github.com:williamlfang/williamlfang.github.com.git
    git push origin master
    
    jekyll --server        # 在本地文件预览效果, 可打开: 127.0.0.1:4000

#### cn

    cd /home/william/cn
    git add . -A
    git commit -m ""
    
    git remote rm origin
    git remote add origin git@github.com:williamlfang/cn.git
    git push origin gh-pages
    
    jekyll --server

#### en

    cd /home/william/en
    git add . -A
    git commit -m ""
    
    git remote rm origin
    git remote add origin git@github.com:williamlfang/en.git
    git push origin gh-pages
    
    jekyll --server


## FAQ

### TCPServer Error: Address already in use

Solution:

1. 在终端输入

    lsof -wni tcp:4000

2. 关闭 PID 

    kill -9 PID

3. 重新生成

    jekyll --server
