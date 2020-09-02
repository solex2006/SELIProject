import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Courses } from '../../../../lib/CourseCollection';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import CommentIcon from '@material-ui/icons/Comment';
const useStyles = makeStyles({
  root: { 
    width:320,
    padding: '10px 10px 10px 10px'
  },
  media: {
    height: 140,
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    flexWrap:'wrap',
    maxWidth: '100%'
  },
  title: {
    fontSize: 10,
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

   const [course, setCourse]=useState('')
   const [subscribed, setSuscribed]=useState(false)
   useEffect(() => {
      getcourses()
   }, [])

   const getcourses=()=>{  
      console.log("courseget", course, props.user[0].username) 
   
       Tracker.autorun(() => {
         let courses = Courses.find({createdBy:props.user[0].username}).fetch();
         console.log(courses)
         setCourse(courses)
       })
   }
   

  //console.log("course", course, props.user[0].username)

  return (
    <div className={classes.cards}>
      {
        course!=''?
        course.map((value,index)=>{
          return(
              <Card className={classes.root} key={index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={value.image.link}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  <Typography gutterBottom variant="h6" component="h4">
                    Description:
                  </Typography>
                    {value.description}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                   Created by: {value.createdBy}
                  </Typography>

                  <CardActions  disableSpacing>
                    <Link className="button-link MuiButtonBase-root MuiButton-root MuiButton-outlined course-card-button"
                      target="_blank"
                      to={{
                        pathname: "/coursePreview",
                        //hash: this.props.course._id,
                        state: { fromDashboard: true },
                      }}
                      onClick={() => 
                        {
                          //StudentLog.insert({ "UserId": Meteor.userId(), "CourseId" : props.course._id, 
                         // "Datetime": new Date(), "Action": "Course Preview" });
                        }}
                    >
                      {props.language.coursePreview}
                    </Link>
                    {
                      !subscribed ?
                        <Tooltip title={props.language.subscribeJoin}>
                          <IconButton
                            //disabled={props.disabled}
                           // onClick={() => this.props.subscribe(this.props.course._id)}
                            className="course-card-icon-button"
                            aria-label="join course"
                          >
                            <SchoolIcon className="course-card-icon"/>
                          </IconButton>
                        </Tooltip>
                      :
                      <Tooltip title={this.props.language.unsubscribeToolti}>
                        <IconButton
                          className="course-card-icon-button"
                          //disabled={this.props.disabled}
                         // onClick={() => this.props.unsubscribe(this.props.course._id)}
                          aria-label="left course"
                        >
                          <UnsubscribeIcon className="course-card-icon"/>
                        </IconButton>
                      </Tooltip>
                    }
                    {/* <Tooltip title={this.props.language.courseCommentsTooltip}>
                      <IconButton
                        className="course-card-icon-button"
                        onClick={() => this.showComments()}
                        aria-label="left course"
                      >
                        <CommentIcon className="course-card-icon"/>
                      </IconButton>
                    </Tooltip> */}
                  </CardActions>



                </CardContent>
              </CardActionArea>
            </Card>
          )
        })
        :
        undefined 
      }
    </div>
   
  );
}