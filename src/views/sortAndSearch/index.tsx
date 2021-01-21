import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {Compare, defaultCompare, LogStart, Log, Timer} from "../../utils";

const SortAndSearch = () => {
    const str = '开始学习排序算法时，通常都先学冒泡算法，因为它在所有排序算法中最简单。然而，从运行时间的角度来看，冒泡排序是最差的一个。';

    useEffect(() => {
        const swap = (array: number[], a: number, b: number) => {
            console.log(`${array[a]} > ${array[b]}，交换${array[a]}和${array[b]}`);
            [array[a], array[b]] = [array[b], array[a]];
        };
        LogStart('冒泡排序', () => {
            Timer('冒泡排序', () => {
                const bubbleSort = (array: number[], compareFn: Function = defaultCompare) => {
                    const { length } = array;
                    let num = 0;
                    for (let i = 0; i < length; i++) {
                        for (let j = 0; j < length - 1; j++) {
                            num++;
                            console.log(`第${num}次交换前`, array);
                            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                                swap(array, j, j + 1);
                            }
                        }
                    }
                    return array;
                };
                const arr = [5, 4, 3, 2, 1];
                Log('完成排序后', bubbleSort(arr));
            });
        });

        LogStart('改进后的冒泡排序', () => {
            Timer('改进后的冒泡排序', () => {
                const modifiedBubbleSort = (array: number[], compareFn = defaultCompare) => {
                    const { length } = array;
                    let num = 0;
                    for (let i = 0; i < length; i++) {
                        for (let j = 0; j < length - i - 1; j++) {
                            num++;
                            console.log(`第${num}次交换前`, array);
                            // 如果从内循环减去外循环中已跑过的轮数，就可以避免内循环中所有不必要的比较
                            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                                swap(array, j, j + 1);
                            }
                        }
                    }
                    return array;
                };
                const arr = [5, 4, 3, 2, 1];
                Log('完成排序后', modifiedBubbleSort(arr));
            });
        });

        LogStart('选择排序', () => {
            Timer('选择排序', () => {
                const selectSort = (array: number[], compareFn: Function = defaultCompare): number[] => {
                    const { length } = array;
                    let num = 0;
                    let indexMin;
                    for (let i = 0; i < length - 1; i++) {
                        indexMin = i;
                        for (let j = i; j < length; j++) {
                            num++;
                            Log(`已循环次数${num}`);
                            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                                indexMin = j;
                            }
                        }
                        if (indexMin !== i) {
                            Log(`交换前 ${array.toString()}`);
                            Log(`交换${array[i]}和${array[indexMin]}`);
                            swap(array, i, indexMin);
                        }
                    }
                    return array;
                };
                const arr = [5, 4, 3, 2, 1];
                Log('选择排序后', selectSort(arr));
            });
        });

        LogStart('数组的选择排序', () => {
            Timer('数组的选择排序', () => {
                const arr = [5, 4, 3, 2, 1];
                Log('扩展数组的property属性', arr.selectSort());
            });
        });

        LogStart('插入排序', () => {
            Timer('数组的插入排序', () => {
                const arr = [5, 4, 3, 2, 1];
                const insertionSort = (array: number[], compareFn: Function = defaultCompare) => {
                    const { length } = array;
                    let temp;
                    for (let i = 1; i < length; i++) {
                        let j = i;
                        temp = array[i];
                        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
                            Log(`${array[j - 1]} > ${temp}, 换位`);
                            array[j] = array[j - 1];
                            j--;
                        }
                        array[j] = temp;
                    }
                    return array;
                };
                Log(insertionSort(arr));
            });
        });

        LogStart('归并排序', () => {
            Timer('归并排序', () => {
                const merge = (left: number[], right: number[], compareFn: Function) => {
                    let i = 0;
                    let j = 0;
                    const result: number[] = [];
                    while (i < left.length && j < right.length) {
                        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++]: right[j++]);
                    }
                    return result.concat(i < left.length ? left.slice(i): right.slice(j));
                };
                 const mergeSort = (array: number[], compareFn: Function = defaultCompare) => {
                     if (array.length > 1) {
                         const { length } = array;
                         const middle = Math.floor(length / 2);
                         const left = mergeSort(array.slice(0, middle), compareFn);
                         const right = mergeSort(array.slice(middle), compareFn);
                         array = merge(left, right, compareFn);
                     }
                     return array;
                 }
                 Log(mergeSort([8, 7, 6, 5, 4, 3, 2, 1]));
            });
        });
    }, []);

    return (
        <div>
            <Title title={'排序和搜索算法'} />
            <header>1.冒泡排序 - 复杂度是O(n<sup>2</sup>)</header>
            <Introduction val={str} />
            <p>冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。</p>
            <header>2.选择排序</header>
            <p>选择排序算法时一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将放在第二位，以此类推。</p>
            <header>3.插入排序</header>
            <p>插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了，接着，它和第二项进行比较———第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着喝第三项比较（它是该插入到第一、第二还是第三的位置）。以此类推</p>
            <header>4.归并排序</header>
            <p>归并排序是第一个可以实际使用的排序算法。前三种排序算法性能不好，但归并排序性能不错，其复杂度为O(nlog(n))。</p>
            <p>归并排序是一种分而治之算法。其思想是将原始数组分成较小的数组，直到每个小数组只有一个位置，接着讲小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。</p>
            <p>由于是分治法，归并排序也是递归的。我们要将算法分为两个函数：第一个负责将一个大数组分为多个小数组并调用用来排序的辅助函数。</p>
            <header>4.快速排序</header>
            <p>快速排序也许是最常用的排序算法了。它的复杂度为O(nlog(n))，且性能通常比其他复杂度为O(nlog(n))的排序算法要好。和归并排序一样，快速排序也使用分而治之的方法，将原始数组为较小的数组（但它没有像归并排序那样将它们分隔开）。</p>
        </div>
    );
};

export default SortAndSearch;
