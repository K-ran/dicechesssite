import React, { Component } from 'react';
import Game from './game/Game';
import Home from './home/Home';
import Waiting from './waiting/Waiting';
import './MainContent.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class MainContent extends Component {
    render() {
        return (
            <main className="main_content">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/home" component={Home} exact />
                        <Route path="/game/:gameId/:playerName/:playerId" component={Game} exact />
                        <Route path="/waiting/:gameId/:playerName/:playerId" component={Waiting} exact />       
                        {/* <Route path="/about" component={Waiting} exact />        */}
                        {/* Add a error route */}
                    </Switch>
                </BrowserRouter>
            </main>
        );
    }
}

export default MainContent;