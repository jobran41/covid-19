import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';

const styles = theme => ({
    layoutRoot: {}
});

class Welcome extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div>Welcome</div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Welcome);