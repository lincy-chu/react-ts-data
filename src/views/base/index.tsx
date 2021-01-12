import React, {useEffect} from "react";
import MarkdownEditor from "../../components/MarkdownEditor";

const Base = () => {
    useEffect(() => {

    }, []);
    return (
        <div>
            <h2>算法基础 - 动态规划</h2>
            <MarkdownEditor val={'测试'}/>
        </div>
    );
};

export default Base;
