import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {Log, LogStart} from "../../utils";
import {LinkedList} from "../../class";

const LinkedLists = () => {
    const linkStr = '链表存储有序的元素集合，大不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。例子：火车';
    useEffect(() => {
        LogStart('链表', () => {
            const linkedList = new LinkedList<number>();
            linkedList.append(1, 2, 3);
            Log(linkedList);
            linkedList.remove(2);
            Log(linkedList);
            Log(linkedList.toString());
        });
    }, []);
    return (
        <div>
            <Title title={'链表'} />
            <Introduction val={linkStr} />
        </div>
    );
};

export default LinkedLists;
