---
layout:     post
title:      在 Virutalbox 环境下安装虚拟机
category:   Tech
tags: 
- Linux
- Virtualbox
description: 
---

我现在的系统是 Linux Mint 16 (Petra,KDE),在开源社区有提供众多的软件,基本上能够满足工作和学习的需要.不过,对于在国内环境下,有些商业软件并不提供 Linux 支持,比如,我现在使用的招行网银U盾,不能在 Linux 下读取,再比如,厦大图书馆提供的远程访问数据库iReader,只能在window操作系统下使用.

<!-- more -->


## Linux 下安装 Windows 软件

对于此类的问题,目前有两种解决方法:

1. 在 Linux 系统中安装 wine,从而可以安装大部分的软件,如QQ等.
   - 优点:占用的CPU资源少,不影响系统的运行速度
   - 缺点:设置麻烦,尤其是中文的设置基本是要人命的.典型的就是ireader不能运行.而且还需要相应的安装在 Linux 下的配套软件.
 
2. 另外一种就是我要介绍的方法:在 Linux 下使用虚拟机安装 Windows 操作系统,在其上面运行软件.
   - 优点:一劳永逸,简单方便
   - 缺点:由于虚拟机需要固定的分配内存和硬盘空间,会大大的降低系统的运行速度.
 
不过,就目前的笔记本硬件配置来看,一般的内存是4G的,处理器在i3以上,硬盘在500G.在 Linux 下利用虚拟机安装 Windows 系统基本上不会有太大的影响.就本人目前的使用情况来看,效果还是可以接受的.

下面就简单介绍一下我的安装经验.

## 安装 Virtualbox

首先是从网站下载 [Virtualbox](https://www.virtualbox.org/wiki/Downloads),这个是 deb 格式的,可以直接点击安装即可.需要 \root 权限.输入密码即可.

然后在终端输入 virtualbox 打开.

1. 点击"新建"一个虚拟机,设置虚拟机名称,并选择相应的操作系统.这个其实意义不大,主要 virtualbox 会根据相应的操作系统分配默认的内存和硬盘空间.
![vb01](/assets/virtualbox/vb01.png)
![vb02](/assets/virtualbox/vb02.png)
![vb03](/assets/virtualbox/vb03.png)
2. 也就是上一步骤的延续,设定内存大小.建议给主机留多一些内存以加快主机的运行速度.
![vb04](/files/virtualbox/vb04.png)
3. 点击"创建"开始建立一个虚拟机.
![vb05](/files/virtualbox/vb05.png)
4. 如果不知道虚拟硬盘的文件类型,那就选择默认的"VDI",点击"下一步"继续.
![vb06](/files/virtualbox/vb06.png)
5. 分配虚拟机的硬盘大小,有两种选择
![vb07](/files/virtualbox/vb07.png)
   - 动态分配,默认选择,前期不怎么占用硬盘,后面会随着需要而增加.比较适用于硬盘存储比较小的计算机.
   - 固定大小,这个会占用主机硬盘空间.
6. 选择需要将虚拟机建立在那个文件夹下面.视个人情况而定.我一般是建立在 /home
![vb08](/files/virtualbox/vb08.png)
7. 该页面显示已经成功的建立起来一个虚拟机,在上面有对应的配置.这个可以通过设置来更改.
![vb09](/files/virtualbox/vb09.png)
8. 为了在虚拟机上面安装 Windows 系统,需要点击"设置",找到"存储"里面的"分配光驱",然后选择移动硬盘上的 Windows 7 iso.
![vb010](/files/virtualbox/vb10.png)
9. 设置完成后的页面.点击"启动"开始安装系统.
![vb016](/files/virtualbox/vb16.png)
10. 普通的 Windows 7 安装过程.
![vb011](/files/virtualbox/vb11.png)
11. 成功安装系统,开始启动.
![vb012](/files/virtualbox/vb12.png)
![vb013](/files/virtualbox/vb13.png)
12. 在虚拟机上面的 Win 7 找到 Cd 光驱,点击打开安装扩展应用,期间会重启一次.进入之后可以看到整个 Win 7 的完整系统.
![vb14](/files/virtualbox/vb14.png)
13. 设置"共享文件夹",以实现在主机和虚拟机之间的文件传输.
![vb15](/files/virtualbox/vb15.png)


## Virtualbox 识别 USB


为了能够在主机与虚拟机之间相互使用USB,还需有做如下的设置.

> + 由于 virtualbox 默认的是不打开主机的USB插件的.为了实现在虚拟机上读取USB,我们需要安装一个拓展包,[Extention pack](https://www.virtualbox.org/wiki/Downloads).下载完成后点击安装即可.然后重启 virtualbox.   <br>
> + 同时,为了使 virtualbox 能够识别 USB,还需要将当前用户添加到组里.在终端输入以下命令并重启主机:   <br>
    sudo addgroup wiliam vboxusers  <br>
> + 接着做一下设置:    <br>
   - 打开virtualbox,但事先不启动虚拟机.找到"设置"中的"USB设备",点击右边的"+"以添加USB  <br>
   - 重启主机,启动虚拟机后就可以通过右下角的USB符号添加.如果不用的话,也可以点击推出.







 