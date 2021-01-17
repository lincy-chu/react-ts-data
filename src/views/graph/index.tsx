import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import "./index.css";
import graphImg from "../../static/graph.png";
import graphImg1 from "../../static/graph1.png";
import graphImg2 from "../../static/graph2.png";
import graphImg3 from "../../static/graph3.png";
import graphImg4 from "../../static/graph4.png";
import graphImg5 from "../../static/graph5.png";
import graphImg6 from "../../static/graph6.png";
import {Graph} from "../../class";
import {Log} from "../../utils";

const Graphs = () => {
    const graphStr = '图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。我们还可以使用图来表示道路、航班以及通信。';
    const graphStr1 = '由一条边连接在一起的顶点称为相邻顶点。一个顶点的度是其相邻顶点的数量。路径是顶点v1，v2，...，vk的一个连续序列，其中vi和vi+1是相邻的。简单路径要求不包含重复的顶点。如果图中不存在环，则称该图是无环的。如果图中每两个顶点间都存在路径，则该图是连通的。';

    useEffect(() => {
        const graph = new Graph<string>();
        graph.addVertex('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I');
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('A', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('C', 'G');
        graph.addEdge('D', 'G');
        graph.addEdge('D', 'H');
        graph.addEdge('B', 'E');
        graph.addEdge('B', 'F');
        graph.addEdge('E', 'I');
        Log(graph.toString());
    }, []);

    return (
        <div>
            <Title title={'图'} />
            <Introduction val={graphStr} />
            <h4>1.图的相关术语</h4>
            <p>一个图G=(V，E)由以下元素组成：</p>
            <ul>
                <li>V：一组顶点</li>
                <li>E：一组边，连接V中的顶点</li>
            </ul>
            <img src={graphImg} alt="" />
            <Introduction val={graphStr1} />
            <h4>2.有向图和无向图</h4>
            <p>图可以是无向的（边没有方向）或是有向的（有向图）。</p>
            <img src={graphImg1} alt=""/>
            <p>如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如，C和D是强连通的，而A和B不是强连通的。</p>
            <p>图可以是为加权的（目前为止我们看到的图都是为加权的）或是加权的。加权图的边被赋予权值。我们可以使用图来解决计算机科学世界中的很多问题，比如搜索图中的一个特定顶点或搜索一条特定边，寻找图中的一条路径（从一个顶点到另一个顶点），寻找两个顶点之间的最短路径，以及环检测。</p>
            <img src={graphImg2} alt=""/>
            <h4>3.图的表示</h4>
            <p>从数据结构的角度来说，有很多方式来表示图。在所有的表示法中，不存在绝对正确的方式，图的正确表示法取决于待解决的问题和图的类型。</p>
            <h5>3.1 邻接矩阵</h5>
            <p>图最常见的实现是相邻矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示顶点之间的连接。如果索引为i的节点和索引为j的节点相邻，则array[i][j] === 1, 否则array[i][j] === 0。</p>
            <img src={graphImg3} alt=""/>
            <p>不是强连接的图（稀疏图）如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们浪费了计算器存储空间来表示根本不存在的边。例如，找给定顶点的相邻顶点，即使该顶点只有一个相邻顶点，我们也不得不迭代一整行。相邻矩阵表示法不够好的另一个理由是，图中顶点的数量可能会改变，而二维数组不太灵活。</p>
            <h5>3.2 邻接表</h5>
            <p>可以使用一种叫做邻接表的动态数据结构来表示图。邻接表由图中每个顶点的相邻顶点列表所组成。</p>
            <img src={graphImg4} alt=""/>
            <h5>3.3 关联矩阵</h5>
            <p>还可以用关联矩阵来表示图。在关联矩阵中，矩阵的行为表示顶点，列表示边。如下图所示，使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则array[v][e] === 1，否则array[v][e] === 0。</p>
            <img src={graphImg5} alt=""/>
            <p>关联矩阵通常用于边的数量比顶点多的情况，以节省空间和内存。</p>
            <h5>3.4 图的遍历</h5>
            <p>和树数据结构类似，我们可以访问图的所有节点。有两种算法可以对图进行遍历：广度优先搜索（breadth-first search, BFS）和深度优先搜索（depth-first search， DFS）。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否有环等等。</p>
            <p>图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于这两种图遍历算法，都需要明确指出第一个被访问的顶点。</p>
            <p>完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。</p>
            <p>为了保证算法的效率，务必访问每个顶点之多两次。连接图中每条边和顶点都会被访问到。</p>
            <p>广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点列表的数据结构。</p>
            <img src={graphImg6} alt="" style={{width: '100%'}} />
        </div>
    );
};

export default Graphs;
