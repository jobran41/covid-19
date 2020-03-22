import React, { Component } from "react";
//import { GroupedWelcomeCards } from "@fuse";
import { makeStyles } from "@material-ui/core/styles";
import history from "@history";
import Grid from "@material-ui/core/Grid";
import { WelcomeCard, PatientFormModal, InformModal } from "@fuse";
import { connect } from "react-redux";
import { ModalAction } from "app/store/actions/fuse";

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
const Welcome=(props)=> {
  const classes = useStyles();
  const cardProps = [
    {
      title: "Médecin",
      className:"medecin",
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
      title: "Malade",
      className:"malade",
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
      title: "Informer",
      className:"informer",
      text: "jkfldfbngjeopdfjr rtgdgrdg retgtrgrtd gtrdgrtd eofrleofrgjnl",
      redirect: "/informer",
      buttonContent: "choisissez d'informer",
      src: "assets/images/welcome/inform.png",
      handleClick: () => {
        props.ModalAction("Inform");
      }
    }
  ];

    return (
      <div className={classes.layoutRoot}>
        <h1 className={classes.title}> Ensemble pour la tunisie</h1>
        <div>
          Une application qui va renforcer la connexion entre les citoyens et le
          gouvernement{" "}
        </div>
        {/*  <GroupedWelcomeCards/> */}
        <>
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
      <PatientFormModal  modalAction={props.ModalAction} />
      <InformModal modalAction={props.ModalAction} />
    </>
      </div>
    );
}

/* export default withStyles(styles, { withTheme: true })(Welcome); */

export default connect(null, { ModalAction })(Welcome);
