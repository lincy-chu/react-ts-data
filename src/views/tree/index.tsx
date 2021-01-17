import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import {BinarySearchTree} from "../../class";
import { LogStart, Log } from '../../utils'

const Trees = () => {
    const treeStr = `一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点。位于树顶部的节点叫做根节点。它没有父节点。树中的每个元素都叫作节点，节点分为内部节点和外部节点。节点的一个属性时深度，节点的深度取决于它的祖先节点的数量。树的高度取决于所有节点深度的最大值。`;
    const treeStr1 = `二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出高效地在树中插入、查找和删除节点的算法。二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。`;

    useEffect(() => {
        const tree = new BinarySearchTree<number>();
        tree.insert(11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25);
        console.log(tree);
        tree.insert(6);
        console.log(tree);
        LogStart('树的中序遍历', () => {
            tree.inOrderTraverse((value: number) => {
                console.log(value);
            });
        });
        LogStart('树的先序遍历', () => {
            tree.preOrderTraverse((value: number) => {
                console.log(value);
            });
        });
        LogStart('树的后序遍历', () => {
            tree.postOrderTraverse((value: number) => {
                console.log(value);
            });
        });
        LogStart('最小值与最大值', () => {
            Log('最小值', tree.min());
            Log('最大值', tree.max());
        });
        LogStart('搜索节点', () => {
            Log(tree.search(1) ? 'Key 1 found.': 'Key 1 not found.');
            Log(tree.search(8) ? 'Key 8 found.': 'Key 8 not found.');
        });
        LogStart('移除节点', () => {
            Log(tree.remove(8));
        });
    }, []);

    return (
        <div>
            <Title title={'树'} />
            <Introduction val={treeStr} />
            <Introduction val={treeStr1} />
        </div>
    );
};

export default Trees;
