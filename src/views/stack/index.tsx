import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {ObjStack, Stack, WeakMapStack} from "../../class";
import {Log, LogStart} from "../../utils";

const Stacks = () => {
    const str: string = '栈是一种遵从后进先出元素的集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。例子：弹夹';
    useEffect(() => {
        LogStart('数组栈', () => {
            const stack = new Stack<number>();
            Log('isEmpty', stack.isEmpty());
            stack.push(5, 8);
            Log('peek', stack.peek());
            stack.push(11);
            Log('size', stack.size());
            Log('isEmpty', stack.isEmpty());
        });

        LogStart('对象栈', () => {
            const stack = new ObjStack();
            stack.push(5, 8);
            Log('stack', stack);
            Log(stack.toString());
            stack.pop();
            Log('stack', stack);
        });

        LogStart('基于WeakMap的栈', () => {
            const weakMap = new WeakMapStack<number>();
            weakMap.push(5, 8);
            Log(weakMap);
            Log(weakMap.pop());
            weakMap.push(8, 9, 10);
            Log('peek', weakMap.peek());
            Log('size', weakMap.size());
        });

        LogStart('十进制转二进制', () => {
            // 十进制转化成二进制，可以将十进制数除以2并对商取整，将余数放入栈中，直到结果是0为止，将栈中元素依次移除并拼接
            const decimalToBinary = (decNumber: number): string => {
                const remStack = new Stack<number>();
                let number = decNumber;
                let rem;
                let binaryString = '';

                while(number > 0) {
                    rem = Math.floor(number % 2);
                    remStack.push(rem);
                    number = Math.floor(number / 2);
                }

                while (!remStack.isEmpty()) {
                    binaryString += `${remStack.pop()}`
                }

                return binaryString;
            };
            Log(decimalToBinary(10));
            // 进制转化
            const baseConverter = (decNumber: number, base: number) => {
                const remStack = new Stack<number>();
                const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let number = decNumber;
                let rem;
                let baseString = '';

                if(!(base >= 2 && base <= 36)) {
                    return '';
                }

                while (number > 0) {
                    rem = Math.floor(number % base);
                    remStack.push(rem);
                    number = Math.floor(number / base);
                }

                while (!remStack.isEmpty()) {
                    const element = remStack.pop();
                    if (element !== undefined) {
                        baseString += digits[element];
                    }
                }

                return baseString;
            };
            Log(baseConverter(100345, 35));
        });
    }, []);
    return (
        <div>
            <Title title={'栈'} />
            <Introduction val={str} />
        </div>
    );
};

export default Stacks;
