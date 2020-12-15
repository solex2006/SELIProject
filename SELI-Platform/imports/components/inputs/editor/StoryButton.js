import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { link } from '../../../../lib/editorUtils';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function StoryButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [variant, setVariant] = React.useState();
  const [storyID, setStory] = React.useState("");
  const [storyName, setStoryName] = React.useState("");

  useEffect(() => {
    document.title=this.props.language.myStories;
  })

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setVariant("contained");
  }

  function handleClose() {
    setAnchorEl(null);
    setVariant("text");
  }

  function handleClose() {
    setAnchorEl(null);
    setVariant("text");
  }

  function selectStory(id, name) {
    setStory(id);
    setStoryName(name);
  }

  function insertLink(){
    let url = storyID;
    let text = storyName;
    if (text === '' && url !== '') {
      link(url, url);
      handleClose();
    }
    else if (url === '' || text === '') {
      handleClose();

    }
    else {
      url = `/story#${url}`;
      link(url, text);
      handleClose();
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button variant={variant} className="editor-link-button-story" onClick={handleClick} id="linkButton">
        {props.language.story}
        {props.buttonLabels ? "Link" : undefined}
      </Button>
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
          horizontal: 'right',
        }}
      >
        <div className="editor-link-form-container">
          <p className="editor-form-title">{props.language.myStories}</p>
          <Divider light={true}/>
          {
            props.stories && props.stories.length ?
              props.stories.map(story => {
                return(
                  <Paper 
                    onClick={() => selectStory(story._id, story.activity.name)} 
                    elevation={story._id === storyID ? 5 : 1} 
                    className="story-item-container-link"
                  >
                    <LibraryBooksIcon className="story-item-icon"/>
                    <p className="story-item-text-primary">{story.activity.name}</p>
                  </Paper>
                )
              })
            : undefined
          }
          {
            props.stories && props.stories.length ?
              <div className="editor-form-button-container">
                <Button color="primary" variant="contained" onClick={insertLink}>{props.language.insert}</Button>
              </div>
            :
              <div className="empty-dashboard-row">
                <p >{props.language.notHaveStoriesYet}</p>
                <InfoIcon />
              </div>
          }
        </div>
      </Popover>
    </div>
  );
}
