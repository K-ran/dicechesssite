import React, { Component } from 'react'
import './CreateBox.css'
import {CONSTANTS, DICE_RESPONSE} from '../../../../Constants'
import Recaptcha from 'react-recaptcha';
import { withRouter } from 'react-router-dom' 

class CreateBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerNameError: [""],
            playerNameValid: false,
            captchaValid: false,
            buttonDisabled: true,
            gameName:"game", //TODO: See this is required in future. or just remove it 
            playerName:"",
            diceNum:"3",
            captchaToken:""
        }
      }



    getErrorDivs = (arrayOfErros) => {
        let errorDivs = [];
        for (let index = 0; index < arrayOfErros.length; index++) {
            const element = arrayOfErros[index];
            errorDivs.push(<div key={index} className="dice_input_error" >{element}</div>)
        }
        return errorDivs
    }


    joinHandler = ()=>{
        //send request to create api
        fetch(CONSTANTS.rest_url+'/create/'+this.state.playerName+'/'+this.state.gameName+'/'+this.state.diceNum,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
              },
              body: JSON.stringify({captchaToken:this.state.captchaToken})
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.type === DICE_RESPONSE.RESPONSE_CREATE){
                let gameId = data.gameId;
                let playerName = data.playerName;
                let playerId = data.playerId;
                this.props.history.push('/waiting/'+gameId+"/"+playerName+"/"+playerId)
            }
            else{
                //display error
                console.log("TODO: display error");
            }
        });

    }

    captchaHandler = (data) => {
        if (data.length === 0){
            this.setState({captchaValid:false}, this.buttonEnableCheck)
        }else{
            this.setState({captchaValid:true}, this.buttonEnableCheck)
            this.setState({captchaToken:data})
        }
    }

    buttonEnableCheck = () => {
        if (this.state.playerNameValid && 
            this.state.captchaValid)
        {
            this.setState({buttonDisabled:false})
        }
        else{
            this.setState({buttonDisabled:true})
        }
    }

    isAlpha = (input) =>{
        var letters = /^[A-Za-z]+$/;
        if(input.match(letters)){
            return true;
        }
        else{
            return false;
        }
    }

    isAlphaNum = (input) =>{
        var letters = /^[A-Za-z0-9]+$/;
        if(input.match(letters)){
            return true;
        }
        else{
            return false;
        }
    }

    verifyPlayerName = (name) =>{
        let errors = []
        if (name === ""){
            errors.push("* Cannot be empty")
        }
        else{
            if(!this.isAlpha(name)){
                errors.push("* Only alphabets allowed")
            }
    
            if(name.length > 128){
                errors.push("* Length should be less than 128 characters")
            }
        }

        let valid = false;
        if(errors.length === 0){
            valid=true;
            this.setState({playerName:name})
        }
        this.setState({playerNameError:errors,
                      playerNameValid:valid}, this.buttonEnableCheck)
    }

    OnDiceChange = (event) =>{
        this.setState({diceNum:event.target.value})
    }

    onPlayerNameChange = (event)=>{
        let name = event.target.value
        this.verifyPlayerName(name)
    }

    render() {
        return (
            <div className="create_box box">
                <div className="create_title">
                    Create Session
                </div>
                <form className="dice_input_form">
                    <div className="dice_input_wrapper">
                        <input type="text" name="playerName" placeholder="Your Name" onChange={this.onPlayerNameChange} className="dice_input" />
                        {this.getErrorDivs(this.state.playerNameError)}
                    </div>
                    
                    <select defaultValue="3" name="diceNum" className="dice_input_selection" onChange={this.OnDiceChange}>
                        <option value="1">Number of dice: 1</option>
                        <option value="2">Number of dice: 2</option>
                        <option value="3">Number of dice: 3</option>
                    </select>
                    <Recaptcha size="compact" className="my_recaptcha" sitekey="6Lf5rtIbAAAAAKGITP79Oh5aC8pA5zM35cKTXWQd" verifyCallback={this.captchaHandler}/>
                    <input disabled={this.state.buttonDisabled} type="button" value="Create" className="dice_input_button" onClick={this.joinHandler}/>

                </form>
            </div>
        )
    }
}

export default withRouter(CreateBox);