import React, { Component } from 'react'
import './CreateBox.css'
import Recaptcha from 'react-recaptcha';

export default class CreateBox extends Component {

    constructor(props) {
        super(props);
        this.gameNameError = [];
        this.playerNameError = [];

        // console.log();
      }

    getErrorDivs = (arrayOfErros) => {
        console.log(arrayOfErros);
        let errorDivs = [];
        for (let index = 0; index < arrayOfErros.length; index++) {
            const element = arrayOfErros[index];
            errorDivs.push(<div key={index} className="dice_input_error" >{element}</div>)
        }
        return errorDivs
    }

    joinHandler = ()=>{
        console.log("Join called");
    }

    captchaHandler = (data) => {
        console.log(data);
    }

    render() {
        return (
            <div className="create_box box">
                <div className="create_title">
                    Create Session
                </div>
                <form className="dice_input_form">
                    <div className="dice_input_wrapper">
                        <input type="text" name="gameName" placeholder="Name of the Game" className="dice_input" />
                        {this.getErrorDivs(this.gameNameError)}
                    </div>
                    <div className="dice_input_wrapper">
                        <input type="text" name="playerName" placeholder="Your Name" className="dice_input" />
                        {this.getErrorDivs(this.playerNameError)}
                    </div>
                    
                    <select defaultValue="3" name="diceNum" className="dice_input_selection" >
                        <option value="1">Number of dice: 1</option>
                        <option value="2">Number of dice: 2</option>
                        <option value="3">Number of dice: 3</option>
                    </select>
                    <Recaptcha size="compact" className="my_recaptcha" sitekey="6Lf5rtIbAAAAAKGITP79Oh5aC8pA5zM35cKTXWQd" verifyCallback={this.captchaHandler}/>
                    <input type="button" value="Join" className="dice_input_button" onClick={this.joinHandler}/>

                </form>
            </div>
        )
    }
}
