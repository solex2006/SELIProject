import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { Courses } from '../../../../lib/CourseCollection';
import { StudentLog } from '../../../../lib/StudentLogCollection';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import CommentIcon from '@material-ui/icons/Comment';

import Loading from '../../tools/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Comment from '../../../components/student/comments/Comment';

import {Comments} from '../../../../lib/CommentsCollection';
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
  console.log("MEdiaCARD", props)
  const classes = useStyles();

   const [course, setCourse]=useState('')
   const [subscribed, setSuscribed]=useState(false)
   const [disabled, setDisabled]=useState(false)
   const [dialog,setDialog]=useState({
     open:false,
     loading:false,
     commentResults:false,
     comments:''

   })
   useEffect(() => {
      getcourses()
   }, [])

   const getcourses=()=>{  
      console.log("courseget", course, props.user[0].username) 
   
       Tracker.autorun(() => {
         let courses = Courses.find({createdBy:props.user[0].username}).fetch();
         let coursespublish=courses.filter(course=>course.published===true)
         console.log(courses)
         setCourse(coursespublish)
       })
   }
   
   const showComments = (id) => {

    setDialog(prev=>({
      ...prev, open: true, loading: true,
    }))
  
      Tracker.autorun(() => {
        let comments = Comments.find({course: id, show: true}).fetch();
        if (comments.length) {
          setDialog(prev=>({
            ...prev,  commentResults: true,
            comments: comments,
            loading: false,
          }))
        }
        else {
          setDialog(prev=>({
            ...prev,  commentResults: false,
            loading: false,
          }))
        }
      });
  }

  

  return (
    <div className={classes.cards}>
      {
        course!=''?
        course.map((value,index)=>{
          console.log("el curso------>:",value)
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
                        hash: value._id,
                        state: { fromDashboard: true },
                      }}
                      onClick={() => 
                        {
                          StudentLog.insert({ "UserId": Meteor.userId(), "CourseId" : value._id, 
                          "Datetime": new Date(), "Action": "Course Preview" });
                        }}
                    >
                      {props.language.coursePreview}
                    </Link>
                    {
                      !subscribed ?
                        <Tooltip title={props.language.subscribeJoin}>
                          <IconButton
                            disabled={disabled}
                            onClick={() => {
                              setDisabled(true)
                              setSuscribed(true)
                              props.goToUser("subscribe")//falta corregir se esta inscribindo en el mismo curso siempre. nota: pasar id ala funcion
                            }
                            }
                            className="course-card-icon-button"
                            aria-label="join course"
                          >
                            <SchoolIcon className="course-card-icon"/>
                          </IconButton>
                        </Tooltip>
                      :
                      <Tooltip title={props.language.unsubscribeToolti}>
                        <IconButton
                          className="course-card-icon-button"
                          //disabled={this.props.disabled}
                          onClick={() => this.props.unsubscribe("unsubscribe")}
                          aria-label="left course"
                        >
                          <UnsubscribeIcon className="course-card-icon"/>
                        </IconButton>
                      </Tooltip>
                    }
                     <Tooltip title={props.language.courseCommentsTooltip}>
                      <IconButton
                        className="course-card-icon-button"
                        onClick={() => showComments(value._id)}
                        aria-label="left course"
                      >
                        <CommentIcon className="course-card-icon"/>
                      </IconButton>
                    </Tooltip> 
                  </CardActions>



                </CardContent>
              </CardActionArea>
            </Card>
          )
        })
        :
        undefined 
      }

      <Dialog
          open={dialog.open}
          onClose={()=>setDialog(prev=>({...prev, open:false}))}
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          className="comments-dialog"
         // disableBackdropClick={true}
        >
          <DialogTitle className="comment-dialog-title">
            {props.language.comments}
          </DialogTitle>
          <DialogContent className="comments-dialog-content">
            {
              dialog.loading ?
                <Loading message={props.language.loadingComments}/>
              :
              <div>
                {
                  dialog.commentResults ?
                    <div className="comments-result-container">
                      {
                        dialog.comments.map((comment, index) => {
                          return(
                            <Comment
                              comment={comment}
                              commentOf={props.language.commentOf}
                            />
                          )
                        })
                      }
                    </div>
                  :
                  <div className="comments-result-container">
                    <div className="center-row">
                      <DialogContentText className="success-dialog-content-text" id="alert-dialog-description">
                        {props.language.noCommentsText}
                      </DialogContentText>
                    </div>
                    <div className="center-row">
                      <CommentIcon className="comments-result-icon"></CommentIcon>
                    </div>
                  </div>
                }
              </div>
            }
          </DialogContent>
        </Dialog>
    </div>
   
  );
}