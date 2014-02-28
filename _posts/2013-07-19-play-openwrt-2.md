---
author: ccbikai
comments: true
date: 2013-07-19 14:42:36+08:00
layout: post
slug: play-openwrt-2
title: openwrt折腾记（二）
wordpress_id: 1584
categories:
- 科技牛逼
tags:
- 路由器
- linux
- openwrt
---
前段时间，写了openwrt第一篇，但是第二篇一直拖到现在也没有写，今天强迫自己写出来，不然不知道又要拖到什么时候了。  
<!-- more -->  
上次主要是联网遇到的问题和文件共享的设置，今天我写写离线下载文件，和DDNS。  

文件共享搞好了，就做离线下载，这样电脑可以直接读取路由器下载的电影，手机也可以直接读取，减少复制和存储空间（U盘存储不够，你可以用挂载移动硬盘）。离线下载主要依靠的是aria2,openwrt路由器已经有编译好的软件包，你可以直接在软件管理的地方安装(或者`opkg install aria2`),安装好了需要给它设置配置文件（我在下面贴出来），用 `aria2c --conf-path=/root/aria2.conf` 命令启动它，如果不出错，就可以用web管理面版给它添加东西了，下载[这里](http://pan.baidu.com/share/link?shareid=65077310&uk=2617666054) 的压缩包，解压放在/www目录，然后访问http://192.168.1.1/yaaw 或者http://192.168.1.1/xunlei ，添加下载文件。  

aria2配置文件，放在/root目录，里边的路径修改一下对应你的。  如果需要开机自启动在 系统》启动项添加 `aria2c --conf-path=/root/aria2.conf -D`命令。  
<script src="https://gist.github.com/ccbikai/6037312.js"></script>  

如果你要用迅雷离线，或者旋风离线，需要给浏览器安装油猴子js脚本，迅雷旋风二合一（http://userscripts.org/scripts/source/153927.user.js）。安装好以后，设置一下rpc路径，和yaaw设置里边的一致就可以一键添加下载了。旋风是rpc导出，迅雷是批量导出。
[![旋风设置](http://ww3.sinaimg.cn/large/4eda25f5gw1e6s6c1y4zfj20er076aaj.jpg)](http://ww3.sinaimg.cn/large/4eda25f5gw1e6s6c1y4zfj20er076aaj.jpg)  
[![迅雷设置](http://ww3.sinaimg.cn/large/4eda25f5gw1e6s6ch2hm8j20hz0drgmj.jpg)](http://ww3.sinaimg.cn/large/4eda25f5gw1e6s6ch2hm8j20hz0drgmj.jpg)  

离线下载设置好了，但你有时在外边，就需要远程控制了，但是每次拨号路由器的ip都是变化的，很多人用的是花生壳，我是用dnspd解析的，下面是我用的脚本。  
<script src="https://gist.github.com/ccbikai/6037342.js"></script>  
保存为php文件，放在外网可以访问的支持curl的php空间，然后打开"/usr/lib/ddns/services"文件，如果你找不到那就是路由器安装ddns，在软件管理那里安装一下。在"/usr/lib/ddns/services"里边添加 `"dnspod.com" "http://api.inbiji.com/dnspod/dnspodupdate.php?username=[USERNAME]&password=[PASSWORD]&domain=[DOMAIN]&myip=[IP]"`，如果你没有空间，可以直接用我的接口，不会记录密码。  

然后在路由器设置页面 服务->动态DNS->添加一条记录，这里服务里现在会出现dnspod.com选项，主机名:二级域名@顶级域名(比如你的二级域名是openwrt.xxx.com,那么该处就填写openwrt@xxx.com)，用户名:就是你的dnspod账户，密码  :就是你的dnspod密码，网络  :选wan，"保存并应用",最好开启定时更新,间隔时间不要太短,10分钟就好。  

这样路由器就可以有一个固定的域名了，但是你直接远程访问http://openwrt.xxx.com还是不行的，需要在防火墙里边添加端口转发，将外网1024端口转发到192.168.1.1的80端口（外网端口不建议用80,又不是面向公众的服务，而且一些省份是屏蔽80端口的），这样就可以通过http://openwrt.xxx.com:1024 访问路由器管理页面了，当然yaaw的管理页面就是http://openwrt.xxx.com:1024/yaaw ，http://openwrt.xxx.com:1024/xunlei 了。  

第二次折腾就是这些了，当然还有第三次，准备折腾拿安卓手机做web服务器（已经成功），然后通过路由器转发，就可以让外网访问了，搭建一个小网站是可以的，许多人是拿树莓派这样玩的，买不起树莓派，只能拿手机了。
