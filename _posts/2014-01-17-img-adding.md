---
layout:     post
title:      How to add images in Github with Markdown
category:   Tech
tags: 
- Linux
- pandoc
---

This thread will show you how to add a new images in Markdown through `relative path`.

1. Make sure that you have already set the `url` correctly as `williamlfang.github.com`.

2. Now that we wanna to add new images in the website as `williamlfang.github.com/cn`, which is a `gh-pages`. Unfortunely, all the `url` links are directed to the main repo `williamlfang.github.com` instead of the `williamlfang.github.com/cn`. This is what the following to be utilized.

3. Suppose you have created a relative path containing folder as `assets/images/btt.png`, all you need to do is to add the additional prelix `/cn` alongsie the relative file path `assets/images/btt.png`. See below as as example:
{% highlight bash linenos %}
![image01](/cn/asset/images/btt.png)
{% endlight %}
which gives

![image01](/cn/asset/images/btt.png)