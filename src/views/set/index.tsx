import React, {useEffect} from "react";
import Title from "../../components/Title";
import Introduction from "../../components/Introduction";
import { Set } from "../../class";
import { LogStart, Log } from "../../utils";

const Sets = () => {
    const setStr = '集合是由一组无序且唯一的项组成的。';

    useEffect(() => {
        LogStart('集合', () => {
            const set = new Set();
            set.add(1);
            Log(set.values());
            Log(set.has(1));
            Log(set.size());
            set.add(2);
            set.add(3);
            set.remove(1);
            Log(set.values());
            Log('并集', set.union(new Set(3, 5, 6, 7, 8)).values());
            const intersection = set.intersection(new Set(2, 88), new Set(2, 3, 3, 100));
            Log('交集', intersection.values());
            const difference = set.difference(new Set(3, 4, 5));
            Log('差集', difference.values());
            Log('子集', set.subset(new Set(2, 3, 4)));
            Log('子集', set.subset(new Set(2, 5, 6)));
        });
    }, []);

    return (
        <div>
            <Title title={'集合'} />
            <Introduction val={setStr} />
        </div>
    );
};

export default Sets;
