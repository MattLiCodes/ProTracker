import React, { Component } from 'react';
import Chart from 'chart.js';
import './Analytics.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Appbar from './appbar';
import './Appbar.css';

export default class Analytic extends Component {
    chartRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            totalCases: 0,
            startDate: new Date(),
            endDate: new Date(),
            chart: null
        };
    }

    getCovidCases = () => {
        let cases = [];

        for (var i = 1; i < 60; i++) {
            let dailyCaseNumber = Math.sin(i/2) * 0.5 + 3;
            for (var j = 0; j < dailyCaseNumber; j++) {
                cases.push(new Date(2021, 0, i, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0));
            }
        }

        return cases;
    }

    componentDidMount = () => {
        const ctx = this.chartRef.current.getContext('2d');

        let cases = this.getCovidCases();

        let data = [];
        cases[0].setHours(0,0,0,0);
        let currentDate = cases[0];
        let counter = 1;

        for (var i = 1; i < cases.length; i++) {
            cases[i].setHours(0,0,0,0);
            if (currentDate.getTime() !== cases[i].getTime()) {
                data.push({x: currentDate, y: counter})
                currentDate = cases[i];
                counter = 0;
            }
            else {
                counter++;
            }
        }

        let chart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    label: "COVID Cases",
                    data: data,
                    borderColor: "rgba(225, 30, 0, 1.0)",
                    backgroundColor: "rgba(225, 30, 0, 0.3)"
                }]
            },
            options: {
                //Customize chart options
                elements: {
                    line: {
                        tension: 0.5
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        time: {
                            tooltipFormat: 'll',
                            unit: 'day'
                        },
                        ticks: {
                            min: cases[0],
                            max: cases[cases.length - 1]
                        }
                    }]
                }
            }
        });

        this.setState({
            totalCases: cases.length,
            startDate: cases[0],
            endDate: cases[cases.length-1],
            chart: chart
        });
    }

    changeStartDate = (date) => {
        if (Date.parse(this.state.endDate) - Date.parse(date) >= 0) {
            this.setState({startDate: date});
            let chart = this.state.chart;
            chart.options.scales.xAxes[0].ticks.min = date;
            chart.update();
        }
        else {
            alert("Start date cannot be later than end date!");
        }
    }

    changeEndDate = (date) => {
        if (Date.parse(date) - Date.parse(this.state.startDate) >= 0) {
            this.setState({endDate: date});
            let chart = this.state.chart;
            chart.options.scales.xAxes[0].ticks.max = date;
            chart.update();
        }
        else {
            alert("Start date cannot be later than end date!");
        }
    }

    render() {
        return (
            <div className="mainContent">
                <Appbar className = "appBar"/>
                <br></br>
                <h1>COVID Case Report By Day</h1>
                <canvas
                    ref={this.chartRef}
                />
                <h3>Total cases: {this.state.totalCases}</h3>

                <p>Start date: <DatePicker selected={this.state.startDate} onChange={this.changeStartDate} /></p>
                <p>End date: <DatePicker selected={this.state.endDate} onChange={this.changeEndDate} /></p>
            </div>
        )
    }
}