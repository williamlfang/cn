---
layout:   post
title:    "使用 Jekyll + knitr 发布博客"
category: Tech 
tags:     [R,Rmarkdown]
description: 
published: true
status: publish
---
 
## 我的博客之旅
 
这些天一直都在钻研如何在博客中加入可以执行 **R** 程序代码的博客模板。我先前也有过写博客的经历，不过那时候使用的博客都是免费托管在其他的服务器中，一方面是缺乏可定制，大都是千篇一律的，无法满足「DIY」的需要，另一方面，也是主要的问题，这些博客网站很少有支持 **LaTeX** 的数学输出，对于数学环境的支持不尽人意。我也就偶尔在写一些纯文字类的随想，不曾涉及专业领域的事情。
 
后来我实在忍无可忍了，觉得找一个必须是支持 **LaTeX** 代码的博客网站。这也就只有在 **WordPress** 上了。我也尝试了使用一段时间。一开始发现还真是方便，直接使用 **LaTeX** 代码产生数学编译环境，如此一来便可以在上面多说点专业领域的话了。可是，后来我发现在 **WordPress** 上管理博客与修改模板是一件多么痛苦的事情，既需要更改模板，而且每次改完了发现不是自己想要的效果，又得重新再做。如此一来，光花费在博客网站的维护时间竟然占用了多数。如此不堪重负。
 
后来我开始尝试在使用  **R** 做统计分析，也陆陆续续的写了一些小程序。我的想法是，将 **R** 强大的数据分析与绘图能力与 **LaTeX** 超级优美的数学编辑水平结合一起，从而生成既有分析又有数据、既有文本又有图表的文档。后来发现这个想法别人早已实现，那就是 `Sweave`，支持在 **LaTeX** 使用 **R** 代码 （或者倒过来说，在 **R** 中使用 **LaTeX** 语法），并且直接输出结果。再后来，我接着发现这个原来还有『豪华升级版』，那就是我今天要给各位介绍的 `knitr`，一个更加强大的支持 **LaTeX** 编译环境的 **R** 软件包。
 
可是，有时候我不大喜欢 **LaTeX** 的一点在于，永远都需要那么复杂的插入代码环境，比如，当需要使用「强调」的时候，还得非常复杂而琐碎的键入 `\emph{}`，这个让我实在崩溃，因为毕竟我很多时候都是在使用纯文本输入，只是少数地方使用数学公式表达。那么，我想要的就是，需要强调了，就键入 *斜体强调*，或者 **粗体强调**。如此一来，写博客就非常的轻松了。
 
于是我在某个凌晨「毅然决然」的将博客编译语言再次转移阵地。这一次，我需要
 - 简单：写博客就是写博客，随心所欲，没有多余的格式。在写作过程中，我仅仅需要关心文本，专注于思想表达。
 - 支持 **R** 代码，能够直接产生计算结果，插入图形。而且最好的是，别人看到这个代码还觉得不错，可以自己在电脑上重复输出结果。
 - 具有良好的定制特征，我可以根据个人偏好设置网页界面，并且需要很好的可持续维护性。
 - 最后是能够记录我在不同时间段写作的备份，方便随时「倒带」。这样我就不用担心删除当下文字段落后以后就找不回来，而且最好是告诉我具体的细节。
 
## Github + Jekyll + knitr + Rmarkdown
 
我就抱着这样的「苛刻要求」去找「谷哥」。出乎意料的是，竟然如此简单的就得到需要的解决方案了：
> Github + Jekyll + Rmarkdown
 
这是一个完美的方案！完全实现了我需要的多种服务：
 
- **Github** 用于托管代码与博客。**Git** 是一款优秀的版本管理软件（VCS），由现在的 **Linux** 开发团队在维护。而 **Github** 就相当于一个网罗世界优秀程序员的「Facebook」，汇集了目前几乎所有的开源项目。
 
  现在，我可以通过将代码与博客托管到 **Github** 上，实现版本的系统检测，方便网站运行。
  
- **Jekyll** 为我的博客网站提供了静态编译，将其打包为 *Html* 然后发布在托管的网站上。而且 **Jekyll** 提供了一系列的模板与模块，方便个人定制网站。与其他博客网站不同，经常动不动的就蹦出一个广告，**Jekyll** 编制的网站上面不会有多余的信息，我只陈列需要分享的内容。
 
- 最后，就是 **knitr** 与 **Rmardown** 可以轻松的实现博客撰写。现在，我需要做的就是使用 **Markdown** 语法输入，然后在需要 **R** 的地方直接插入代码即可。一篇完整的博客就是我沿着自己的想法一路写到底，中间不会有其他的打扰，不要反复的插入格式命令。
 
## 使用 **Rmarkdown** 
 
下面，我介绍一下如何实现将 **R** 代码编译为网页 **Markdown** 格式。由于 **Jekyll** 支持将 **Markdown** 编译成 **Html** 网页，因此，我们就可以很方便的将 **R** 文件编译成 **Html** 并发布到 **Github** 上面了。我主要参考了 Jason Bryer 的帖子， ["Using (R) Markdown, Jekyll, & GitHub for a Website"](http://jason.bryer.org/posts/2012-12-10/Markdown_Jekyll_R_for_Blogging.html)。另外，由于这个帖子生成的图片存储在同样一个文件夹下面，有时我想找某个博客的图片时，会非常的不方便。于是我对其做了一个小小的修改，将经过 **R** 产生的图片放在与帖子相对应的文件夹目录下，方便查找。比如，我有一个文档，`2014-01-24-shi-yong--rmarkdown--fa-biao-bo-ke.Rmd`，那么，图片的存放目录应该是
 
|-dir
|
|-assets
|
|-- images
|
|---- r-figures
|
|----- 2014-01-24-shi-yong--rmarkdown--fa-biao-bo-ke
|
|------ fig1.png
 
### 建立一个 `rmarkdown.r`
 
首先是在主目录(`_posts`)下面建立一个 `rmarkdown.r` 文件，用于执行编译功能。主要用途就是实现将当前目录下所有的带 `.Rmd` 文件转化为 `.md` 格式，从而可以实现发布。下面是其主要内容，也可以在[这里](/cn/_post/rmarkdwn.r)下载。
 
    #' This R script will process all R mardown files (those with in_ext file extention,
    #' .rmd by default) in the current working directory. Files with a status of
    #' 'processed' will be converted to markdown (with out_ext file extention, '.markdown'
    #' by default). It will change the published parameter to 'true' and change the
    #' status parameter to 'publish'.
    #' 
    #' @param dir the directory to process R Markdown files.
    #' @param images.dir the base directory where images will be generated.
    #' @param images.url
    #' @param out_ext the file extention to use for processed files.
    #' @param in_ext the file extention of input files to process.
    #' @param recursive should rmd files in subdirectories be processed.
    #' @return nothing.
    #' @author Jason Bryer <jason@bryer.org>
    convertRMarkdown <- function(dir=getwd(), images.dir=dir, images.url='/cn/assets/images/',
  						 out_ext='.markdown', in_ext='.rmd', recursive=FALSE) {
  	require(knitr, quietly=TRUE, warn.conflicts=FALSE)
  	files <- list.files(path=dir, pattern=in_ext, ignore.case=TRUE, recursive=recursive)
  	for(f in files) {
  		message(paste("Processing ", f, sep=''))
  		content <- readLines(f)
	  	frontMatter <- which(substr(content, 1, 3) == '---')
		  if(length(frontMatter) >= 2 & 1 %in% frontMatter) {
			  statusLine <- which(substr(content, 1, 7) == 'status:')
	  		publishedLine <- which(substr(content, 1, 10) == 'published:')
		  	if(statusLine > frontMatter[1] & statusLine < frontMatter[2]) {
			  	status <- unlist(strsplit(content[statusLine], ':'))[2]
  				status <- sub('[[:space:]]+$', '', status)
	  			status <- sub('^[[:space:]]+', '', status)
		  		if(tolower(status) == 'process') {
			  		#This is a bit of a hack but if a line has zero length (i.e. a
				  	#black line), it will be removed in the resulting markdown file.
					  #This will ensure that all line returns are retained.
					content[nchar(content) == 0] <- ' '
		  			message(paste('Processing ', f, sep=''))
			  		content[statusLine] <- 'status: publish'
				  	content[publishedLine] <- 'published: true'
					  outFile <- paste(substr(f, 1, (nchar(f)-(nchar(in_ext)))), out_ext, sep='')
  					render_markdown(strict=TRUE)
	  				opts_knit$set(out.format='markdown')
		  			opts_knit$set(base.dir=images.dir)
			  		opts_knit$set(base.url=images.url)
  					##
	  				## 产生的图片存储位置 `/assets/images/r-figures/`
		  			fig.path <- paste0("r-figures/", sub(".Rmd$", "", basename(files)), "/")
			  		opts_chunk$set(fig.path = fig.path)
				  	## opts_chunk$set(fig.cap = "center")  ## figure position
				    render_jekyll()     
					  ##
  					try(knit(text=content, output=outFile), silent=FALSE)
  				} else {
  					warning(paste("Not processing ", f, ", status is '", status, 
  								  "'. Set status to 'process' to convert.", sep=''))
  				}
  			} else {
  				warning("Status not found in front matter.")
  			}
  		} else {
  			warning("No front matter found. Will not process this file.")
  		}
  	 }
  	 invisible()
     }
 
 
 
### 建立可执行文本 `rmd.sh`
 
这个 `rmd.sh` 也是存放在目录 `_posts`, 主要就是
- 识别当前的目录，并将其赋予 `dir` 参数
- 默认在 `Terminal` 运行 `rmakrdown.r` 的 `convertRmarkdown` 函数，并输出经过转化的 `.markdown` 文件。
 
文本 [`rmd.sh`](/cn/_post/rmd.sh) 可以下载，里面内容是
 
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    Rscript -e "source('$DIR/rmarkdown.r'); convertRMarkdown(images.dir='../assets/images')"
 
 
### 添加 `YAML` 标头
 
最后，我们需要在 `.Rmd` 文件标头添加以下命令：
 
    published: false
    status: process
 
 
这个是因为：
<blockquote>
  <p> - First, the published parameter should be set to false so that Jekyll will not attempt to process the file. The convertRMarkdown function will change this parameter to true in the resulting Markdown file. </p>
  <p> - The second parameter, status, must be set to process for the convertRMarkdown function to convert the file. This is useful when working a draft of a document and you wish to not have the file converted. </p>
  
</blockquote>
 
### 例子
 
#### 数学公式
 
比如我只需要如下输入数学公式，$$S = \sum_{i=1}^k x_i$$，或者是$$a^2 + b^2 = c^2$$
 
$$\frac{1}{\pi}=\frac{2\sqrt{2}}{9801}\sum_{k=0}^\infty\frac{(4k)!(1103+26390k)}{(k!)^4396^{4k}}$$
 
$$ \frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} = 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}} {1+\frac{e^{-8\pi}} {1+\ldots} } } } $$

 
#### **R**
 
再者，这个 `R` 代码，我们可以直接生成图片。

{% highlight r %}
x = rnorm(100)
plot(density(x))
{% endhighlight %}

![plot of chunk fig1](/cn/assets/images/r-figures/2014-01-24-shi-yong--rmarkdown--fa-biao-bo-ke/fig1.png) 

 
 
