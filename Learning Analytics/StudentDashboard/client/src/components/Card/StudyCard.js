import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';

export default class StudyCard extends Component {
    constructor(){
        super();     
        this.state = {
            chartData:{}
        };
    }
    componentWillMount(){
        this.getChartData();
    }
    getChartData(){
        fetch('http://localhost:5000/studentData')
        .then( res => res.json())
        .then(goal=> {
            const activities0 = goal.values.task_complate;
            const progress0 = goal.values.progress;
            const durations0 = goal.values.duration;
            const time0 = goal.total_day;
            const activities = goal.doc.activity;
            const progress = goal.doc.progress;
            const durations = goal.doc.duration;
            const time = goal.doc.timeline;
        this.setState({
            chartData: {
                labels: ['Activity', 'Progress', 'Duration', 'Timeliness'],
                datasets: [
                    {
                        label:"Performance",
                        borderColor: "#00FF00",
                        pointBorderColor: "#FFF",
                        pointBackgroundColor: "#f96332",
                         pointHoverRadius: 4,
                        pointHoverBorderWidth: 1,
                        pointRadius: 4,
                        fill: true,
                        borderWidth: 2,
                        backgroundColor: "transparent",
                        data: [activities0, progress0, durations0, time0]
                    },
                    {
                        label:"Goal",
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
                        data: [activities, progress, durations, time]
                    }
                ]
            }
        });
    });
        
    }

    render(){ 
        return (
            <div className="chart" style = {{ position: "flex"}}>
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

