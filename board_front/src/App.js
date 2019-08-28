import React from 'react';

import Home from "./Home";
import Board from "./Board/index"

import "./App.scss";

import {BrowserRouter, Route} from "react-router-dom";

import {Provider} from 'mobx-react';
import Stores from "./Stores";
import Profile from "./Profile";
import LoginBar from "./Profile/LoginBar"


const App = ()=>(
    <Provider stores={Stores}>
        <BrowserRouter>
            <header className="app-header">
                <LoginBar></LoginBar>
            </header>
            <section className="app-body">

                <Route path = "/" exact component={Home}/>
                <Route path = "/board/:command?/:postid?/:pageNumber?" exact component={Board}/>
                <Route path = "/user/:command?/:userId?" exact component={Profile}/>
            </section>


        </BrowserRouter>
    </Provider>
)

export default App;
