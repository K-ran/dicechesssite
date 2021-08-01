import React, { Component } from 'react';
import './Navbar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faChevronUp } from '@fortawesome/free-solid-svg-icons'
class Navbar extends Component {

    constructor()
    {
        super();
        this.state = 
        {
            barextended:false
        }
    }

    bar_toggle = () => {
        this.setState(
            {
                barextended: !this.state.barextended
            }
        )
    }

    updateDimensions = () => {
        if(window.innerWidth >= 850)
        {
            this.setState(
                {
                    barextended: true
                }
            )
        }
        else
        {
            this.setState(
                {
                    barextended: false
                }
            )
        }
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions(); // resize once atleast
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-title">
                    <div className="navbar-title-text">DICE CHESS DICE</div>
                    {/* <FontAwesomeIcon onClick={this.bar_toggle} className="navbar-title-icon" icon={this.state.barextended?faChevronUp:faBars} /> */}
                </div>
               
                <ul className="navbar-menuItemList" style={{display: this.state.barextended?"flex":"none"}}>
                    {/* <li className="navbar-menuItem" ><a href="/aboutme">About</a></li> */}
                </ul>
            </div>
        );
    }
}

export default Navbar;