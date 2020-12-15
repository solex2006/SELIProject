import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:'12px',
    paddingRight:'12px',
    marginLeft:'auto',
    marginRight:'auto',
    maxWidth:'85rem',
    paddingBottom:'18%',
    paddingTop:'100px'
   // marginTop:'100px',
  },
  rootMain:{ 
    backgroundColor:'#f5f5f5'
  // backgroundImage: `url("https://www.unir.net/empresa/desarrollo-directivo/wp-content/uploads/2019/06/Equipo.jpg")`
  },
  target:{
    backgroundColor:'#f5f5f5'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  footer:{
    marginTop:'30px',
  },
  description:{
    display:'flex',
    alignContent:'center',
    paddingTop:'30px',
    alignItems:'center'
  },
  section:{
    backgroundImage: `url("https://empresas.infoempleo.com/hrtrends/media/2019/04/HRTRENDS-RECLUTAMIENTO-COMO_UNIR_UN_EQUIPO_DE_TRABAJO.jpg")`,
    paddingBottom:'40px',
    paddingTop:'25px',
    paddingLeft: '270px',
    paddingRight: '270px',
    color:'#1d1d21',
  }
}));

export default function CenteredGrid(props) {
  console.log("En mostrar certificado", props, )
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [id, setId]=useState(props.match.params.id);
  const [studentData, setStudentData]=useState((decodeURIComponent(escape(window.atob( props.match.params.id)))).split("--"));
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

  return (
    <div className={classes.rootMain}>
       <section className={classes.section}>
          <h1 style={{textAlignLast:'center', paddingBottom:'10px'}}>Smart Ecosystem for Learning and Inclusion</h1>
          <p style={{fontSize:'x-large', padding:'10px 10px 50px 50px', textAlign:'center'}}>Welcome to the SELI Project!</p>
          The concept of the project approaches the topic of digital exclusion and the inaccessibility of education for disadvantaged groups as forming a 
          set of challenges that offer the potential for improving the digital competences of teachers in the LAC and EU regions, and can lead to the extensive 
          participation of citizens who have relatively poor access to innovative technologies involved in education, training and inclusion through ICT. 
          Project activities are related to fostering more efficient ICT solutions for better education and inclusion.
      </section>

      <div className={classes.root}>
        <p style={{paddingBottom:'20px', textAlign:'center', textTransform:'uppercase'}}>{studentData[1]}</p>

        <Grid container spacing={1}>
          <Grid className={classes.description} item xs={12} sm={12} md={4}>
          <Card className={classes.target}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  C
                </Avatar>
              }
              
              title={studentData.name}
              subheader={(new Date()).toString()}
            />
            
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
              Completed by: {studentData[5]}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {studentData[2]}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {studentData[5]} 's account is verified. 
              SELI: Smart Ecosystem for Learning and Inclusion certifies their successful completion of {studentData[1]} course.
              </Typography>
            </CardContent>
          
            
          </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <iframe src={"https://201.159.223.92/vows/"+studentData[0]} height="500px" width="100%" title="Certificate"></iframe>
          </Grid>
        </Grid>

        <footer className={classes.footer}>
          <p>Copyright &copy; 2020 SELI Team.</p>
        </footer>
      </div>

    </div>
    
  );
}
