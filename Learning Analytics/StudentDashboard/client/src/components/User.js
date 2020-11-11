import React, {Component} from 'react';

export default class CourseName extends Component {
    constructor(props){
        super(props);
        this.state = {
            activity:[],
            items: {}
        };
    }

    componentWillMount(){
        this.getActivity();
    }
    getActivity(){  
        fetch('http://localhost:5000/activity')
        .then( res => res.json())
        .then ( value => {
            this.setState({
                activity: value,
                items:{}
            }); 
        });
    }
    chartChenger(item){
        alert(`Course ${item.title} Selected`)
        window.location.reload()
        this.setState({
            items: item
        });
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(item)
        };
        fetch("http://localhost:5000/courseName", options)
        .then(response => {
        console.log(response);
        })
        .catch(error => {
        console.log(error);
        });
    }
    render(){ 
        const data = this.state.activity;
        return(
            <div className="card-header">
                <span>Select Course</span>
                {data.map((item, index) => 
                    <button onClick={this.chartChenger.bind(this,item)}>{item.title}</button>
                )}
            </div>
        )  
    }
    
}
