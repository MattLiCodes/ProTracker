import {Component} from 'react';
import {AppBar, Button, Grid} from '@material-ui/core';
import './Appbar.css';

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <AppBar className = "appBar">
                    <Grid container>
                        <Grid item>
                            <Button>View COVID Stats</Button>
                        </Grid>
                        <Grid item>
                            <Button>View your school's COVID layout</Button>
                        </Grid>
                        <Grid item>
                            <Button>View your own personal page</Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        )
    }
}

export default Appbar;