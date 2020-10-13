import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Stories } from '../../../../lib/StoryCollection';
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

   const [story, setStory]=useState('')
   useEffect(() => {
      getstories()
   }, [])

   const getstories=()=>{  
      console.log("storyget", story, props.user[0].username) 
   
       Tracker.autorun(() => {
         let stories = Stories.find({createdBy:props.user[0].username}).fetch();
         console.log(stories)
         setStory(stories)
       })
   }
   

  //console.log("course", course, props.user[0].username)

  return (
    <div className={classes.cards}>
      {
        story!=''?
        story.map((value,index)=>{
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