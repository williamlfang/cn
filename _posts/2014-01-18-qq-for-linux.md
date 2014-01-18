---
layout:     post
title:      WineQQ2013 可以使用
category:   Tech
tags: 
- Linux
- QQ
---

## QQ for `Linux`
想要在Linux操作系统下使用 `QQ` 真的得费不少劲。我之前尝试通过 `WINE` 来安装 `QQ2013`，可是最终以失败结束。

- 一方面是由于目前的 `WINE` 技术还不是很好，对于一些商业软件支持力度不够，也不能完全模拟 `Windows` 系统来安装 `.exe` 的软件（如果完全取代了，怎么感觉又回到 `Windows` 时代了呢.....），期间需要不停的下载相关而不必要的软件，大费人力与（电）脑力，而且终归落得个不能使用/中文乱码的惨淡结局。

- 另一方面，`Tencent` 公司也不会完全放弃 `QQ` 的商业价值来满足开源爱好者的，他们满眼看到的是商业利益。`QQ` 本身是一个具有黑暗魔法力量的软件，可以推送广告取得收入，可以不间断的搜索用户资料（先前有 3Q 大战及由此来），还能维护一个庞大的软件生态链。故此，虽然曾经有一段时间的 `QQ for Linux` 的美好光景，却也一去不复返。

我们现在想要在 Linux 上使用 `QQ`，真可谓“斗智斗勇”，方能取得一丁点的成就。

## 虚拟机下使用 QQ
我之前有在一篇关于虚拟机 [virtualbox](http://williamlfang.github.io/cn/2014/01/04/virtualbox/) 的文章中谈过可以利用虚拟机来运行 `Windows` 操作系统，并在其使用 `QQ` 等软件。可以，这也很不方便，为了使用一个软件大开虚拟机占用大量的内存，实属不值，何况对于一些老机子更是苦命。因此，我决定放弃这个既浪费资源又不讨好的想法，另辟蹊径。

## WineQQ
目前，由一个叫做 “LongeneTeam” 团队给广大的用户带来了福音。他们号称开发了史上最牛叉的、能够在 Linux 系统运行的 `wineQQ`。其工作原理是：
> 通过以deb的格式将 QQ 软件、Wine基本配置、有关字体以及一些必要的配件统统打包好，这样用户可以直接点击deb文件来安装、使用 QQ。

目前 wineQQ 的最新版本为 [wine-1.7.9](http://www.longene.org/forum/viewtopic.php?t=4700)。deb格式的软件可以在[这里](http://pan.baidu.com/s/1hq83fWo)或者[这里](http://www.longene.org/download/WineQQ2013SP6-20140102-Longene.deb)下载到。之后可以直接双击打开，经由 `Software Manager` 确认系统密码后即可安装。完成之后在找到 `QQ` 打开即可。
{% highlight bash linenos %}
![wineqq2013](/cn/assets/images/QQ/qq.png)
{% endhighlight %}

## 问题之门及解决之道
以下汇集了我在使用 wineQQ2013 过程中遇到的一些问题，以及相应的解决方法。欢迎补充。

### 64为操作系统不能运行
这个问题主要是由于原先只是在32位系统运行的 `wineQQ` 需要安装配件。如下：
{% highlight bash linenos%}
sudo apt-get install libc6-i386 
sudo apt-get install ia32-libs
{% endhighlight %}


