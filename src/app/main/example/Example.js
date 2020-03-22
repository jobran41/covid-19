import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FusePageSimple, DemoContent } from "@fuse";

import QuestionEducation from "./QuestionEducation";
import Form from "../example/form"

const styles = theme => ({
  layoutRoot: {}
});

class Example extends Component {
  state = {
    form: []
  };

  getAllState = data => {
    const newForm = this.state.form;
    newForm.push(data);
    this.setState({ form: newForm });
  };
  render() {
    const { classes } = this.props;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot
        }}
        header={
          <div className="p-24">
            <h4>Header</h4>
          </div>
        }
        contentToolbar={
          <div className="px-24">
            <h4>Content Toolbar</h4>
          </div>
        }
        content={
          <div className="p-24">
            <QuestionEducation
              getState={this.getAllState}
              title="Lorem ipsume"
              description="bla bla bla"
              withTextField
              textField={"Quel est votre age"}
            />
            <Form />
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(Example);
