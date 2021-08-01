import React, { Component } from 'react'
import './CreateBox.css'

export default class CreateBox extends Component {

    // constructor(props) {
    //     super(props);
    //   }

    joinHandler = ()=>{
        console.log("Join called");
    }

    render() {
        return (
            <div className="create_box box">
                <div className="create_title">
                    Create Session
                </div>
                <form className="create_form">
                    <input type="text" name="gameName" placeholder="Name of the Game" className="dice_input" />

                    <input type="text" name="playerName" placeholder="Your Name" className="dice_input" />
                    
                    <select defaultValue="3" name="diceNum" className="dice_input_selection" >
                        <option value="1">Number of dice: 1</option>
                        <option value="2">Number of dice: 2</option>
                        <option value="3">Number of dice: 3</option>
                    </select>

                    <input type="button" value="Join" className="dice_input_button" onClick={this.joinHandler}/>

                </form>
            </div>
        )
    }
}
