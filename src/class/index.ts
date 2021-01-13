import {Component, FC} from "react";
import {Meta, RouteItem,} from "../interface";

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
    head: DoubleNode<T> | null;
    tail: DoubleNode<T> | null;
    length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    // 任意位置插入元素
    insert(position: number, element: T): boolean {
        if(position >= 0 && position <= this.length) {

        }
        return false;
    }
}
