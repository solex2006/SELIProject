import React, {Component} from 'react';

export default class StudyNotification extends Component {
    constructor(){
        super();
        this.state = {
            chartData:[]
        }
    }
    componentWillMount(){
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
                chartData: [
                    activities0,
                    progress0,
                    durations0,
                    time0,
                    activities,
                    progress,
                    durations,
                    time
                ]          
            })
        })
    }

 

    render(){ 
        let activity;
        let progress;
        let durations;
        let time;
        if ( this.state.chartData[0] >=  this.state.chartData[4]) {
            activity = <div>Congratulation! You complate your all task</div>
        }else{
            activity = <div>Please go for your incomplate task</div>
        }
        if(this.state.chartData[1] <=  this.state.chartData[5]){
            progress = <div>Congratulation! You progress reache the target</div>
        }else{
            progress = <div>Please keep pace to complate the course</div>
        }
        if(this.state.chartData[2] <=  this.state.chartData[6]){
            durations = <div>Well plan! This can achive your goal</div>
        }else{
            durations = <div>This plan need modification to reach goal</div>
        }
        if(this.state.chartData[3] <=  this.state.chartData[7]){
            time = <div>Congratulation! You are on time</div>
        }else{
            time = <div>Keep pace, complate your work</div>
        }
        return (
            <>
                <div className="card-header">
                   {activity}
                </div>
                <div className="card-header">
                    {progress}
                </div>
                <div className="card-header">
                    {durations}
                </div>
                <div className="card-header">
                    {time}
                </div>
            </>
        )
    }
}

