import {Component} from 'react';
import {AppBar, Button, Grid, Typography, Paper} from '@material-ui/core';
import './Appbar.css';

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const styles = {
            appBar: {
                'background-color': '#EF6351',
                'height': '6vh'
            },
            appButtons: {
                'margin-top': '5px',
                'margin-left': '10px',
                'padding-left': '5px',
                'padding-right': '5px',
                'background-color': '#f38375',
                'font-family': "Poppins"
            },
            textBar : {
                'font-size': '25px',
                'font-family': "Poppins"
            }
        }
        return (
            <div className = "appBar">
                <AppBar style = {styles.appBar}>
                    <Grid container direction = "row" alignContent = "center" spacing = {1}>
                        <Grid item>
                            <Paper style = {styles.appButtons}>
                                <Typography style = {styles.textBar}>ProTracker - Contact Tracing</Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './Analytics'}}
                            >View COVID Stats</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './FloorPlan'}}
                            >View your school's COVID layout</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './StudentPage'}}
                            >View your own personal page</Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        )
    }
}

export default Appbar;