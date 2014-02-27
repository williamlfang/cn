---
layout:   post
title:    "Functions"
category: R
tags:     [R, Programming, Note]
description: 
published: false
status:    process
---

这一章我们主要学习 **R** 中的函数（Functions）。函数是由一段具有相互联系的命令语句构成的集成环境，借此我们可以完成更加复杂的功能。**R** 从本质上说也是一种函数编程（Functional Programming），怎样去理解函数呢？其实，从最基本的属性上说，**R** 是一种面向对象（Object-Oriented，OO）的编程语言，所有的处理都指向对象。那么，我们也就可以将 **R** 中的函数理解为一种「对象」，对其进行相应的输入、编译、转换、输出。

## 函数的「三大马车」

一个典型的函数通常由三个部分构成：

- `body()`：函数的所有命令语句，但不包括在函数内部编写的注释（Comments）。当然，如果我们愈要显示完整的函数主体内容，可以使用命令 `srcref()`，即 “source reference".

- `formals()`：一开始没想明白这个应该怎么理解，后来就干脆把它等价做 `input`，即函数中所有的变量集合。

- `enviroment()`: the 'map' of the location of the function's variables. 一般默认的都是全局环境（global environment，显示是 `R_GolbalEnv`）


```r
fn <- function(x, y) {
    y <- x^2 + 3 * x
    plot(x, y)  ## 函数返回一个图像，这个就是一个对象。
}

x <- rnorm(100)
fn(x)  ## d\调用函数
```

![plot of chunk unnamed-chunk-1](figure/unnamed-chunk-1.png) 

```r

body(fn)  ## 函数的主体，包括了所有的可执行的命令语句。
```

```
## {
##     y <- x^2 + 3 * x
##     plot(x, y)
## }
```

```r
## 但不包括注释里面的内容。

formals(fn)
```

```
## $x
## 
## 
## $y
```

```r

environment(fn)
```

```
## <environment: R_GlobalEnv>
```

> 当然，**R**中有一类是「原始函数」，即 "primitive functions"，也就是在 **R** 中直接使用 `C` 语言编写的函数，这个函数也就不需要以上的「三大马车」来「保驾护航」。也就是说，对于原始函数，`body()`、`formals()`、`environment()`都不会有效果，而是显示 `Null`。至于为什么要这些原始函数，我的理解是
 > > 这些使用了 `C` 的原始函数直接调用命令，他们运行在较低层级，具有了更高更快的运算能力。
 
> 不过这些优势优势是需要付出成本的，导致原始函数与 **R** 中的函数具有完全不同的规则。比如，`sum` 就是一个原始函数类型。
    
    ```r
    sum
    ```
    
    ```
    ## function (..., na.rm = FALSE)  .Primitive("sum")
    ```
    
    ```r
    
    body(sum)
    ```
    
    ```
    ## NULL
    ```
    
    ```r
    formals(sum)
    ```
    
    ```
    ## NULL
    ```
    
    ```r
    environment(sum)
    ```
    
    ```
    ## NULL
    ```

