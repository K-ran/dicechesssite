import React, { Component } from 'react';
import './Footer.css' ;
// import { faLinkedinIn, faGithubSquare} from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends Component {
    render() {
        return (
            <footer id = "footer" className="footer">
                {/* <div className="contact_me">Contact Me</div>
                <div className="social_links">
                    <a className = "fa_link_footer" rel="noopener noreferrer" target="_blank" href="https://github.com/K-ran" ><FontAwesomeIcon  size='2x' icon={faGithubSquare} /></a>
                    <a className = "fa_link_footer" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/k-ran/" ><FontAwesomeIcon  size='2x' icon={faLinkedinIn} /></a>
                </div> */}
                <p className="copyright">copyright &#169; 2021 dicechessdice.com</p>
            </footer>
        );
    }
}

export default Footer;