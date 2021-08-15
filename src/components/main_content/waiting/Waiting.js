import React, { Component } from 'react';
import './Waiting.css';

export default class Waiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.gameId,
            playerName: this.props.match.params.playerName
        }
    }
    
    render() {
        return (
            <div className="waiting_text_container">
                <div className="waiting_text">Hi <strong>{this.state.playerName}</strong>, please ask your opponent to join the dice chess session using the link: <br/><strong>{this.state.gameId}</strong>.</div>
            </div>
        )
    }
}
