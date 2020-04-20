import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const PositionedSnackbar =(props)=> {
  const queueRef = React.useRef([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);


  useEffect(() => {
    //console.log("propiedades del sanckAR", props.alert)
    props.alert==="alert"?
    setOpen(true)
    :
    setOpen(false)
    // Actualiza el título del documento usando la API del navegador 
  });

 handleClose = (event, reason) => {
    setOpen(false);
  };


  snackbar=(message)=>{
      return(
            <Snackbar
            key={Math.random()}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={17000}
            onClose={handleClose}
            message={message}
            action={
            <React.Fragment>
                <IconButton
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
                >
                <CloseIcon />
                </IconButton>
            </React.Fragment>
            }
        />
      )
  }
  const classes = useStyles();
  return (
    <div>
        {
            props.type==="pdf"?
            snackbar(props.language.noPdfFounded)
            :
            undefined
        }
        {
            props.type==="audio"?
            snackbar(props.language.noAudioFounded)
            :
            undefined
        }
        {
            props.type==="video"?
            snackbar(props.language.noVideoFounded)
            :
            undefined
        }
        {
            props.type==="image"?
            snackbar(props.language.noImageFounded)
            :
            undefined
        }
        {
            props.type==="compressed"?
            snackbar(props.language.noCompressedFounded)
            :
            undefined
        }
    </div>
  );
}
export default PositionedSnackbar;