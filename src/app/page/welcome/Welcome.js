import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import history from "@history";
import { GroupedWelcomeCards } from "@fuse";
import Grid from "@material-ui/core/Grid";
import { WelcomeCard, PatientFormModal, InformModal } from "@fuse";
import { connect } from "react-redux";
import { ModalAction } from "app/store/actions/fuse";
import { makeStyles } from "@material-ui/core/styles";

import "../../scss/welcome_page.scss";
import navbar from "../../store/reducers/fuse/navbar.reducer";
import logo from "../../img/logo.svg";
import facebook from "../../img/social/facebook-icon.svg";
import instagram from "../../img/social/instagram-icon.svg";
import twitter from "../../img/social/twitter-icon.svg";
const styles = theme => ({
  layoutRoot: {
    paddingTop: "5rem",
    textAlign: "center"
  },
  title: {
    paddingBottom: "1.2rem"
  }
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: "5rem"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));
const Welcome = props => {
  const [question, setquestion] = useState([]);
  const [lengthFormStatic, setlengthFormStatic] = useState(0)
  const [lengthFormDynamic, setlengthFormDynamic] = useState(0)
  const [responses, setReponse] = useState({
    firstName: "string",
    lastName: "string",
    address: "string",
    zipCode: 0,
    phoneNumber: 0,
    responses: []
  });
  const classes = useStyles();
  const cardProps = [
    {
      disabled: false,
      title: "Médecin",
      className: "medecin",
      text: "rnfrsgnvmol fgfgb dfgdrg sdgsrgr srgrgr dfv,fd",
      redirect: "/login",
      buttonContent: "choisissez Médecin",
      src: "assets/images/welcome/doctor.png",
      handleClick: () => {
        history.push({
          pathname: "/login"
        });
      }
    },
    {
      disabled: false,
      title: "Malade",
      className: "malade",
      text:
        "jrhglkdfms;fkgnjdiozpfk rtgrdtfgr dfgrtgrd rsgrdgtrg rtgrtgrtg jediofjenk",
      redirect: "/malade",
      buttonContent: "choisissez Malade",
      src: "assets/images/welcome/sick.png",
      handleClick: () => {
        props.ModalAction("PatientForm");
      }
    },
    {
      disabled: false,
      title: "Informer",
      className: "informer",
      text: "jkfldfbngjeopdfjr rtgdgrdg retgtrgrtd gtrdgrtd eofrleofrgjnl",
      redirect: "/informer",
      buttonContent: "choisissez d'informer",
      src: "assets/images/welcome/inform.png",
      handleClick: () => {
        props.ModalAction("Inform");
      }
    }
  ];
  useEffect(() => {
    axios
      .get("http://api.ensembletn.beecoop.co/api/v1/question")
      .then(res => {
        if (res && res.data && res.data.payload && res.data.payload.questions) {
          let cleanData = [];
          let currentSome=0
          for (let key in res.data.payload.questions) {
            currentSome=currentSome+res.data.payload.questions[key].length
            cleanData.push({
              section: key,
              key: key,
              questions: res.data.payload.questions[key]
            });
          }
/*           const someOfArray=cleanData.reduce((curr,prev)=>{
            console.log('curr', JSON.stringify(curr))
            return curr.length+prev
          },0) */
console.log('currentSome', currentSome)
          setquestion(cleanData);
          setlengthFormStatic(currentSome)
        } else {
          setquestion([]);
        }
      })
      .catch(err => setquestion(err));
  }, []);

  const updateResponse = data => {
    console.log('lengthFormStatic', lengthFormStatic)
    const newResponse = responses;
    const findIt = newResponse[data.field].findIndex(
      d => d.question === data.extraData.id
    );
    if (findIt !== -1) {
      newResponse[data.field].splice(findIt, 1, {
        value: data.value,
        question: data.extraData.id
      });
    }else{
      newResponse[data.field].push({
        value: data.value,
        question: data.extraData.id
      });
      setlengthFormDynamic(lengthFormDynamic+1)
    }
    console.log("newResponse", newResponse);
    setReponse(newResponse);
  };
  const submitForm = data => {
    console.log("data submitForm", data);
    const newData={...responses,...data}
    console.log('newData', newData)
    axios.post('http://api.ensembletn.beecoop.co/api/v1/patient',{...newData})
    .then(res=>history.push("/envoiyer/maladie"))
  };
  return (
    <div className="welcome-page">
      <div className="main-navbar">
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="social-container">
          <ul className="social-list">
            <li>
              <a href="#">
                <img src={facebook} alt="facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={instagram} alt="instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={twitter} alt="twitter" />
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
        Une application qui va renforcer la connection entre les citoyens, les
        docteurs et la gouvernorat <br />
        pour combattre le virus Covid-19.
      </div>
      {/*  <GroupedWelcomeCards/> */}
      <div className="card-wrapper">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing="9">
              {cardProps.map(item => (
                <Grid key={item} item>
                  <WelcomeCard
                    text={item.text}
                    title={item.title}
                    handleClick={item.handleClick}
                    buttonContent={item.buttonContent}
                    src={item.src}
                    disabled={item.disabled}
                  ></WelcomeCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {lengthFormStatic!==0 &&<PatientFormModal
          updateResponse={updateResponse}
          dataModal={question ? question : []}
          modalAction={props.ModalAction}
          submitFormCallback={submitForm}
          staticCount={lengthFormStatic}
          dynamicCount={lengthFormDynamic}
        />}
        <InformModal modalAction={props.ModalAction} />
      </div>
    </div>
  );
};

/* export default withStyles(styles, { withTheme: true })(Welcome); */

export default connect(null, { ModalAction })(Welcome);
