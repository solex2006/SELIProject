import React from 'react';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './style.css'
import { LineWeight } from 'material-ui-icons';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0, 1),
  },
  line:{
      lineHeight: '80%',
  }
}));

//Andres Heredia// 
export default function Lista(props) {
  const classes = useStyles();

  const Audiences=()=>{
      return(
        <div className='resources'>
           {/*  <div className='crnheading'>
                <h4>This course is designed for these target audience:</h4>
            </div> */}
          
                {
                    props.data[0].map((value,index)=>(
                        value.isChecked===true ?
                            <p className='elemntoflist' key={value.id}>{value.label}</p>
                        :
                        undefined    
                    ))
                }
                {
                    props.data[2]!=undefined ?
                    props.data[2].map((value,index)=>(//other Audiences
                        <p  className='elemntoflist' key={value.label}>
                            {value.label}
                        </p>    
                    ))
                    :
                    undefined
                }  
                {
                        props.data[1].map((value,index)=>(//Inclusion Goals  
                            value.isChecked===true ?
                                <p className='elemntoflist' key={value.id}>
                                    {value.label}
                                </p>
                            :
                            undefined    
                        ))
                } 
           
        {/* <div>
            <div className='crnheading'>
                <h4>This course is designed to be inclusive for:</h4>
            </div>
        </div>  */}
                {/* <ul className='resources'>
                    {
                        props.data[1].map((value,index)=>(//Inclusion Goals  
                            value.isChecked===true ?
                                <li className='elemntoflist' key={value.id}>
                                    {value.label}
                                </li>
                            :
                            undefined    
                        ))
                    }
                </ul> */}
        </div>
        
      )
  }
  
  const LearningGoals=()=>{
      return(
          <React.Fragment>
              <div>
                  <strong className='descriptiontext'>Cognitive Domain Objectives</strong>:
                  {
                    props.data.analyzing.length!=0?
                    <ul >
                        {
                            props.data.analyzing.map((value,index)=>(
                                <li >
                                    {value.aux+': '+value.label}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    undefined
                  }

                  {
                    props.data.creating.length!=0?
                    <ul >
                        {
                            props.data.creating.map((value,index)=>(
                                <li >
                                    {value.aux+': '+value.label}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    undefined    
                  }
                  {
                    props.data.evaluating.length!=0?
                    <ul >
                        {
                            props.data.evaluating.map((value,index)=>(
                                <li >
                                    {value.aux+': '+value.label}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    undefined
                  }
                  {
                    props.data.remembering.length!=0?
                    <ul >
                        {
                            props.data.remembering.map((value,index)=>(
                                <li >
                                    {value.aux+': '+value.label}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    undefined
                  }
                  
                  {
                    props.data.understanding.length!=0?
                    <ul >
                        {
                            props.data.understand.map((value,index)=>(
                                <li >
                                    {value.aux+': '+value.label}
                                </li>
                            ))
                        }
                    </ul>
                    :
                    undefined
                  }
              </div>
          </React.Fragment>
      )
  }

  const LearningOutcomes=()=>{
      return(
        <React.Fragment>
            <div>
                {
                    props.data.contents.length!=0?
                    props.data.contents.map((value,index)=>(
                        <ul >
                            
                               
                                    <li >
                                        {value.aux+': '+value.label}
                                    </li>
                               
                            
                        </ul>
                    ))
                    :
                    undefined
                }
                {
                    props.data.skills.length!=0?
                    props.data.skills.map((value,index)=>(
                        <ul >
                            
                                
                                    <li >
                                        {value.aux+': '+value.label}
                                    </li>
                                
                        </ul>
                    ))
                    :
                   undefined
                }
                {
                     props.data.values.length!=0?
                     props.data.values.map((value,index)=>(
                        <ul >
                           
                                    <li >
                                        {value.aux+': '+value.label}
                                    </li>
                            
                        </ul>
                     ))
                     :
                     undefined
                }
            </div>
        </React.Fragment>
      )
  }
  return (
    <div >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <div >
            <List dense={true}>
                {
                props.title==='Audiences'?
                <Audiences/>
                :
                props.title==='LearningGoals'?
                <LearningGoals/>
                :
                props.title==='LearningOutcomes'?
                <LearningOutcomes/>
                :
                undefined
                }
              
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}