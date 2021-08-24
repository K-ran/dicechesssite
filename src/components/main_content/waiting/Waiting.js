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
                
                //Wait for other player to join
                if(data.gameState === GAME_RESPONSE.RUNNING){
                    data["playerId"] = this.state.playerId;
                    this.props.history.push('/game/',data)
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
                <div className="waiting_text">Hi {this.state.playerName}, please ask your opponent to join the dice chess session using the game id: <strong>{this.state.gameId}</strong>  
                or share <a href={"/join/"+this.state.gameId} target="_blank" rel="noopener noreferrer">this link.</a>
                </div>
            </div>
        )
    }
}

export default withRouter(Waiting);