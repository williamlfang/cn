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
   - 先安装 ruby1.9.1-dev,
    sudo apt-get install ruby1.9.1-dev
   - 再安装 rdiscount
    gem install rdiscount
