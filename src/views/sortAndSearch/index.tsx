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
    }, []);

    return (
        <div>
            <Title title={'排序和搜索算法'} />
            <header>1.冒泡排序 - 复杂度是O(n<sup>2</sup>)</header>
            <Introduction val={str} />
            <p>冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。</p>
            <header>2.选择排序</header>
            <p>选择排序算法时一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将放在第二位，以此类推。</p>
        </div>
    );
};

export default SortAndSearch;
