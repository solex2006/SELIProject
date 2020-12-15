import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';

export default class HealthCard extends Component {
    constructor(){
        super();
        this.state = {
            chartData:{}
        }
    }
    componentWillMount(){
       this.getChartData();
    }
    getChartData(){
        Promise.all([
            fetch('http://localhost:5000/fitdata'),
            fetch('http://localhost:5000/healthgoal')
        ]).then ( files => {
           return Promise.all(files.map(res => res.json()));
        }).then(([stepd, goal]) => {
            const walk = stepd[0].Step;
            const sleep = stepd[1].Sleep;
            const cal = stepd[2].Calories;
            const walkgoal = goal.Walk_g;
            const sleepgoal = goal.Sleep_g;
            const calgoal = goal.Calories_g;      
            this.setState({
                chartData: {
                    labels: ['Steps', 'Sleep', 'Calories'],
                    datasets: [{
                            label:"HealthData",
                            borderColor: "#00FF00",
                            pointBorderColor: "#FFF",
                            pointBackgroundColor: "#f96332",
                            pointBorderWidth: 2,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 1,
                            pointRadius: 4,
                            fill: true,
                            borderWidth: 2,
                            backgroundColor: "transparent",
                            data: [
                                walk, 
                                sleep, 
                                cal
                            ]
                        },{
                            label:"GoalData",
                            borderColor: "#00FFFF",
                            pointBorderColor: "#FFF",
                            pointBackgroundColor: "#fgfgfg",
                            pointBorderWidth: 2,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 1,
                            pointRadius: 4,
                            fill: true,
                            borderWidth: 2,
                            backgroundColor: "transparent",
                            data: [
                                walkgoal, 
                                sleepgoal, 
                                calgoal
                            ]
                        }]
                    }
            
            })
        })      
    }
    render(){ 
        return (
            <div style = {{ position: "flex"}}>
                <Bar
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },

                        tooltips: {
                            backgroundColor: '#f5f5f5',
                            titleFontColor: '#333',
                            bodyFontColor: '#666',
                            bodySpacing: 4,
                            xPadding: 12,
                        },
                        responsive: true,
                    }}
                    data={this.state.chartData}
                />
            </div>
        )
    }
}
