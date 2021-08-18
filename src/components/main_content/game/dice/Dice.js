import React, { Component } from 'react'
import './Dice.css'

export default class Dice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spinClass: props.face
        }
    }

    changeDiceMode = (newMode) => {
        this.setState({
            spinClass:newMode
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.face !== this.props.face){
            this.setState({
                spinClass:this.props.face
            })
        }
    }

    render() {
        return (
            <div className="scene">
                <div className={"cube "+ this.state.spinClass}>
                    <div className="cube__face cube__face--front"></div>
                    <div className="cube__face cube__face--back"></div>
                    <div className="cube__face cube__face--right"></div>
                    <div className="cube__face cube__face--left"></div>
                    <div className="cube__face cube__face--top"></div>
                    <div className="cube__face cube__face--bottom"></div>
                </div>
            {/* <button onClick={() => this.changeDiceMode("rolling")}>Rolling</button>
            <button onClick={() => this.changeDiceMode("to-king")}>King</button>
            <button onClick={() => this.changeDiceMode("to-queen")}>Queen</button>
            <button onClick={() => this.changeDiceMode("to-rook")}>Rook</button>
            <button onClick={() => this.changeDiceMode("to-bishop")}>Bishop</button>
            <button onClick={() => this.changeDiceMode("to-knight")}>Knight</button>
            <button onClick={() => this.changeDiceMode("to-pawn")}>Pawn</button> */}
            </div>

        )
    }
}
