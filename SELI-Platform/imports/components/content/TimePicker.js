import React, { Component } from 'react';
import TimePicker from 'react-time-picker';
import { isThisQuarter } from 'date-fns';

 
export default class TimePickers extends Component {
  state = {
    time: this.props.value,
    format:this.props.format
  }
   

 componentDidMount() {
    // Uso tipico (no olvides de comparar los props):
  

    //if ((this.props.format !== prevProps.format) || (this.props.value !== prevProps.value)) {
        this.setState({
            format:this.props.format,
            time:this.props.value
        })
    }
  
  onChange = (time) => {
      console.log("time/////////////////", time, this.props)
      this.setState({ time })
      if(this.props.type==="WarningAlert"){
        this.props.handleChange("WarningAlert", time)
      }else if(this.props.type==="extendedTime"){
        this.props.handleChange("extendedTime", time)
      }else if(this.props.type==="captions"){
        this.props.time(time, this.props.index)
      }else{
        this.props.handleChangeTimes("timeLimit", time)
      }
  }

  render() {
    return (
      <div className="TimePickers">
        <TimePicker
          onChange={this.onChange}
          value={this.state.time}
          format={this.state.format}
          disableClock={true}
          autoFocus={true}
          maxDetail={"second"}
          clearIcon={null}
        />
      </div>
    );
  }
}