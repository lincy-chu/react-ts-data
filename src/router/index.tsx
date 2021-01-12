import React from "react";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { RouterItem, MetaItem } from '../class';
import { RouteItem } from '../interface';
import Arr from "../views/arr";
import Stacks from "../views/stack";

export const routes: RouteItem[] = [
    new RouterItem('/', Arr, new MetaItem('数组')),
    new RouterItem('/stack', Stacks, new MetaItem('栈')),
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
