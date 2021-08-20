import React, { Component } from 'react'
import JoinBox from '../home/joinbox/JoinBox'
import { withRouter } from 'react-router-dom' 

class Join extends Component {
    constructor(props) {
        super(props);
        this.gameId = this.props.match.params.gameId
        if(this.gameId === undefined){
            this.gameId = ""
        }
    }
    render() {
        return (
            <div className="join_container">
                <JoinBox gameId={this.gameId}/>
            </div>
        )
    }
}

export default withRouter(Join)