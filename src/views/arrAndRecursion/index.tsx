import React, {useEffect} from "react";
import MarkdownEditor from "../../components/MarkdownEditor";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {LogStart, Log, Timer} from "../../utils";

const Arr = () => {
    const arrStr = `
    const arr = [1, 2, 3];
    // unshift(element) 在数组的开头添加元素
    arr.unshift(0);
    console.log(arr); // [0, 1, 2, 3]
    // shift() 删除数组的第一个元素
    const firstElement = arr.shift();
    console.log('firstElement', firstElement); // 0
    /**
    * splice(start, deleteCount, ...items)
    *     start: 想要删除或插入的元素的索引值
    *     deleteCount: 删除元素的个数
    *     ...items: 要添加到数组里的值
    */
    arr.splice(0, 0, -1, 0);
    console.log(arr); // [-1, 0, 1, 2, 3]
    
    /**
    * reduce((prev, curr, index, array) => {}, initVal);
    *     prev: 前一个值
    *     curr: 当前值
    *     index: 当前索引
    *     array: 当前数组
    *     initVal: 用于叠加时的初始值
    */
    const total = [1, 2, 3, 4, 5].reduce((prev: number, curr: number): number => prev + curr, 0);
    console.log('total', total); // 15
    `;
    const recursionStr = '递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。每个递归函数都必须有基线条件，即一个不再递归调用的条件（停止点），以防止无限递归。迭代比递归快很多，所以这表示递归更慢。递归版本更容易理解，需要的代码通常也很少。对一些算法来说，迭代的解法可能不可用，而且有了尾递归优化，递归的多余消耗甚至可能被消除。';
    useEffect(() => {
       LogStart('数组', () => {
           const arr = [1, 2, 3];
           // unshift(element) 在数组的开头添加元素
           arr.unshift(0);
           Log(arr);
           // shift() 删除数组的第一个元素
           const firstElement = arr.shift();
           Log('firstElement', firstElement);
           /**
            * splice(start, deleteCount, ...items)
            *     start: 想要删除或插入的元素的索引值
            *     deleteCount: 删除元素的个数
            *     ...items: 要添加到数组里的值
            */
           arr.splice(0, 0, -1, 0);
           Log(arr);
           /**
            * reduce((prev, curr, index, array) => {}, initVal);
            *     prev: 前一个值
            *     curr: 当前值
            *     index: 当前索引
            *     array: 当前数组
            *     initVal: 用于叠加时的初始值
            */
           const total = [1, 2, 3, 4, 5].reduce((prev: number, curr: number): number => prev + curr, 0);
           Log('total', total); // 15
       });

       LogStart('递归', () => {
           const fn = (num: number): number => {
               if (num === 1 || num === 0) {
                   return 1;
               }
               return num * fn(num - 1);
           };
           Timer('递归计数器', () => {
               fn(30);
           });

           /**
            * 斐波那契数列
            * 定义：
            *       。位置0的斐波那契数是0
            *       。1和2的斐波那契是是1
            *       。n（此处n > 2）的斐波那契数是（n - 1）的斐波那契数加上（n - 2）的斐波那契数
            */
           const fibonacci = (n: number): number => {
               if (n < 1) return 0;
               if (n <= 2) return 1;
               return fibonacci(n - 1) + fibonacci(n - 2);
           };
           Timer('斐波那契数列', () => {
               fibonacci(30);
           });

           // 记忆化斐波那契额数
           const fibonacciMemo = (n: number) => {
               const memo = [0, 1, 1];
               const fibonacci = (n: number): number => {
                   if (memo[n] !== undefined) return memo[n];
                   return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
               };
               return fibonacci;
           };
           Timer('记忆化斐波那契数', () => {
               fibonacciMemo(100);
           });

           // 尾递归优化的斐波那契数列
           const fibonacciWithTail = (num: number, ac1: number = 1, ac2: number = 1): number => {
               if (num < 1) return 0;
               if (Object.is(num, 1) || Object.is(num, 2)) return ac2;
               return fibonacciWithTail(num - 1, ac2, ac1 + ac2);
           };
           Timer('尾递归优化的斐波那契数列', () => {
               fibonacciWithTail(100);
           });
       });
    }, []);
    return (
        <div>
            <Title title={'数组'} />
            <MarkdownEditor val={arrStr} />
            <Title title={'递归'} />
            <Introduction val={recursionStr} />
        </div>
    );
};

export default Arr;
