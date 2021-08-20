import React, { Component } from 'react';
import './Game.css';
import './dice/Dice';
import Dice from './dice/Dice';
import {CONSTANTS, DICE_RESPONSE} from '../../../Constants'

export default class Game extends Component {
    constructor(props) {
        super(props);
        
        let gameData = this.props.location.state
        
        this.state = {
            gameId: gameData.gameId,
            player1Name: gameData.p1.name,
            player2Name: gameData.p2.name,
            diceNumber: gameData.dice.length,
            playerId: gameData.playerId,
            face:["to-king","to-king","to-king"],
            buttonDisabled: false,
        }

        this.rollcounter = 0;
        this.continousUpdate = true;
    }
    
    getDice = (faceIndex) => {
        return <Dice key={faceIndex} face={this.state.face[faceIndex]}></Dice>
    }

    getDiceArray = ()=>{
        let diceArray = []
        for (let index = 0; index < this.state.diceNumber; index++) {
            diceArray.push(this.getDice(index))
        }
        return diceArray
    }

    intToFaceString(value){
        switch (value) {
            case 0:
                return "to-king";
            case 1:
                return "to-queen";        
            case 2:
                return "to-rook";
            case 3:
                return "to-pawn";
            case 4:
                return "to-bishop"; 
            case 5:
                return "to-knight";   
            default:
                return "to-king";
        }
    }

    onRollClick = () => {
        this.continousUpdate = false //stop the automatic update
        let newDiceState  = []
        for (let index = 0; index < this.state.diceNumber; index++) {
            newDiceState.push("rolling")
        }
        this.setState({
            face: newDiceState,
            buttonDisabled:true
        }, () => {
            fetch(CONSTANTS.rest_url+'/roll/'+this.state.gameId+'/'+this.state.playerId,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                  },
            }).then(response => {
                return response.json()
            }).then(data =>{
                console.log(data)
                if(data.type === DICE_RESPONSE.RESPONSE_ROLL){
                    this.rollcounter = data.rollCount
                    let newDiceState  = []
                    data.dice.forEach(element => {
                        newDiceState.push(this.intToFaceString(element.value))
                    });
                    this.setState({
                        buttonDisabled:false,
                        face: newDiceState
                    },()=>{
                        this.continousUpdate = true //start the automatic update
                    })
                }
                else{
                    this.continousUpdate = true
                }

            })
        })
    }


    componentDidMount() {
        this.interval = setInterval(
            async () => {
                if(!this.continousUpdate){
                    return;
                }
                const res = await fetch(CONSTANTS.rest_url+'/getstatus/'+this.state.gameId+'/'+this.state.playerId);
                const data = await res.json();
                if(this.rollcounter !== data.rollCount){
                    //component should be updated
                    this.rollcounter = data.rollCount
                    let newDiceState  = []
                    let rollingDiceState  = []
                    data.dice.forEach(element => {
                        rollingDiceState.push("rolling") //just for the animation
                        newDiceState.push(this.intToFaceString(element.value))
                    });
                    this.setState({
                        face: rollingDiceState
                    },() => {
                        setTimeout(() => {
                            this.setState({
                                face: newDiceState
                            })
                        },100)
                    })
                }
            },
            1000);
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <div className="game_container">
                <div className="game_heading">{this.state.player1Name} vs {this.state.player2Name}</div>
                <div className="dice_container">
                    {this.getDiceArray()}
                </div>
                <button className="dice_roll_button" disabled={this.state.buttonDisabled} onClick={this.onRollClick}>ROLL!</button>
            </div>
        )
    }
}
