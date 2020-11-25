import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import TextField from  '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    display: 'inline-block'
  },
}));

export default CheckboxList= (props)=> {
  const classes = useStyles();
  var [checked, setChecked] = React.useState([0]);
  var [other, setOther] = React.useState("nothing");
  var [fieltext, setFieldText] = React.useState("Nofieldtext");

  const handleToggle = value => () => {
    console.log("SAVE",value)
    const currentIndex = checked.indexOf(value);
    var newChecked = [...checked];

    if(value==='save'){
      if (other==="nothing" || other===undefined){
        //console.log("pass...")
      }else{
        newChecked.push(other);
        //console.log("Push audiences..", newChecked)
        removeItemFromArr( newChecked, `${props.language.other}` );
        newChecked = newChecked.filter(e => e !== 0);
        props.getAudiences(newChecked, props.name)
        setOther("nothing")//restart variable for storage textfield
        setFieldText("Nofieldtext")
      }
    }else{
      if (currentIndex === -1) {
        if(value===`${props.language.other}` ){
          setFieldText("fieldtext")//Show the textfield
          
          newChecked.push(value);
          //removeItemFromArr( newChecked, 0);
          
        }else{
          newChecked.push(value);
          newChecked = newChecked.filter(e => e !== 0);
          //console.log("Push audiences..", newChecked, value)
          //removeItemFromArr( newChecked, `${props.language.other}` );
          props.getAudiences(newChecked, props.name)
        }
        
      } else {
          newChecked.splice(currentIndex, 1);
          //console.log("Splice Audiences...", newChecked)
          //removeItemFromArr( newChecked, `${props.language.other}` );
          props.getAudiences(newChecked, props.name)
          if(value===`${props.language.other}` ){
            setFieldText("Nofieldtext")//Show the textfield
          }
          
        }
        
      

    }
    setChecked(newChecked);
  };

 const handleChange = (event) => {
   // console.log(event.target.value);
    setOther(event.target.value)  
  };
  const handleTextField = () => {
    return(
      <form noValidate autoComplete="off">
          <TextField 
          onChange={handleChange}
          id="standard-basic" label={`${props.language.other}`} />
          <Button className={"buttomAudiencesSend"} onClick={handleToggle("save")} color="primary">
          <SendRoundedIcon/>
          </Button>
      </form>
    )
     
  };

  const removeItemFromArr= ( arr, item )=> {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
}
  const audiences=props.areas

  
  return (
    <div>
      <List className={classes.root}>
      {audiences.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                color="primary"
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={` ${audiences[index]}`} />
          </ListItem>
          
        );
       
      })}
      {
        fieltext==="fieldtext" ?
        handleTextField()
        :
        undefined
      }
     {/*  <form noValidate autoComplete="off">
          <TextField 
          onChange={handleChange}
          id="standard-basic" label="Other" />
          <Button className={"buttomAudiences"} onClick={handleToggle("save")} variant="outlined" color="primary">Send</Button>
      </form> */}

    </List>
    </div>

  );
}