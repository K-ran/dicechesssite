import React, { Component } from 'react';
import AboutBox from './aboutbox/AboutBox';
import CreateBox from './createbox/CreateBox';
import './Home.css';
import JoinBox from './joinbox/JoinBox';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <CreateBox/>
                <JoinBox/>
                <AboutBox/>
            </div>
        )
    }
}
