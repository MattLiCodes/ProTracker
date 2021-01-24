import React, {Component} from 'react';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import axios from 'axios';
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
        width: 230
    }
]

class StudentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            covidStatus: "",
            rows: [],
            studentID: null
        }
    }

    reportCovid = () => {
        axios.post('http://localhost:5000/students/updateCovid', {'id': this.state.studentID}).then((res) => {
            console.log(res);
        }).then(() => {
            this.setState({
                covidStatus: "not"
            });
        });
    }

    componentDidMount = () => {
        axios.post('http://localhost:5000/students/getStudents/getOne', {'name': window.location.href.split('/')[window.location.href.split('/').length - 2]}).then((res) => {
            console.log(res.data);
            var count = 0;
            const rows = res.data.classes.map((classPeriod) => {
                count++;
                return {
                    'id': count,
                    'className': classPeriod.className,
                    'classTime': "Period " + count,
                    'COVIDDegree': res.data.DOC
                }
            });
            this.setState({
                name: res.data.firstName,
                classGrid: <DataGrid pageSize={5} rows = {rows} columns = {columns}></DataGrid>,
                covidStatus: res.data.isCovidPositive ? "" : "not",
                studentID: res.data._id
            });
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
                            <Button style = {{backgroundColor: "#EF6351"}} className = "COVIDButton" onClick = {this.reportCovid}>Click if you have COVID!</Button>
                        </Paper>
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default StudentPage;