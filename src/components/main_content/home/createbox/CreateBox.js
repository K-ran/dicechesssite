import React, { Component } from 'react'
import './CreateBox.css'

export default class CreateBox extends Component {
    render() {
        return (
            <div className="create_box box">
                <div className="create_title">
                    Create Session
                </div>
                <form className="create_form">
                    <input type="text" name="gameName" placeholder="Name of the Game" className="dice_input" />

                    <input type="text" name="playerName" placeholder="Your Name" className="dice_input" />
                    
                    <input type="button" value="Submit" />
                </form>
            </div>
        )
    }
}
