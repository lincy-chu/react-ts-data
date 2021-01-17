import {Component, FC} from "react";
import {Meta, RouteItem,} from "../interface";
import {Compare, defaultCompare} from "../utils";

export class RouterItem implements RouteItem {
    component: Component | FC;
    meta: Meta;
    path: string;
    routes?: RouterItem[];
    constructor(path: string, component: any | FC, meta: Meta, routes?: RouterItem[]) {
        this.path = path;
        this.component = component;
        this.meta = meta;
        if (routes) {
            this.routes = routes;
        }
    }
}

export class MetaItem implements Meta {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}

/**
 * 栈
 */
export class Stack<T> {
    items: T[];
    constructor() {
        this.items = [];
    }
    push(...elements: T[]): void {
        this.items = this.items.concat(elements);
    }
    pop(): T | undefined {
        return this.items.pop();
    }
    peek(): T | undefined { // 栈顶元素
        return this.items[this.items.length - 1];
    }
    isEmpty(): boolean {
        return Object.is(this.size(), 0);
    }
    size(): number {
        return this.items.length;
    }
    clear(): void {
        this.items = [];
    }
}

/**
 * 对象栈
 */
export class ObjStack {
    count: number;
    items: any;
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(...elements: any[]): void {
        elements.forEach((element: any) => {
            this.items[this.count++] = element;
        });
    }
    pop(): any {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[--this.count];
        delete this.items[this.count];
        return result
    }
    peek(): any {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    isEmpty(): boolean {
        return Object.is(this.size(), 0);
    }
    size(): number {
        return this.count;
    }
    clear(): void {
        this.count = 0;
        this.items = {};
    }
    toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        let objStr = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objStr = `${objStr}, ${this.items[i]}`;
        }
        return objStr;
    }
}

/**
 * 基于WeakMap的栈
 * 从WeakMap中取出值，即以this为键从items中取值
 * items在类中是真正的私有属性。采用这种方法，代码可读性不强，在扩展类时无法继承私有属性。
 */
const items = new WeakMap();
export class WeakMapStack<T> {
    constructor() {
        items.set(this, []);
    }
    push(...elements: T[]): void {
        const s = items.get(this);
        s.push(...elements);
    }
    pop(): T | undefined {
        return items.get(this).pop();
    }
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const arr = items.get(this);
        return arr[arr.length - 1];
    }
    isEmpty(): boolean {
        return Object.is(this.size(), 0);
    }
    size(): number {
        return items.get(this).length;
    }
    clear(): void {
        items.set(this, []);
    }
}

/**
 * 队列
 */
export class Queue<T> {
    count: number;
    lowestCount: number;
    items: any;
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    enqueue(...elements: T[]): void {
        elements.forEach((element: T) => {
            this.items[this.count++] = element;
        });
    }
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const first = this.items[this.lowestCount];
        delete this.items[this.lowestCount++];
        return first;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    isEmpty(): boolean {
        return Object.is(this.size(), 0);
    }
    size(): number {
        return this.count - this.lowestCount;
    }
    clear(): void {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/**
 * 双端队列
 */
export class DoubleQueue<T> {
    count: number;
    lowestCount: number;
    items: any;
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    addFront(...elements: T[]): void {
        elements.forEach((element: T) => {
            if (this.isEmpty()) {
                this.addBack(element);
            } else if (this.lowestCount > 0) {
                this.items[--this.lowestCount] = element;
            } else {
                for (let i = this.count; i > 0; i--) {
                    this.items[i] = this.items[i - 1];
                }
                this.count++;
                this.lowestCount = 0;
                this.items[0] = element;
            }
        });
    }
    addBack(...elements: T[]): void {
        elements.forEach((element: T) => {
            this.items[this.count++] = element;
        });
    }
    removeFront(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const first = this.items[this.lowestCount];
        delete this.items[this.lowestCount++];
        return first;
    }
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        const last = this.items[this.count - 1];
        delete this.items[this.count--];
        return last;
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    isEmpty() {
        return Object.is(this.size(), 0);
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/**
 * 优先队列
 */
/**
 * 优先队列子项
 */
class PriorityElement<T> {
    element: T;
    priority: number;
    constructor(element: T, priority: number) {
        this.element = element;
        this.priority = priority;
    }
}

/**
 * 优先队列
 */
export class PriorityQueue<T> {
    items: PriorityElement<T>[];
    constructor() {
        this.items = [];
    }
    enqueue(element: T, priority: number) {
        const queueElement = new PriorityElement(element, priority);
        if (this.isEmpty()) {
            this.items.push(queueElement);
        } else {
            const prevIndex = this.items.findIndex((item: PriorityElement<T>): boolean => queueElement.priority < item.priority);
            if (prevIndex > -1) {
                this.items.splice(prevIndex, 0, queueElement);
            } else {
                this.items.push(queueElement);
            }
        }
    }
    dequeue() {
        return this.items.shift();
    }
    front() {
        return this.items[0];
    }
    isEmpty():boolean {
        return Object.is(this.size(), 0);
    }
    size():number {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
    toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0].element} -> ${this.items[0].priority}`;
        const length = this.items.length;
        if (length >= 2) {
            for (let i = 1; i < length; i++) {
                objString = `${objString},${this.items[i].element} -> ${this.items[i].priority}`;
            }
        }
        return objString;
    }
}

/**
 * 循环队列
 */
export class LoopQueue<T> {
    items: T[];
    constructor() {
        this.items = [];
    }
    enqueue(...elements: T[]) {
        this.items = this.items.concat(elements);
    }
    dequeue(): T | undefined {
        return this.items.shift();
    }
    front(): T | undefined {
        return this.items[0];
    }
    getIndex(index: number) {
        const length = this.items.length;
        return index > length ? (index % length): index;
    }
    find(index: number) {
        return !this.isEmpty() ? this.items[this.getIndex(index)]: undefined;
    }
    isEmpty() {
        return Object.is(this.size(), 0);
    }
    size():number {
        return this.items.length;
    }
    clear(): void {
        this.items = [];
    }
}

/**
 * 链表
 */
/**
 * 链表节点
 */
class Node<T> {
    element: T;
    next: Node<T> | null;
    constructor(element: T) {
        this.element = element;
        this.next = null;
    }
}
export class LinkedList<T> {
    head: Node<T> | null;
    length: number;
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // 追加元素
    append(...elements: T[]): void {
       elements.forEach((element: T) => {
           const node = new Node<T>(element);
           if (this.head === null) {
               this.head = node;
           } else {
               let current = this.head;
               while (current.next) {
                   current = current.next;
               }
               current.next = node;
           }
           this.length++;
       });
    }
    // 任意位置插入元素
    insert(position: number, element: T): boolean {
        if (position >= 0 && position <= this.length) { // 溢出检查
            const node = new Node<T>(element);
            if (position === 0) {
                if (this.head) {
                    node.next = this.head;
                    this.head = node;
                } else {
                    this.head = node;
                }
            } else {
                let current = this.head;
                let prev = null;
                let index = 0;

                while (index++ < position) {
                    prev = current;
                    current && (current = current?.next);
                }

                node.next = current;
                prev && (prev.next = node);
            }
            this.length++;
            return true;
        }
        return false;
    }
    // 移除指定位置的元素
    removeAt(position: number): boolean {
        if (position >= 0 && position < this.length) {
            let index = 0;
            let prev = null;
            let current = this.head;

            if (position === 0) {
                this.head = current ? current.next: null;
            } else {
                while (index++ < position) {
                    prev = current;
                    current = current ? current.next : null;
                }
                prev && (prev.next = current ? current.next: null);
            }

            this.length--;
            return true;
        }
        return false;
    }
    // 移除指定元素
    remove(element: T): boolean {
        if (this.head) {
            let current = this.head;
            let prev = null;
            let find = false;

            while (current.next && !find) {
                prev = current;
                current = current.next;
                find = current.element === element;
            }
            if (find) {
                prev && (prev.next = current ? current.next: null);
                this.length--;
            }
            return find;
        } else {
            return false;
        }
    }
    getHead(): Node<T> | null {
        return this.head;
    }
    // 是否为空
    isEmpty(): boolean {
        return Object.is(this.size(), 0);
    }
    // 元素数量
    size(): number {
        return this.length;
    }
    // 转为字符串
    toString(): string {
        if (this.head === null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current !== null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}

/**
 * 双向链表
 */
/**
 * 链表节点
 */
export class DoubleNode<T> {
    element: T;
    prev: DoubleNode<T> | null;
    next: DoubleNode<T> | null;
    constructor(element: T) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}

/**
 * 双向链表
 */
export class DoubleLinkedList<T> {
    head: DoubleNode<T> | null; // 头指针
    tail: DoubleNode<T> | null; // 尾指针
    length: number; // 链表长度
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    // 追加元素
    append(...elements: T[]): void {
        elements.forEach((element: T) => {
            let node = new DoubleNode<T>(element);
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail && (this.tail.next = node);
                node.prev = this.tail;
                this.tail = node;
            }
            this.length++;
        });
    }
    // 任意位置插入元素
    insert(position: number, element: T): boolean {
        if(position >= 0 && position <= this.length) {

        }
        return false;
    }
    // 移除指定位置的元素
    removeAt(position: number) {

    }
    // 移除指定元素
    remove(element: T) {

    }
    // 获取最后一个节点
    lastNode() {
        let last = this.head;
        while (this.head?.next) {
            last = this.head.next;
        }
        return last;
    }
    getHead() {

    }
    isEmpty() {

    }
    size() {

    }
    toString() {

    }
}

/**
 * 集合
 * 并集：对于给定的两个或多个集合，返回一个包含所有给定集合中所有元素的新集合
 * 交集：对于给定的两个或多个集合，返回一个包含所有给定集合中所有共有元素的新集合
 * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
 * 子集：求证一个给定集合中的元素是否全部包含于另一个集合
 */
export class Set {
    items: any;
    constructor(...elements: any[]) {
        this.items = {};
        elements.forEach((element: any) => {
            this.add(element);
        });
    }
    has(value: any): boolean {
        return this.items.hasOwnProperty(value);
    }
    add(value: any): boolean {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }
    addByGroup(...elements: any[]) { // 批量添加
        elements.forEach((element: any) => {
            this.add(element);
        });
    }
    remove(value: any) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }
    // 合集
    union(...otherSets: Set[]): Set {
        const unionSet = new Set();
        const values = this.values();
        const handle = (values: Array<any>, set: Set) => {
            values.forEach((val: any, index: number) => {
                set.add(values[index]);
            });
        };
        handle(values, unionSet);
        otherSets.forEach((otherSet: Set) => {
            const values = otherSet.values();
            handle(values, unionSet);
        });
        return unionSet;
    }
    // 交集
    intersection(...otherSets: Array<Set>): Set {
        const intersection = new Set();
        let othersValues: any = this.values().filter((element: any) => otherSets.every((set: Set) => set.values().includes(element)));
        intersection.addByGroup(...othersValues);
        return intersection;
    }
    // 差集
    difference(otherSet: Set): Set {
        const difference = new Set();
        const values = this.values().filter((element: any) => !otherSet.values().includes(element));
        difference.addByGroup(...values);
        return difference;
    }
    // 子集
    subset(otherSet: Set): boolean {
        if (this.size() > otherSet.size()) return false
        return this.values().every((element: any) => otherSet.has(element));
    }
    size(): number {
        return Object.keys(this.items).length;
    }
    values(): Array<any> {
        return Object.keys(this.items);
    }
}

/**
 * 字典
 */
export class Dictionary {
    items: any;
    constructor() {
        this.items = {};
    }
    set(key: string, value: any): void {
        this.items[key] = value;
    }
    get(key: string): any {
        return this.items[key];
    }
    hasKey(key: string): boolean {
        return this.keys().includes(key);
    }
    remove(key: string): boolean {
        if(this.hasKey(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }
    isEmpty(): boolean {
        return Object.is(Object.keys(this.items).length, 0);
    }
    size(): number {
        return Object.keys(this.items).length;
    }
    keys(): string[] {
        return Object.keys(this.items);
    }
    values(): Array<any> {
        return Object.values(this.items);
    }
    clear(): void {
        this.items = {};
    }
}

/**
 * 散列表
 * 散列表中有时可能会出现相同的散列值，导致最终的数据对象中，只有最后一次被添加/修改的数据会覆盖原本数据，进而生效。
 * 使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过某些方法将它们全部保存起来；处理冲突的方法有：1.分离链接 2.线性探索 3.双散列法。
 */
export class HashTable {
    table: any[];
    constructor() {
        this.table = [];
    }
    // 散列函数
    static loseHashCode(key: string, better: boolean = true): number {
        if (better) {
            let hash = 5381;
            for (let i = 0; i < key.length; i++) {
                hash = hash * 33 + key.charCodeAt(i);
            }
            return hash % 1013;
        }
        else {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % 37;
        }
    }
    // 修改和增加元素
    put(key: string, value: any): void {
        const position = HashTable.loseHashCode(key);
        console.log(`${position} - ${key}`);
        this.table[position] = value;
    }
    // 通过key获取值
    get(key: string): any {
        return this.table[HashTable.loseHashCode(key)];
    }
    // 通过键值删除值
    remove(key: string): any {
        this.table[HashTable.loseHashCode(key)] = undefined;
    }
}

/**
 * 增强版散列值
 */
export class HashTableEnhance extends HashTable {
    put(key: string, value: any): void {
        const position = HashTableEnhance.loseHashCode(key, false);
        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList();
        }
        this.table[position].append({ key, value });
    }
    get(key: string): any {
        const position = HashTableEnhance.loseHashCode(key, false);
        const linkedList = this.table[position];
        if (linkedList !== null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current !== null) {
                const { key: theKey, value } = current.element;
                if(theKey === key) {
                    return value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    remove(key: string): boolean {
        const position = HashTableEnhance.loseHashCode(key, false);
        const linkedList = this.table[position];
        if (linkedList !== null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current !== null) {
                const { key: theKey } = current.element;
                if (theKey === key) {
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()) {
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }
}

/**
 * 二叉搜索树
 */
class BSTNode<T> {
    key: T;
    left: BSTNode<T> | null;
    right: BSTNode<T> | null;
    constructor(key: T) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
export class BinarySearchTree<T> {
    root: BSTNode<T> | null;
    compareFn: Function;
    constructor() {
        this.root = null;
        this.compareFn = defaultCompare;
    }
    // 向树中插入一个新的键
    insert(...keys: T[]) {
        keys.forEach((key: T) => {
            const newNode = new BSTNode<T>(key);
            const insertNode = (node: BSTNode<T>, newNode: BSTNode<T>) => {
                if (newNode.key < node.key) {
                    if (node.left === null) {
                        node.left = newNode;
                    } else {
                        insertNode(node.left, newNode);
                    }
                } else {
                    if (node.right === null) {
                        node.right = newNode;
                    } else {
                        insertNode(node.right, newNode);
                    }
                }
            }
            if (!this.root) {
                this.root = newNode;
            } else {
                insertNode(this.root, newNode);
            }
        });
    }
    // 在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false
    search(key: T) {
        const searchNode = (node: BSTNode<T> | null, key: T): boolean => {
            if (node === null) {
                return false;
            } else {
                if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                    return searchNode(node.left, key);
                } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                    return searchNode(node.right, key);
                } else {
                    return true;
                }
            }
        };
        return searchNode(this.root, key);
    }
    /*
       先序遍历是以优先后代节点的顺序访问每个节点的
       遍历顺序：节点本身 -> 左节点 -> 右节点
     */
    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node !== null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    };
    /*
       中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点
       遍历顺序：左节点 -> 节点本身 -> 右节点
     */
    inOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    /*
       后序遍历则是先访问节点的后代节点，再访问节点本身
       遍历顺序：左节点 -> 节点本身 -> 右节点
     */
    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    // 返回树中的最小值
    min(): BSTNode<T> | null {
        return this.minNode(this.root);
    }
    minNode(node: BSTNode<T> | null): BSTNode<T> | null {
        return node ? (node.left ? this.minNode(node.left): node): null;
    }
    // 返回树中的最大值
    max(): BSTNode<T> | null {
        return this.maxNode(this.root);
    }
    maxNode(node: BSTNode<T> | null): BSTNode<T> | null {
        return node ? (node.right ? this.maxNode(node.right): node) : null;
    }
    // 从树中移除某个键
    remove(key: any) {
        return this.removeNode(this.root, key);
    }
    removeNode(node: BSTNode<T> | null, key: any): any {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 键等于node.key
            // 第一种情况
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // 第二种情况
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // 第三种情况
            const aux = this.minNode(node.right);
            aux && (node.key = aux.key);
            aux && (node.right = this.removeNode(node.right, aux.key));
            return node;
        }
    }
}

/**
 * 图
 */
export class Graph<T> {
    vertices: T[];
    adjList: Dictionary;
    constructor() {
        this.vertices = [];
        this.adjList = new Dictionary();
    }
    // 添加顶点
    addVertex(...v: T[]) {
        v.forEach((ele: T) => {
            this.vertices.push(ele);
            this.adjList.set(String(ele), []);
        });
    }
    // 添加线
    addEdge(v: T, w: T) {
        this.adjList.get(`${v}`).push(w);
        this.adjList.get(`${w}`).push(v);
    }
    // 转为字符串
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) { // {15}
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(`${this.vertices[i]}`); // {16}
            for (let j = 0; j < neighbors.length; j++) { // {17}
                s += `${neighbors[j]} `;
            }
            s += '\n'; // {18}
        }
        return s;
    }
}
