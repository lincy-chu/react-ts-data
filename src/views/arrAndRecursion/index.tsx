import React, {useEffect} from "react";
import MarkdownEditor from "../../components/MarkdownEditor";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";

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
    const recursionStr = '递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。';
    useEffect(() => {
        const arr = [1, 2, 3];
        // unshift(element) 在数组的开头添加元素
        arr.unshift(0);
        console.log(arr);
        // shift() 删除数组的第一个元素
        const firstElement = arr.shift();
        console.log('firstElement', firstElement);
        /**
         * splice(start, deleteCount, ...items)
         *     start: 想要删除或插入的元素的索引值
         *     deleteCount: 删除元素的个数
         *     ...items: 要添加到数组里的值
         */
        arr.splice(0, 0, -1, 0);
        console.log(arr);
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
