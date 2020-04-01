import React, { useState }  from 'react';
import { Progress } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Grid from '@material-ui/core/Grid';


const divStyle = {
    height:'50px',
  };


const ProgressBar = (props) => {

   
    TotalPercentage=()=>{
        let green=0
        Object.keys(props.GreenReport).map((key, index)=> {
            
            green=green+props.GreenReport[key]
          });

        let red=0
        Object.keys(props.RedReport).map((key, index)=> {
            red=red+props.RedReport[key]
          });
          return([green/Object.keys(props.GreenReport).length, red/Object.keys(props.RedReport).length])
    }

if (props.Disabilitiesflag==="VD"){
    return(
        <Progress multi style={divStyle}>
                <Progress className="percentageAccessibilitie" bar  color="success" value={props.Disabilities.VisualD} >{Math.round(props.Disabilities.VisualD)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="danger"  value={props.Disabilities.VisualDR}>{Math.round(props.Disabilities.VisualDR)}%</Progress>  
                <Progress className="percentageAccessibilitie" bar  color="info"    value={Math.round((100-(Math.round(props.Disabilities.VisualD+props.Disabilities.VisualDR))))}>{Math.round((100-(Math.round(props.Disabilities.VisualD+props.Disabilities.VisualDR))))}%</Progress>
        </Progress>

    )
}else if(props.Disabilitiesflag==="HD"){
    return(
        <Progress multi style={divStyle}>
                <Progress className="percentageAccessibilitie" bar  color="success" value={props.Disabilities.HearingD} >{Math.round(props.Disabilities.HearingD)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="danger"  value={props.Disabilities.HearingDR}>{Math.floor(props.Disabilities.HearingDR)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="info"    value={Math.round((100-(Math.round(props.Disabilities.HearingD+props.Disabilities.HearingDR))))}> {Math.round((100-(Math.round(props.Disabilities.HearingD+props.Disabilities.HearingDR))))}%</Progress>
        </Progress>

    )
}else if(props.Disabilitiesflag==="CD"){
    return(
        <Progress multi style={divStyle}>
                <Progress className="percentageAccessibilitie" bar  color="success" value={props.Disabilities.CognitiveD} >{Math.round(props.Disabilities.CognitiveD)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="danger"  value={props.Disabilities.CognitiveDR}>{Math.floor(props.Disabilities.CognitiveDR)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="info"    value={Math.round((100-(Math.round(props.Disabilities.CognitiveD+props.Disabilities.CognitiveDR))))}> {Math.round((100-(Math.round(props.Disabilities.CognitiveD+props.Disabilities.CognitiveDR))))}%</Progress>
        </Progress>

    )
}else if(props.Disabilitiesflag==="LD"){
    return(
        <Progress multi style={divStyle}>
                <Progress className="percentageAccessibilitie" bar  color="success" value={props.Disabilities.LanguageD} >{Math.round(props.Disabilities.LanguageD)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="danger"  value={props.Disabilities.LanguageDR}>{Math.floor(props.Disabilities.LanguageDR)}%</Progress>
                <Progress className="percentageAccessibilitie" bar  color="info"    value={Math.round((100-(Math.round(props.Disabilities.LanguageD+props.Disabilities.LanguageDR))))}> {Math.round((100-(Math.round(props.Disabilities.LanguageD+props.Disabilities.LanguageDR))))}%</Progress>   
        </Progress>

    )
}else if(props.Disabilitiesflag==="unidgreenred"){
    return(
       <div>
            {
                Object.keys(props.GreenReport).map((key, index)=> (
                    <Grid >
                        
                    
                            <Progress multi style={divStyle}>
                                <Progress className="percentageAccessibilitie" bar  color="success" value={props.GreenReport[key]} >{Math.round(props.GreenReport[key])} %</Progress>
                                <Progress className="percentageAccessibilitie" bar  color="danger"  value={props.RedReport[key]}>{Math.round(props.RedReport[key])} %</Progress>
                                <Progress className="percentageAccessibilitie" bar  color="info"    value={Math.abs((100-(Math.round(props.GreenReport[key])+Math.round(props.RedReport[key]))))}>{Math.abs((100-(Math.round(props.GreenReport[key])+Math.round(props.RedReport[key]))))} %</Progress>
                            </Progress>
                

                    </Grid>
                   

                    
                ))
            }     
        </div>      
        

    )
}else if(props.Disabilitiesflag==="unidgreenredTitle"){
    return(
       <div>
            {
                Object.keys(props.GreenReport).map((key, index)=> (
                        <Grid className="unidAccessibilitie" >
                            {key}
                        </Grid>
                ))
            }     
        </div>      
        

    )
}else{
    return (
        <div>
            { TotalPercentage()}
             <Progress multi style={divStyle}>
                <Progress bar className="percentageAccessibilitie"  color="success"  value={TotalPercentage()[0]} >{Math.round(TotalPercentage()[0])} % Passed* </Progress>
                <Progress bar className="percentageAccessibilitie" color="danger"   value={TotalPercentage()[1]}>{Math.round(TotalPercentage()[1])} % Failed*</Progress>
                <Progress bar className="percentageAccessibilitie" color="info"     value={Math.abs(Math.round(100-(TotalPercentage()[0]+TotalPercentage()[1])))}>{Math.abs(Math.round(100-(TotalPercentage()[0]+TotalPercentage()[1])))}% Incomplete*</Progress>
            </Progress>
        </div>
      );
}

      
    };
    
export default ProgressBar;