import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import searchView from "./components/ContentPage/searchView";

const Router = () => {
   return (
    <BrowserRouter>
        <Switch>
            <Route>
                <Route path="/" component={App} exact/>
                <Route path="/movie/:id" component={searchView}/>
            </Route>
        </Switch>
    </BrowserRouter>
)}

export default Router;