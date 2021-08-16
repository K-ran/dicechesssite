import React, { Component } from 'react'
import './JoinBox.css'
// import Recaptcha from 'react-recaptcha';
import { withRouter } from 'react-router-dom' 
import {CONSTANTS, DICE_RESPONSE} from '../../../../Constants'

class JoinBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIdError: [""],
            playerNameError: [""],
            gameIdValid: false,
            playerNameValid: false,
            captchaValid: false,
            buttonDisabled: true,
            gameId:"",
            playerName:"",
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
        fetch(CONSTANTS.rest_url+'/join/'+this.state.gameId+'/'+this.state.playerName,
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
            console.log(data);
            if (data.type === DICE_RESPONSE.RESPONSE_JOIN){
                let gameId = data.gameId;
                let playerName = data.playerName;
                let playerId = data.playerId;
                this.props.history.push('/game/'+gameId+"/"+playerName+"/"+playerId)
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
        if (this.state.gameIdValid && 
            this.state.playerNameValid)
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

    isBase64 = (input) =>{
        var letters = /^[A-Za-z0-9-_]+$/;
        if(input.match(letters)){
            return true;
        }
        else{
            return false;
        }
    }

    verifyGameId = (name) =>{
        let errors = []
        if (name === ""){
            errors.push("* Cannot be empty")
        } else{
            if(!this.isBase64(name)){
                errors.push("* Invalid game id")
            }
    
            if(name.length > 8){
                errors.push("* Length should be less or equal to 8 characters")
            }
        }

        let valid = false;
        if(errors.length === 0){
            valid=true;
            this.setState({gameId:name})
        }
        this.setState({gameIdError:errors,
                       gameIdValid:valid}, this.buttonEnableCheck)
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

    onGameIdChange = (event)=>{
        let name = event.target.value
        this.verifyGameId(name)
    }

    onPlayerNameChange = (event)=>{
        let name = event.target.value
        this.verifyPlayerName(name)
    }
    render() {
        return (
            <div className="create_box box">
                <div className="create_title">
                    Join Session
                </div>
                <form className="dice_input_form">
                    {/* <div className="dice_input_wrapper">
                        <input type="text" name="gameName" placeholder="Name of the Game" onChange= {this.onGameNameChange}className="dice_input" />
                        {this.getErrorDivs(this.state.gameNameError)}
                    </div> */}
                    <div className="dice_input_wrapper">
                        <input type="text" name="playerName" placeholder="Your Name" onChange={this.onPlayerNameChange} className="dice_input" />
                        {this.getErrorDivs(this.state.playerNameError)}
                    </div>
                    <div className="dice_input_wrapper">
                        <input type="text" name="gameId" placeholder="Game id" onChange={this.onGameIdChange} className="dice_input" />
                        {this.getErrorDivs(this.state.gameIdError)}
                    </div>
                    {/* <Recaptcha size="compact" className="my_recaptcha" sitekey="6Lf5rtIbAAAAAKGITP79Oh5aC8pA5zM35cKTXWQd" verifyCallback={this.captchaHandler}/> */}
                    <input disabled={this.state.buttonDisabled} type="button" value="Join" className="dice_input_button" onClick={this.joinHandler}/>

                </form>
            </div>
        )
    }
}

export default withRouter(JoinBox);