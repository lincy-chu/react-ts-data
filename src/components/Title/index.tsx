import React from "react";

interface TitleProps {
    title: string;
}

const Title = ({ title }: TitleProps) => {
    return <h2>{title}</h2>;
}

export default Title;
