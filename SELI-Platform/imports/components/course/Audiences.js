import React, { Component } from 'react';
import CheckboxList from './CheckboxList'
import TextField from  '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class Audiences extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            other:''
         }
    }
 /* handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
        other:event.target.value
    })
  }; */
  /* SendotherAudiences=(name)=>{
    console.log("this wil be send", this.state.other, name)
  } */
    render() { 
        return ( 
            <div >
                <div className="items-audiences">
                    <CheckboxList
                        other={this.state.other}
                        getAudiences={this.props.getAudiences}
                        areas={[`${this.props.language.audience1}`, `${this.props.language.audience2}`, `${this.props.language.audience3}`]}
                        name={"signature"}
                    />
                </div>
                
                <div className="items-audiences">
                <CheckboxList
                    getAudiences={this.props.getAudiences}
                    areas={[`${this.props.language.level1}`, `${this.props.language.level2}`, `${this.props.language.level3}`, `${this.props.language.level4}`]}
                    name={"level"}
                />
                </div>
                 
                <div className="items-audiences">
                    <CheckboxList
                        getAudiences={this.props.getAudiences}
                        areas={[`${this.props.language.type2}`,`${this.props.language.type1}`]}
                        name={"type"}
                    />
                </div>
                
            </div>
        );
    }
}
 
export default Audiences;