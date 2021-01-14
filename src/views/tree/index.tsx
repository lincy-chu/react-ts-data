import React from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";

const Trees = () => {
    const treeStr = `一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点。位于树顶部的节点叫做根节点。它没有父节点。树中的每个元素都叫作节点，节点分为内部节点和外部节点。节点的一个属性时深度，节点的深度取决于它的祖先节点的数量。树的高度取决于所有节点深度的最大值。`;
    const treeStr1 = `二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出高效地在树中插入、查找和删除节点的算法。二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。`;
    return (
        <div>
            <Title title={'树'} />
            <Introduction val={treeStr} />
            <Introduction val={treeStr1} />
        </div>
    );
};

export default Trees;
