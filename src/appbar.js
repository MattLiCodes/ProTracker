import {Component} from 'react';
import {AppBar, Button, Grid, Typography, Paper} from '@material-ui/core';
import './Appbar.css';
import Logo from './WhiteLogo.png';


class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const styles = {
            logo: {
                'margin-top': '7px',
                'margin-bottom': '5px',
                'margin-left': '10px',
                'padding-left': '5px',
                'padding-right': '5px',
                'background-color': '#EF6351'
            },
            appBar: {
                'background-color': '#EF6351',
                'height': '9vh',
            },
            appButtons: {
                'margin-top': '10px',
                'margin-left': '10px',
                'padding-left': '5px',
                'padding-right': '5px',
                'background-color': '#f38375',
                'font-family': "Poppins",
                'font-size': '2vh',
                'color': "#ffffff",
            },
            textBar : {
                'font-size': '25px',
                'font-family': "Poppins"
            }
        }
        return (
            <div className = "appBar">
                <AppBar style = {styles.appBar} position="fixed">
                    <Grid container direction = "row" alignContent = "center" spacing = {1}>
                        <Grid item>
                            <div style = {styles.logo}>
                                <img src={Logo} width="100px"/>
                            </div>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './Analytics'}}
                            >School Stats</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './FloorPlan'}}
                            >School Layout</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style = {styles.appButtons}
                                onClick = {() => {window.location.href = './StudentPage'}}
                            >Your Status</Button>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        )
    }
}

export default Appbar;