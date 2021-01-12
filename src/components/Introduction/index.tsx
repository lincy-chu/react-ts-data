import React from "react";

interface IntroductionProps {
    val: string;
}

const Introduction = ({ val }: IntroductionProps ) => {
    return (
        <p>{val}</p>
    );
};

export default Introduction;
