import React, {Component} from 'react';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import "./StudentPage.css";

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentSpecs: {
                'name': "Jeff",
                'userSpecifics': "He is a person",
                'covidStatus': false
            }
        }
    }

    componentDidMount = () => {
        this.setState({
            studentSpecs: {
                'name': "Jeff",
                'userSpecifics': "He is a person",
                'covidStatus': false
            }
        });
    }

    render() {
        return (
            <div className = "background">
                <Grid className = "mainGridContainer" container direction = "column" alignItems = "center" spacing = {3} justify = "center">
                    <Grid item>
                        <Paper className = "namePaper">
                            <Typography className = "name">Welcome {this.state.studentSpecs['name']} to your COVID reporting page!</Typography>
                            <Typography className = "studentData">{this.state.studentSpecs['userSpecifics']}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className = "COVIDStatusPaper">
                            <Typography className = "statusDisplay">Your COVID status</Typography>
                            <Typography className = "studentStatus">You do {this.state.studentSpecs['covidStatus'] ? "" : "not"} have COVID!</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className = "COVIDUpdatePaper">
                            <Typography className = "updateStatus">Report your COVID status</Typography>
                            <Button className = "COVIDButton">Click if you have COVID!</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default StudentPage;