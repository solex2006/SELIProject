import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import User from './User';

class StudyPlan extends Component {
  constructor(props){
    super(props)
    this.state = {
      activity:'',
      progress:'',
      duration:'',
      timeline: '',
    }
  }
  alerts(){
    alert(`You makes a new Study plan`)
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/studyPlan", this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    const { activity, progress, duration, timeline} = this.state
    return (
      <div className="wrapper">
        <div className="content">
          <div className="row">
            <div className="col-12">
              <User onclick={this.props}/>
            </div>
          </div>
          <div className="row">
              <div className="col-12">
                <div className="card-header">
                  <h2 className="card-category" style={{display: 'flex', justifyContent: 'center'}}>Create Study Goal</h2>
                </div>
              </div>
            </div>
          <form onSubmit = {this.submitHandler}>
        
              <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                      <div className="card-header">
                        <h5 className="card-category">Activity/Task You are planing to complate</h5>
                        <TextField
                          id="data"
                          name="activity"
                          placeholder = "number of task going to complate(Ex: 1/2/3...)"
                          type="number"
                          style={{
                            width: 350,
                            marginTop: 30
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={activity}
                          onChange = {this.changeHandler}
                        />
                      </div>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                      <div className="card-header">
                        <h5 className="card-category">Course Progress Plan</h5>
                        <TextField
                          id="data"
                          name="progress"
                          placeholder = "In a number format(Ex: 1/2/3...)"
                          type="number"
                          style={{
                            width: 350,
                            marginTop: 30
                          }}
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={progress}
                          onChange = {this.changeHandler}
                        />
                      </div>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                      <div className="card-header">
                        <h5 className="card-category">Time You are planing to complate Course</h5>
                        <TextField
                            id="data"
                            name="duration"
                            type="number"
                            placeholder="In Number format(Ex: 1/2/3...)"
                            style={{
                              width: 350,
                              marginTop: 30
                            }}
                            InputLabelProps={{
                              shrink: true
                            }}
                            value={duration}
                            onChange = {this.changeHandler}
                          />
                      </div>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="card card-chart">
                      <div className="card-header">
                        <h5 className="card-category">Deadline for task complate</h5>
                          <TextField
                              id="data"
                              name="timeline"
                              type="Number"
                              placeholder="Number of days(Ex: 1/2/3...)"
                              style={{
                                width: 350,
                                marginTop: 30
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={timeline}
                              onChange = {this.changeHandler}
                            />
                      </div>
                    </div>
                </div>
              </div>
              <button type="submit" onClick={this.alerts.bind(this)} className="btn btn-primary" style={{margin: "6px", borderRadius: "60%",display: 'flex', justifyContent: 'center'}}> Submit </button>
          </form>
        </div>
        <footer className="footer">
                <div className="container-fluid">
                  <div className="copyright" style={{float: "right"}}>
                    ©
                    An initiative of Dr Solomon Oyelere. Designed by
                    <a href="" target="_blank"> Md Jahedur Rahman</a>
                  </div>
                </div>
            </footer>
      </div>
    )
 }
}

export default StudyPlan;