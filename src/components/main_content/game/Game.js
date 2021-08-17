import React, { Component } from 'react';
import './Game.css';
import './dice/Dice';
import Dice from './dice/Dice';
export default class Game extends Component {
    constructor(props) {
        super(props);
        
        let gameData = this.props.location.state
        console.log(this.props.location.state);
        
        this.state = {
            gameId: gameData.gameId,
            player1Name: gameData.p1.name,
            player2Name: gameData.p2.name,
            diceNumber: gameData.dice.length,
            playerId: gameData.playerId,
            face:["to-king","to-king","to-king"]
        }
        console.log(this.state)
    }
    
    getDice = (faceIndex) => {
        return <Dice key={faceIndex} face={faceIndex}></Dice>
    }

    getDiceArray = ()=>{
        let diceArray = []
        for (let index = 0; index < this.state.diceNumber; index++) {
            diceArray.push(this.getDice(index))
        }
        return diceArray
    }

    render() {
        return (
            <div className="game_container">
                <div className="game_heading">{this.state.player1Name} vs {this.state.player2Name}</div>
                <div className="dice_container">
                    {this.getDiceArray()}
                </div>
            </div>
        )
    }
}
