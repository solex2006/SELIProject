import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';

export default class WeeklyCard extends Component {
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
            fetch('http://localhost:5000/studentData'),
            fetch('http://localhost:5000/fitdata'),
        ]).then ( files => {
           return Promise.all(files.map(res => res.json()));
        }).then(([stepd, goal]) => {
            console.log(stepd.values.task_incomplate)
            const Task_complate = stepd.values.task_complate;
            const Task_incomplate = stepd.values.task_incomplate;
            const Progress = stepd.values.progress;
            const walk = goal[0].Step;
            const sleep = goal[1].Sleep;
            const cal = goal[2].Calories;   
            this.setState({
                chartData: {
                    labels: ['Task_complate', 'Task_incomplate', 'Course Progress','Walk', 'Calories', 'Sleep'],
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
                                Task_complate,
                                Task_incomplate,
                                Progress,
                                walk,
                                cal, 
                                sleep    
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
