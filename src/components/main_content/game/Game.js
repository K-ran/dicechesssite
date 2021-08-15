import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.gameId,
            playerName: this.props.match.params.playerName
        }
        console.log(this.state)
    }
    
    render() {
        return (
            <div className="game_container">
                Welcome to the game {this.state.playerName}.
            </div>
        )
    }
}
