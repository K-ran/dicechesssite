import React, { Component } from 'react';
import './Waiting.css';
import {CONSTANTS, GAME_RESPONSE} from '../../../Constants'
import { withRouter } from 'react-router-dom' 

class Waiting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.gameId,
            playerName: this.props.match.params.playerName,
            playerId:   this.props.match.params.playerId
        }
    }
    
    componentDidMount() {
        this.interval = setInterval(
            async () => {
                const res = await fetch(CONSTANTS.rest_url+'/getstatus/'+this.state.gameId+'/'+this.state.playerId);
                const data = await res.json();
                if(data.gameState === GAME_RESPONSE.RUNNING){
                    console.log(data);
                    let gameId = this.state.gameId;
                    let playerName = this.state.playerName;
                    let playerId = this.state.playerId;
                    this.props.history.push('/game/'+gameId+"/"+playerName+"/"+playerId)
                }
            },
            1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div className="waiting_text_container">
                <div className="waiting_text">Hi <strong>{this.state.playerName}</strong>, please ask your opponent to join the dice chess session using the link: <br/><strong>{this.state.gameId}</strong>.</div>
            </div>
        )
    }
}

export default withRouter(Waiting);