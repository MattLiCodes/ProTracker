import React from 'react';
import ImageMapper from 'react-image-mapper';
import {Paper, Grid} from '@material-ui/core';
import floorplan from './FP2.png';
import './floorplan.css';
import axios from 'axios';
import Appbar from './appbar.js';
import {DataGrid} from '@material-ui/data-grid';

var periods = 5;
var periodMap = []; periodMap.length = 1000;

const columns = [ 
    {
        field: 'period',
        headerName: 'Class Period',
        width: '37vh'
    },
    {
        field: 'cases',
        headerName: 'Number of Cases',
        width: '37vh'
    }
]

export default class FloorPlan extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            plan : "./school1floorplan.png",
            MAP : {
                name: "my-map",
                areas: [
                    { name: "0", shape: "rect", coords: [252,272,303,315], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "1", shape: "rect", coords: [289,321,329,370],  preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "2", shape: "rect", coords: [331,319,371,371], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "3", shape: "rect", coords: [374,319,413,371], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "4", shape: "rect", coords: [373,264,414,316], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "5", shape: "rect", coords: [444,238,484,285], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "6", shape: "poly", coords: [487,233,499,233,499,248,538,248,538,285,487,285], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "7", shape: "poly", coords: [503,230,550,230,556,208,557,191,538,191,508,191,508,204,503,203], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "8", shape: "poly", coords: [503,149,503,175, 508, 175,508, 189, 557, 189, 557, 174, 550, 149, 503, 149], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "9", shape: "poly", coords: [487, 147, 498, 147, 498, 132, 538, 133, 538, 96, 487, 96], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "10", shape: "rect", coords: [444, 96, 484, 142], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "11", shape: "rect", coords: [414, 116, 373, 62], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "12", shape: "rect", coords: [373, 60, 413, 9], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "13", shape: "rect", coords: [331, 9, 371, 58], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "14", shape: "rect", coords: [289, 9, 329,62], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                    { name: "15", shape: "rect", coords: [253, 66, 301,107], preFillColor:"rgba(243, 131, 117, 0.3)", fillColor:"rgba(243, 131, 117, 0.5)"},
                ]
            },
            classroomGrid: null,
            classData: null
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/classes/").then((response) => {
            const data = response.data;
            console.log(data);
            var classData = []; classData.length = 100;
            var classroomItem;
            data.forEach((element) => {
                if(classData[element.classroomId] !== undefined && classData[element.classroomId] !== null) {
                    classroomItem = classData[element.classroomId];
                    classroomItem.push({'period': element.period, 'cases': element.students.map(((student) => { return student.isCovidPositive ? 1 : 0})).reduce((a , b) => {return a + b}, 0)});
                } else {
                    classData[element.classroomId] = [];
                    classroomItem = classData[element.classroomId];
                    classroomItem.push({'period': element.period, 'cases': element.students.map(((student) => { return student.isCovidPositive ? 1 : 0})).reduce((a , b) => {return a + b}, 0)});
                }
            });
            this.setState({
                classData: classData
            });
        });
    }
    //Display an image with several "class room" object on it;
    render() {
        return (
            <div className="centered">
                <Appbar></Appbar>
                <Grid container>
                    <Grid item>
                        <Paper className = "outerPaper">
                            <Paper className = "innerPaper">
                                <ImageMapper className="centered" src={floorplan} map={this.state.MAP} width={577} height={381}
                                    //onLoad={() => this.load()}
                                    onMouseEnter={(area) => this.enterArea(area)}
                                    onMouseLeave={(area) => this.leaveArea(area)}
                                />
                                {
                                    this.state.hoveredArea &&
                                    <span className="tooltip"
                                        style={{ ...this.getTipPosition(this.state.hoveredArea)}}>
                                        { this.state.hoveredArea && this.state.hoveredArea.name}
                                    </span>
                                }
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className = "dataGridPaper">
                            {this.state.classroomGrid}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )

    }

    enterArea = (area) => {
        if(periodMap[area.name] !== undefined && periodMap[area.name] !== null) {
            console.log(this.state.classData);
            var rows = this.state.classData[periodMap[area.name]];
            var newRows = [];
            rows.forEach((row) => {
                newRows.push({
                    'id': row.period,
                    'period': row.period,
                    'cases': row.cases
                });
            });
            newRows.sort((a, b) => a.period - b.period);
            console.log(newRows);
            this.setState({
                classroomGrid: <DataGrid pageSize={8} rows = {newRows} columns = {columns}></DataGrid>
            });
        } else if (periods > 0) {
            periodMap[area.name] = periods;
            periods--;
        }
        //Display a status window
        // var areas = this.state.MAP.areas;
        // for (var i = 0; i < areas.length; i++) {
        //     if (areas[i]["name"] === area["name"]) {
        //         areas[i][]
        //     }
        // }
    }

    leaveArea = ({ area }) => {
        //Have the window displayed disappear 
    }

}