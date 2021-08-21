import React, { Component } from 'react'
import './AboutBox.css'

export default class AboutBox extends Component {
    render() {
        return (
            <div className="create_box about_box box">
                <div className="create_title">What is this site?</div>
                <div className="about_description">
                Dice chess is a chess variant where each player plays only the piece that shows up on the dice.
                This simple platform makes it easy for you and your opponent to play it along any online chess platform.
                </div>
                <div className="create_title">How to use it?</div>
                <div className="about_description">
                Host a dice session by creating a new session from ‘Create Session’ section. You will be given a unique key / link that can be given to your opponent. Share it your opponent and he can join a shared dice session with you. Enjoy!
                </div>
            </div>
        )
    }
}
