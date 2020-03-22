import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GroupedWelcomeCards } from "@fuse";

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
      <div className={classes.layoutRoot}>
        <h1 className={classes.title}> Ensemble pour la tunisie</h1>
        <div>
          Une application qui va renforcer la connexion entre les citoyens et le
          gouvernement{" "}
        </div>
        <GroupedWelcomeCards></GroupedWelcomeCards>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Welcome);
