import {
	Grid,
	
} from '@material-ui/core';
import DurationInput from 'react-duration'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, {useState,useEffect} from 'react';


const useStyles = makeStyles(theme => ({
	input: {
      display:'flex',
      alignContent:'center',
      alignItems:'center',
      padding:'15px 15px 10px 10px'
   },
   box:{
      display:'block',
      padding:'25px 25px 10px 10px'
   }
}));


export default function DurationSlider2({ min, max,  getParamsDuration }) {
   const classes = useStyles();
   console.log("qqqqqqq-------------------",min,max)
   const [stateMin, setstateMin] = useState({duration: min})
   const [stateMax, setstateMax] = useState({duration: max })

   useEffect(()=>{
      //console.log("max and min-------------------")
   
      setstateMin({duration: 21599})
      stateMin.duration=21599
   },[])
   
   
	

	return (
		<React.Fragment>
         <div classes={classes.input}>
            <div classes={classes.box}>
               <p className="MuiFormHelperText-root">Minimum duration</p>
               {console.log("sdfsdf",stateMin)}
               <DurationInput
                  minValue={21599}
                  maxValue={720000}
                  buttonIncrement={60}
                  value={ stateMin.duration }
                  onChange={ new_duration=> {
                     setstateMin({duration: new_duration})
                     getParamsDuration([Math.floor(stateMin.duration/ 3600),Math.floor(stateMax.duration/ 3600)], true)
                  }}
               />
               <p className="MuiFormHelperText-root">Minimum duration must be greater than 5:59:59 hh:mm:ss</p>
            </div>
            
            <div classes={classes.box}>
               <p className="MuiFormHelperText-root">Maximum duration</p>
               <DurationInput
                  minValue={21599}
                  maxValue={720000}
                  buttonIncrement={60}
                  value={ stateMax.duration }
                  onChange={ new_duration=> {
                     setstateMax({duration: new_duration})
                     getParamsDuration([Math.floor(stateMin.duration/ 3600),Math.floor(stateMax.duration/ 3600)], true)
                  }}
               />
               <p className="MuiFormHelperText-root">Maximum duration must be smaller than 200:00:00 hh:mm:ss</p>
            </div>
         </div>
          
		</React.Fragment>
	);
}
