import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GroupedWelcomeCards } from "@fuse";
import "../../scss/welcome_page.scss"
import navbar from "../../store/reducers/fuse/navbar.reducer";
import logo from "../../img/logo.svg"
import facebook from "../../img/social/facebook-icon.svg"
import instagram from "../../img/social/instagram-icon.svg"
import twitter from "../../img/social/twitter-icon.svg"
const styles = theme => ({
  layoutRoot: {
    paddingTop: "5rem",
    textAlign: "center"
  },
  title: {
    paddingBottom: "1.2rem"
  }
});

class Welcome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="welcome-page">
              <div className="main-navbar">
                  <div className="logo-container">
                      <img className="logo" src={logo} alt="logo"/>
                  </div>
                  <div className="social-container">
                      <ul className="social-list">
                          <li>
                              <a href="#">
                                  <img src={facebook} alt="facebook"/>
                              </a>
                          </li>
                          <li>
                              <a href="#">
                              <img src={instagram} alt="instagram"/>
                          </a>
                          </li>
                          <li>
                              <a href="#">
                              <img src={twitter} alt="twitter"/>
                          </a>
                          </li>
                      </ul>
                  </div>
                  {/*<div className="homepage">*/}
                  {/*    <button className="btn">*/}
                  {/*        go back*/}
                  {/*    </button>*/}
                  {/*</div>*/}
          </div>
        <h1 className="welcome-title"> Ensemble pour la Tunisie</h1>
        <div className="welcome-subtitle">
            Une application qui va renforcer la connection entre les citoyens, les docteurs et la gouvernorat <br/>pour combattre le virus Covid-19.
        </div>
         <div className="card-wrapper">
             <GroupedWelcomeCards/>
         </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Welcome);
