import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import Search from "./components/FrontPage/search";
import MovieSelect from "./components/MovieSelect/MovieSelect";


const Router = () => {
    <BrowserRouter>
    <Switch>
    <Route path="/popular" component={Search} exact/>
    <Route path="/popular/:id" coponent={MovieSelect}/>
    </Switch>
    </BrowserRouter>
}