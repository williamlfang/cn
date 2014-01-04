---
layout:     post
title:      Github 的一些设置技巧
category:   
- Tech
tags: 
- Github
- Jekyll
- SSH
description: 
---

## Git与Github
----

Git是一个分散化的版本管理系统(DVCS),最早是用于处理Linux的远程协作编程,后来开始在编程社区逐渐受到关注,在程序猿们广泛流传.而Github就相当于给Git安装了一个在线的存储系统,用于远程协同,相当于码农们的Facebook.

## Jekyll

> Transform your plain text into static websites and blogs.


## 使用 Github 和 Jekyll 发表博客
----

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
----

### TCPServer Error: Address already in use

Solution:

1. 在终端输入

    lsof -wni tcp:4000

2. 关闭 PID 

    kill -9 PID

3. 重新生成

    jekyll --server


### SSH 错误
----
*引用*:[原文连接](http://blog.csdn.net/keyboardota/article/details/7603630)

> 问题:在新的电脑系统中,首次生成SSH, 系统会报下面的错误：<br>
> Permission denied (publickey). <br>
fatal:The remote end hung up unexpectedly <br>

> Solution:这时需要在本地创建SSH key，然后将生成的SSH key文件内容添加到github帐号上去。

创建SSH key的方法很简单，执行如下命令就可以：
- ssh-keygen
- 然后系统提示输入文件保存位置等信息，连续敲三次回车即可，生成的SSH key文件保存在中～/.ssh/id_rsa.pub

然后用文本编辑工具打开该文件，我用的是gedit,所以命令是：
gedit ~/.ssh/id_rsa.pub

接着拷贝.ssh/id_rsa.pub文件内的所以内容，将它粘帖到github帐号管理中的添加SSH key界面中。

打开github帐号管理中的添加SSH key界面的步骤如下：

1. 登录github
2. 点击右上方的Accounting settings图标
3. 选择 SSH key
4. 点击 Add SSH key
5. 在出现的界面中填写SSH key的名称，填一个你自己喜欢的名称即可，然后将上面拷贝的~/.ssh/id_rsa.pub文件内容粘帖到key一栏，在点击“add key”按钮就可以了。

添加过程github会提示你输入一次你的github密码

添加完成后再次执行git clone就可以成功克隆github上的代码库了。


### rdiscount 安装错误
----
> 问题:在使用'jekyll --server'出现如下错误    <br>
  ? [suod] gem install rdiscount    <br>
  而如果真的这么干,却出现另外的错误提示   <br>
  > ERROR: Error installing rdiscount:    <br>
    ERROR: Failed to build gem native extension.

> Solution:   <br>
   - 先安装 ruby1.9.1-dev,    <br>
    sudo apt-get install ruby1.9.1-dev     <br>
   - 再安装 rdiscount    <br>
    gem install rdiscount
