---
author: ccbikai
comments: true
date: 2013-11-13 22:13:10+08:00
layout: post
slug: the-nginx-pan-domain-301-redirect-rules
title: nginx泛域名301重定向规则
wordpress_id: 1592
categories:
- 一块分享
tags:
- 域名
- 服务器
- nginx
---
这几天又换域名了，把原来的nju.pt换成了miantiao.me。然后用nginx做了301重定向。


<!-- more -->
.pt域名有点儿贵，养不起，所以不打算长期持有了，所以注册了miantiao.me。之所以注册miantiao是因为我瘦的和面条一样，而且吃面条长大的。现在在南方上学吃的面条都不合胃口、不给力，所以我也用不给力的面条这个网名。

这次我只把nju.pt的裸域留给了我自己，把其他子域名全部重定向到了我的大学njupt.edu.cn。网上找到的代码都是单域名重定向，没有找到泛域名重定向的nginx规则，自己研究了一下，写了一个，基本能用，拿出来分享一下。如果你有更好的欢迎指教。

	if ($host ~* ^(.*)\.nju\.pt\/^(*)) {
		set $sub_name $1;
		set $path $2;
		rewrite ^(.*) http://$sub_name.njupt.edu.cn$path permanent;
	}

