import React, {Component} from 'react';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import "./StudentPage.css";
import Appbar from './appbar';
import './Appbar.css';

const columns = [
    {
        field: 'className',
        headerName: 'Class',
        width: 130
    },
    {
        field: 'classTime',
        headerName: 'Period',
        width: 130
    },
    {
        field: 'COVIDDegree',
        headerName: 'Degrees of COVID',
        width: 130
    }
]

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            covidStatus: "",
            rows: []
        }
    }

    reportCovid = () => {
        this.setState({
            covidStatus: "do"
        })
    }

    componentDidMount = () => {
        const rows = [{
            'id': 0,
            'className': "Math",
            'classTime': "2nd Period",
            'COVIDDegree': "3rd Degree Seperation"
        }];

        this.setState({
            studentSpecs: {
                'name': "Jeff",
                'covidStatus': false
            },
            classGrid: <DataGrid pageSize={5} rows = {rows} columns = {columns}></DataGrid>
        });
    }

    render() {
        return (
            <div className = "background">
                <Appbar className = "appBar"/>
                
                <Grid className = "mainGridContainer" container direction = "column" alignItems = "center" spacing = {3} justify = "center">
                    <Grid item>
                        <Paper className = "namePaper">
                            <Typography className = "name">Welcome {this.state.name} to your COVID reporting page!</Typography>
                            {this.state.classGrid}
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className = "COVIDStatusPaper">
                            <Typography className = "statusDisplay">Your COVID status: You do {this.state.covidStatus} have COVID!</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className = "COVIDUpdatePaper">
                            <Typography className = "updateStatus">Report your COVID status</Typography>
                            <Button style = {{backgroundColor: "#EF6351"}} className = "COVIDButton">Click if you have COVID!</Button>
                        </Paper>
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default StudentPage;