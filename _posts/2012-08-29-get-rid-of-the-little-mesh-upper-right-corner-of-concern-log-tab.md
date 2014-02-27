---
author: ccbikai
comments: true
date: 2012-08-29 06:33:01+08:00
layout: post
slug: get-rid-of-the-little-mesh-upper-right-corner-of-concern-log-tab
title: 去掉点点网右上角关注和登录标签
wordpress_id: 881
categories:
- 一块分享
tags:
- 代码
- 网站
---

> 这几天在玩点点网，折腾模板时发现右上角的登录按钮很不爽，而且不像独立博客，就去修改代码。折腾了半天也没有去掉，最后忽然想到Css，一句话就给隐藏了。


放代码：`iframe#diandian_controls{display:none;}`

在自定义CSs的地方添加就行了。
