import React, { useEffect } from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {Queue} from "../../class";
import {LogStart, Log} from "../../utils";

const Queues = () => {
    const intStr = '队列是遵循先进先出原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。例子：售票处';
    const dStr = '双端队列一种允许我们同时从前端和后端添加和移除元素的特殊队列。例如：电影院购票';

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


    }, []);

    return (
        <div>
            <Title title={'队列'} />
            <Introduction val={intStr} />
            <Title title={'双端队列'} />
            <Introduction val={dStr} />
        </div>
    );
};

export default Queues;
