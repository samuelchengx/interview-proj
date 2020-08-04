## 1.js基础

- stack是有结构的
- heap是没有结构的
- stack寻址要比heap快

## 执行上下文

## 问题

- let声明的变量为什么在window上不能访问到？
- let和var区别？
- one里为什么没有two函数？
- 我猜如果是two函数的声明改为var two = function(){},就应该出现在one里面吧
- 为什么前两个叫closure 第三个叫local？
- 栈必定会执行入栈和出栈吗？
- local的this 为什么是window 函数调用就是window
- function和var声明函数的区别

## 已经解答
1. 在函数执行上下文中是不能直接访问VO对象的
