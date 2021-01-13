import React, { useEffect } from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {DoubleQueue, LoopQueue, PriorityQueue, Queue} from "../../class";
import {LogStart, Log} from "../../utils";

const Queues = () => {
    const intStr = '队列是遵循先进先出原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。例子：售票处';
    const dStr = '双端队列一种允许我们同时从前端和后端添加和移除元素的特殊队列。例如：电影院购票';
    const priStr = '元素的添加和删除是基于优先级的队列。例子：机场登记';
    const loopStr = '为充分利用向量空间，克服“假溢出”现象的方法是：将向量空间想象成一个首尾相接的圆环，并成为这种向量为循环向量。存储在其中的队列称之为循环队列。这种循环队列可以以单链表、队列的方式来在实际编程中来实现。例子：击鼓传花';

    useEffect(() => {
        LogStart('队列', () => {
            const queue = new Queue<string>();
            Log(queue.isEmpty());
            queue.enqueue('John');
            queue.enqueue('Jack');
            Log(queue.toString());
            queue.enqueue('Camila');
            Log('size', queue.size());
            queue.dequeue();
            queue.dequeue();
            Log(queue.toString());
        });

        LogStart('双端队列', () => {
            const doubleQueue = new DoubleQueue<number>();
            doubleQueue.addFront(1, 2, 3);
            doubleQueue.addFront(4, 5, 6);
            doubleQueue.addBack(7, 8, 9);
            doubleQueue.removeBack();
            doubleQueue.removeFront();
            Log(doubleQueue.toString());
            Log('peekFront', doubleQueue.peekFront());
            Log('peekBack', doubleQueue.peekBack());
            doubleQueue.removeFront();
            doubleQueue.removeFront();
            doubleQueue.addFront(0, -1);
            Log(doubleQueue);
        });

        LogStart('优先队列', () => {
            const priorityQueue = new PriorityQueue<string>();
            priorityQueue.enqueue('John', 2);
            priorityQueue.enqueue('Jack', 1);
            priorityQueue.enqueue('Camila', 1);
            priorityQueue.enqueue('Surmon', 3);
            priorityQueue.enqueue('skyRover', 2);
            priorityQueue.enqueue('司马萌', 1);
            Log(priorityQueue);
            Log(priorityQueue.toString());
        });

        LogStart('循环队列', () => {
            const loopQueue = new LoopQueue<string>();
            loopQueue.enqueue('SkyRover', 'Even', 'Alice');
            Log(loopQueue.size(), loopQueue.isEmpty());
            Log(loopQueue.find(26));
            Log(loopQueue.find(87651));
        });

        LogStart('循环队列 -- 击鼓传花', () => {
            const hotPotato = (elementsList: string[], num: number) => {
                const queue = new Queue<string>();
                let eliminatedList = [];
                queue.enqueue(...elementsList);

                while (queue.size() > 1) {
                    for (let i = 0 ; i < num; i++) {
                        // 移除队列开头的一项，将其添加到队列尾部，这样让一个普通队列就变成了循环队列
                        // 我们并不是真的创建一个循环的队列，而是将普通的队列赋予操作【不断更换开头和结尾】，让她有类似循环队列的操作
                        const lastElement = queue.dequeue();
                        if (lastElement) {
                            queue.enqueue(lastElement);
                        }
                    }
                    const res = queue.dequeue();
                    res && eliminatedList.push(res);
                }
                return {
                    eliminated: eliminatedList,
                    winner: queue.dequeue()
                }
            };

            const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
            const result = hotPotato(names, 7);
            result.eliminated.forEach((name: string) => {
                Log(`${name}在击鼓传花游戏中被淘汰`);
            });
            Log(`胜利者： ${result.winner}`);
        });

        LogStart('回文', () => {
            /**
             * 回文是正反都能读通的单词、词组、数或一系列字符的序列。例如：madam。
             * 利用数据结构解决这个问题的最简单方法是使用双端队列。
             */
            const palindromeChecker = (aString: string) => {
                if (aString === undefined || aString === null || (aString.length === 0)) {
                    return false;
                }
                const deque = new DoubleQueue<string>();
                const lowerStrArr = aString.toLocaleLowerCase().replace(/\s/g, '').split('');
                let isEqual = true;
                let firstChar, lastChar;
                deque.addBack(...lowerStrArr);

                while (deque.size() > 1 && isEqual) {
                    firstChar = deque.removeFront();
                    lastChar = deque.removeBack();
                    if (!Object.is(firstChar, lastChar)) {
                        isEqual = false;
                    }
                }

                return isEqual;
            }
            Log(palindromeChecker('madam'));
            Log(palindromeChecker('Was it a car or a cat I saw'));
        });
    }, []);

    return (
        <div>
            <Title title={'队列'} />
            <Introduction val={intStr} />
            <Title title={'双端队列'} />
            <Introduction val={dStr} />
            <Title title={'优先队列'} />
            <Introduction val={priStr} />
            <Title title={'循环队列'} />
            <Introduction val={loopStr} />
        </div>
    );
};

export default Queues;
