import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import history from "@history";
import { GroupedWelcomeCards } from "@fuse";
import Grid from "@material-ui/core/Grid";
import { WelcomeCard, PatientFormModal, InformModal } from "@fuse";
import { connect } from "react-redux";
import { ModalAction, addInformer } from "app/store/actions";
import { makeStyles } from "@material-ui/core/styles";

import "../../scss/welcome_page.scss";
import navbar from "../../store/reducers/fuse/navbar.reducer";
// import logo from "../../img/logo.svg";
import logo from "../../img/logo.png";
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
  const classes = useStyles();
  const cardProps = [
    {
      title: "Médecin",
      className: "medecin",
      text:
        "Vous êtes un medecin déjà inscrit sur la plateforme? Connectez-vous et aidez-nous à traiter les dossiers.",
      redirect: "/login",
      buttonContent: "Connectez-vous",
      src: "assets/images/welcome/doctor.png",
      handleClick: () => {
        history.push({
          pathname: "/login"
        });
      }
    },
    {
      title: "Malade",
      className: "malade",
      text:
        "Vous ressentez les symptômes du COVID-19 mais vous n'arrivez pas à évaluer votre cas? Remplissez ce formulaire et notre équipe pourra traiter votre dossier dans les plus brefs délais.",
      redirect: "/malade",
      buttonContent: "Contactez un médecin",
      src: "assets/images/welcome/sick.png",
      handleClick: () => {
        props.ModalAction("PatientForm");
      }
    },
    {
      title: "Informer",
      className: "informer",
      text:
        "Vous connaissez quelqu'un qui ne respecte pas les règles du confinement? Vous connaissez quelqu'un qui met en danger des citoyens tunisiens? Protégez-vous et protégez votre entourage en remplissant ce formulaire de dénonciation.",
      redirect: "/informer",
      buttonContent: "choisissez d'informer",
      src: "assets/images/welcome/inform.png",
      handleClick: () => {
        props.ModalAction("Inform");
      }
    }
  ];

  const submitInformer = values => {
    console.log("values", values);
    // props.addInformer(values);
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
                  ></WelcomeCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <PatientFormModal modalAction={props.ModalAction} />
        <InformModal
          modalAction={props.ModalAction}
          submitForm={submitInformer}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ informer }) => ({ informer });

/* export default withStyles(styles, { withTheme: true })(Welcome); */

export default connect(mapStateToProps, { ModalAction, addInformer })(Welcome);
