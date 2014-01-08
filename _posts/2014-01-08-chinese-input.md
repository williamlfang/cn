---
layout:     post
title:      Linux 中文输入法（fcitx）安装与设置
category:   
- Tech
tags: 
- Linux
- fcitx
- 输入法
---

Linux （Mint，16 Petra）系统本身并没有默认安装中文输入法。为了在 Linux 操作系统下使用中文输入，需要自己添加。我倒腾了大半天的，终于明白过来这是怎么设置了。现在将全部的过程记录在下面，以备日后使用。

1. 首先是安装源，

    sudo add-apt-repository ppa:fcitx-team/nightly

2. 更新

    sudo apt-get update

3. 安装 fcitx，搜狗输入法，五笔（一般不用）

    sudo apt-get install fcitx fcitx-sogoupinyin fcitx-table-wubi
    
  当然，也可以安装双拼
    sudo apt-get install fcitx-pinyin

4. 这个比较重要，可以先在终端输入 fcitx，看看是不是提示没有可用的前端，则需要安装如下 `fcitx-frontend-gtk3`
 
    sudo apt-get install fcitx-frontend-gtk3 fcitx-ui-classic

5. 打开 fcitx config，如果提示 "fcitx 的 KCModule 未被找到 缺少"，则在Terminator输入

    sudo apt-get install kde-config-fcitx

6. 在 `fconfig` 设置输入法即可使用。

7. 需要在 `/home` 文件夹下面新建/修改 `.xprofile`
  
> export LC_ALL=zh_CN.utf8        <br>
export XMODIFIERS=@im=fcitx        <br> 
export QT_IM_MODULE=xim        <br>
export GTK_IM_MODULE=xim        <br> 
fcitx -d        <br>

