import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FaLink } from "react-icons/fa";
import { link } from '../../../../lib/editorUtils';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function LinkButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [variant, setVariant] = React.useState();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setVariant("contained");
  }

  function handleClose() {
    setAnchorEl(null);
    setVariant("text");
  }

  function insertLink(){
    let url = document.getElementById('url-input').value;
    let text = document.getElementById('text-input').value;
    if (text === '' && url !== '') {
      link(url, url);
      handleClose();
    }
    else if (url === '' || text === '') {
      handleClose();

    }
    else {
      link(url, text);
      handleClose();
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button color="primary" variant={variant} className="editor-button" onClick={handleClick} id="linkButton">
        <FaLink className="editor-icon"/>
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
          <p className="editor-form-title">Link editor</p>
          <Divider light={true}/>
          <TextField
            id="url-input"
            label="Link"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            id="text-input"
            label="Text"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <div className="editor-form-button-container">
            <Button color="primary" variant="contained" onClick={insertLink}>Insert</Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
