---
author: ccbikai
comments: true
date: 2013-12-02  13:24:56 +08:00
layout: post
slug: zhengfang-yijian
title: 正方教务系统一键教学评价脚本
wordpress_id: 1594
categories:
- 一块分享
tags:
- 大学
- 脚本
---
又是一年期末季，除了麻烦的期末考试还有没用的教学评价。教学评价太麻烦，就在网上找了个脚本，虽不和我们学校的不兼容，但是稍微改一下就好了。

<!-- more -->
这是直接打最高分给老师的，除了一个较好，其他都是好。如果你需要给差评，点完脚本后自己改一下。  

脚本是在[ikk](http://www.ikk.me/archives/default/javascript_autocomplete_jwxt.html)发现的，是用js写的，拖动下边的链接到书签栏就行了，或者直接添加书签。点击一次可以给一个老师完成评价，所有评价结束以后自己提交。  
拖它：<a href="javascript:(function(){var obj=$('iframeautoheight').contentDocument.getElementsByTagName('select'); for(i=1;i<obj.length;i++){ obj[i].value='%E5%A5%BD'; } var rid=Math.max(1, Math.floor(Math.random()*obj.length)); obj[rid].value='%E8%BE%83%E5%A5%BD'; $('iframeautoheight').contentDocument.getElementById('Button1').click(); })()" class="button button-small button-orange">一键教学评价</a>  
代码： `javascript:(function(){var obj=$('iframeautoheight').contentDocument.getElementsByTagName('select'); for(i=1;i<obj.length;i++){ obj[i].value='%E5%A5%BD'; } var rid=Math.max(1, Math.floor(Math.random()*obj.length)); obj[rid].value='%E8%BE%83%E5%A5%BD'; $('iframeautoheight').contentDocument.getElementById('Button1').click(); })()`

其他学校要用只要修改一下赋值就行。自己查看一下网页元素，然后看一下你们学校的赋值是什么？好?良好？自己再改一下书签就行了。
