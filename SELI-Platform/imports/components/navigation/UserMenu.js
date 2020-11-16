import React, {useState, useEffect} from 'react';
import { Meteor } from 'meteor/meteor';
//import {Courses} from '../lib/CourseCollection';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link,Route} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  typography: {
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: "red",
  },
  faglobe: {
    position: 'relative',
    fontSize: '2em',
    color: 'grey',
    cursor: 'pointer',
  },
  spanfacomment: {
    //position: 'absolute',
    fontSize: '0.6em',
    top: '-4px',
    color: 'red',
    right: '-4px',
  },
  spannum: {
    position: 'absolute',
    fontSize: '0.5em',
    top: '1px',
    color: '#DF430D',
    right: '2px'
    
  },
  circle:{
    
    backgroundColor:'red',
   
  },
  texto:{
    color:'#fff',
    margin: '2px',
    fontWeight:'bold'
  },
  checktrue:{
    display:'none'
  }
  
}));




export default function UserMenu(props) {

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [check, setCheck]=useState(props.user.profile.check)
  const [certificates, setCertificates]=useState(props.user.profile.certificates)
  const [infoStudent, setInfoStudent]=useState({})
  console.log("propiedades de la abrra de navegacion and check--->",props)

  useEffect(()=>{
    //carga toods los certificados al estudiante
    console.log("certiifcados al estudante",props)
    infoStudent.name=props.user.profile.fullname;
    infoStudent.coursename="cambiar por el nombre del curso"
    setInfoStudent(infoStudent)
  },[])

  function closeDrawer() {
    setState({ ...state, right: false });
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (event.which == 13 || event.keyCode == 13) {
      setState({ ...state, [side]: open });
    }
    setState({ ...state, [side]: open });
  };

  function handleAccountManagement() {
    props.showComponent('account');
    closeDrawer();
  }

  keyAccountManagement = (event, name) => {
    if (event.which == 13 || event.keyCode == 13) {
      handleAccountManagement();
    }
  }

  const sideList = side => (
    <div
      className="user-menu-side-container"
      role="presentation"
    >
      <div className="user-menu-options-container">
        <div className="user-menu-profile-container">
          {
            props.user.profile.profileImage !== undefined ?
              <Avatar
                className="user-menu-profile-avatar"
                alt={props.user.username}
                src={props.user.profile.profileImage.link}
              />
            :
            <Avatar
              className="user-menu-profile-avatar"
              alt={props.user.username}
              src='user.svg'
            />
          }
          <p className="user-menu-profile-type">{props.language[props.user.profile.type]}</p>
          <p className="user-menu-profile-username">{props.user.username}</p>
        </div>
        <Divider className="user-menu-profile-divider" light={true}/>
        <p 
          tabIndex="0"
          onKeyPress={keyAccountManagement}
          onClick={() => handleAccountManagement()} 
          className="user-menu-option"
        >
          {props.language.accountManagement}
        </p>
        <Button onClick={() => {props.logOut(); toggleDrawer(side, false)}} color="primary" fullWidth variant="outlined" className="user-menu-option-button">
          {props.language.logOut}
        </Button>
      </div>
    </div>
  );

  const fullList = side => (
    <div
      className="user-menu-side-container"
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >

    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCheck(true)

    //checked in database
    console.log("meteorCheck--->",props)
    //Meteor.users.update({ $push : {"profile.check": true }});
    Meteor.users.update({"_id" :props.user._id },{$set : {"profile.check":true}})
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div  style={{display:'flex'}}>
      {
          props.user.profile.type==='student'?
            <div>
              <a className={classes.faglobe}>
                <span className={classes.spanfacomment}>
                <IconButton aria-label="notifications" style={{backgroundColor:'white', padding:'7px',marginBottom: '6px',}} size="medium" onClick={handleClick}><NotificationsIcon fontSize="medium" /></IconButton>
                </span>
                <span className={check===false? classes.spannum: classes.checktrue}>
                  <span className={classes.circle} >
                    <span className={classes.texto}>1</span>
                  </span>
                </span>    
              </a>
              <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              style={{overflowY:'scroll', height:'250px'}}
            >
              {
                certificates.map((certificate, indexCertificate)=>{
                  
                  if(typeof(certificate)==="object"){
                    
                    let hashInfo=`${certificate.certificateHash}--${certificate.course}--${certificate.date}--${certificate.description}--${certificate.idStudent}--${certificate.name}--${certificate.name}`
                    console.log("-----", hashInfo, certificate)
                    return(
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar} size="small">
                            C
                          </Avatar>
                        }
                        title="Congratulations you have a new certificate !"
                        subheader={<Link 
                          to={'/certificatesValidation/'+ window.btoa(unescape(encodeURIComponent(hashInfo)))  } 
                          target='_blank'
                          >See Certificate</Link>
                      }
                      />
                    )
                  }
              
                }) 
              }
            </Popover>
            </div>
          :
          undefined
        }
      <div 
        tabIndex="0" 
        onClick={toggleDrawer('right', true)} 
        onKeyPress={toggleDrawer('right', true)}
        className="user-menu-container"
      >
        
        {
          props.user.profile.profileImage !== undefined ?
            <Avatar  
              className="user-menu-button-avatar"
              alt={props.user.username}
              src={props.user.profile.profileImage.link}
            />
          :
          <Avatar
           
            className="user-menu-button-avatar"
            alt={props.user.username}
            src='user.svg'
          />
        }
        <p className="user-menu-username">{props.user.username}</p>
        {/* <Badge className="user-menu-badge" overlap="circle" badgeContent={5} color="primary">
          <MailIcon className="user-menu-badge-icon" />
        </Badge> */}
      </div>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}
