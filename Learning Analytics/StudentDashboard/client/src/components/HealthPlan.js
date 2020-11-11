import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

   
class HealthPlan extends Component {
  constructor(props){
    super(props)

    this.state = {
      walk: '',
      sleep: '',
      calories: ''
    };
  }
  alerts(){
    alert(`You makes a new Health plan`)
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/healthPlan', this.state)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    const { walk, sleep, calories } = this.state
    return (
      <div className="wrapper">
        <div className="content">
          <div className="row">
            <div className="col-12">   
              <div className="card-header">
                <h2 className="card-category" style={{display: 'flex', justifyContent: 'center'}}>Create Health Goal</h2>
              </div>     
            </div>
          </div>
          <form onSubmit = {this.submitHandler}> 
            <div className="row">
              <div className="col-12">
                  <div className="card card-chart">
                    <div className="card-header">
                      <h5 className="card-category">How Much steps You are going to walk</h5>
                            <TextField
                                id="data"
                                name="walk"
                                type="number"
                                placeholder='in a Number(Ex: 1/2/3...)'
                                style={{
                                  width: 350,
                                  marginTop: 30,
                                }}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                value={walk}
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
                      <h5 className="card-category">Sleep plan in hours</h5>
                            <TextField
                                id="data"
                                name="sleep"
                                type="number"
                                placeholder='Number of Hours(Ex: 1/2/3...)'
                                style={{
                                  width: 350,
                                  marginTop: 30,
                                }}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                value= {sleep}
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
                    <h5 className="card-category">Calories burn Today</h5>
                          <TextField
                              id="data"
                              name="calories"
                              type="number"
                              placeholder='in a Number(Ex: 1/2/3...)'
                              style={{
                                  width: 350,
                                  marginTop: 30,
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                              value= {calories}
                              onChange = {this.changeHandler}
                          />  
                  </div>
                </div>
            </div>
          </div>
            <button type="submit" onClick={this.alerts.bind(this)} className="btn btn-primary" style={{display: 'flex', justifyContent: 'center', margin: "6px", borderRadius: "60%"}}> Submit </button>
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

export default HealthPlan