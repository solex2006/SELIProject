import React ,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import MaterialTable from "material-table";
import {Link,Route} from "react-router-dom";
import tableIcons from '../../components/course/design/icons';
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Certificates(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log("propiedades", props, open)

  const [certificates, setCertificates]=useState([])
  const [columns, setColumns]=useState([])
  const [data, setData]=useState([])
  useEffect(()=>{
   console.log("propiedades11111111111111",props,props.courseData.creationDate)
   //get certiifcates of each student
   getCertificates()
   setOpen(true)
  },[props.open])

  const getCertificates=()=>{
     let studentInfo={}
     let data=[]
     let columns=[]
      props.courseProfiles.map((student, indexStudent)=>{
         let user = Meteor.users.find({_id: student.studentId}).fetch();
         console.log("certifictes*********",user[0].profile.certificates)
         studentInfo={
            id:student.studentId,
            name: student.studentInformation.fullname,
            email:student.studentInformation.email,
            certificates: user[0].profile.certificates !=undefined? user[0].profile.certificates :[]
         }
         //certificates.push(studentInfo)
         setCertificates(user[0].profile.certificates[user[0].profile.certificates.length-1])

         columns=[
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Certificate', field: 'certificate' },
      ]
        let hashcert=user[0].profile.certificates[user[0].profile.certificates.length-1];
        data.push({ name: student.studentInformation.fullname, email: student.studentInformation.email, certificate: 
        typeof(hashcert)==="object" ? 
          <Link to={{pathname:'certificatesValidation/'+hashcert.certificateHash, state:{infoStudent: {
            certificateHash:hashcert.certificateHash,
            course:props.courseData.title,
            date:props.courseData.creationDate.toString(),
            description:props.courseData.description,
            name:student.studentInformation.fullname,
            tutor:props.courseData.createdBy,
          }}}} >See Certificate</Link>:
        <span>---</span>})
        
         
        setColumns(columns)
        setData(data)
         console.log("index and certs-------------->",user[0].profile.certificates[user[0].profile.certificates.length-1], user[0].profile.certificates )
         //let myCourses = Courses.find({createdBy: user, published: true}).fetch();
      })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //props.closeCertificates()
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
           {console.log("certificates---->", certificates,data,columns)}
           <MaterialTable
               icons={tableIcons(props.language.Additem)}
               title="Certificates"
               columns={columns}
               data={data}
    />
          
       
      </Dialog>
    </div>
  );
}
