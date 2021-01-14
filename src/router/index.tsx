import React from "react";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { RouterItem, MetaItem } from '../class';
import { RouteItem } from '../interface';
import ArrAndRecursion from "../views/arrAndRecursion";
import Stacks from "../views/stack";
import Queues from "../views/queue";
import LinkedLists from "../views/linkedList";
import Sets from "../views/set";
import TheDictionary from "../views/dictionary";

export const routes: RouteItem[] = [
    new RouterItem('/', ArrAndRecursion, new MetaItem('数组和递归')),
    new RouterItem('/stack', Stacks, new MetaItem('栈')),
    new RouterItem('/queue', Queues, new MetaItem('队列')),
    new RouterItem('/linkedList', LinkedLists, new MetaItem('链表')),
    new RouterItem('/set', Sets, new MetaItem('集合')),
    new RouterItem('/dictionary', TheDictionary, new MetaItem('字典')),
];

export default function Routers() {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                {
                    routes.length > 0 && routes.map((route: any, index: number) => {
                        return <Route
                            key={index}
                            exact={index === 0}
                            path={route.path}
                            render={(props: any) => {
                                document.title = route.meta.title;
                                return <route.component {...props} routes={route.routes}/>;
                            }}
                        />
                    })
                }
            </Switch>
        </Router>
    );
}
