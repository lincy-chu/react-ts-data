import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {Dictionary, HashTable, HashTableEnhance} from "../../class";
import { LogStart, Log } from "../../utils";

const TheDictionary = () => {
    const dicStr = '字典可以存储不重复的数据。字典是以{key: value}的形式存储数据，字典也称作映射。';
    const hashStr = '散列表，即hashTable，也叫HashMap，它是Dictionary类的一种散列表实现方式。散列算法的作用是尽可能快的在数据结构中找到一个值。';

    useEffect(() => {
        LogStart('字典', () => {
            const dictionary = new Dictionary();
            dictionary.set('Gandalf', 'gandalf@email.com');
            dictionary.set('John', 'John@email.com');
            dictionary.set('Jack', 'Jack@email.com');
            Log(dictionary);
            Log(dictionary.keys());
            Log(dictionary.values());
            Log(dictionary.items);
        });

        LogStart('散列表', () => {
            const hash = new HashTable()
            hash.put('Gandalf', 'gandalf@email.com')
            hash.put('John', 'johnsnow®email.com')
            hash.put('Tyrion', 'tyrion@email.com')
            hash.put('Aaron', 'aaronOemail.com')
            hash.put('Donnie', 'donnie@email.com')
            hash.put('Ana', 'ana©email.com')
            hash.put('Jonathan', 'jonathan@email.com')
            hash.put('Jamie', 'jamie@email.com')
            hash.put('Sue', 'sueOemail.com')
            hash.put('Mindy', 'mindy@email.com')
            hash.put('Paul', 'paul©email.com')
            hash.put('Nathan', 'nathan@email.com')
        });

        LogStart('增强型散列表', () => {
            const hash = new HashTableEnhance();
            hash.put('Gandalf', 'gandalf@email.com')
            hash.put('John', 'johnsnow®email.com')
            hash.put('Tyrion', 'tyrion@email.com')
            hash.put('Aaron', 'aaronOemail.com')
            hash.put('Donnie', 'donnie@email.com')
            hash.put('Ana', 'ana©email.com')
            hash.put('Jonathan', 'jonathan@email.com')
            hash.put('Jamie', 'jamie@email.com')
            hash.put('Sue', 'sueOemail.com')
            hash.put('Mindy', 'mindy@email.com')
            hash.put('Paul', 'paul©email.com')
            hash.put('Nathan', 'nathan@email.com')
            Log(hash);
        });
    }, []);

    return (
        <div>
            <Title title={'字典'} />
            <Introduction val={dicStr} />
            <Title title={'散列表'} />
            <Introduction val={hashStr}/>
        </div>
    );
};

export default TheDictionary;
