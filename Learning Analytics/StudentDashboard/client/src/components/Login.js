import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faGraduationCap, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { auto } from 'async';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles( theme => ({
  root: {
    padding: auto,
    minWidth: 275,
    width: 360,
    height: 400,
    margin: 'auto',
    marginTop: '15vh',
    border: 'none'
  },
  title: {
    marginTop: 40,
    margin: '0 36px',
    font: '14px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif',
  },
  buttonText:{
    marginTop: '5vh',
    font: '14px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif',
    textAlign: 'center',
  },
  pos: {
    justifyContent: 'center',
  },
  appbar:{
    zIndex: theme.zIndex.drawer + 1,
  }
}));

export default function OutlinedCard (props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
              <Typography variant="h6" noWrap>
                  Personal Goal
              </Typography>
          </Toolbar>
      </AppBar>
    <Card
      padding='auto'
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      className={classes.root} 
      variant="outlined"
    >
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          <Box fontSize={24} fontWeight="fontWeightBold" m={1}>
            <FontAwesomeIcon icon={faHeartbeat}/> Lead a Healty life <br />
            <FontAwesomeIcon icon={faGraduationCap}/>Explore the World<br />
            <FontAwesomeIcon icon={faBullseye}/> Make a Goal <br />
          </Box>
        </Typography>
        <Typography className={classes.buttonText} color="textPrimary" gutterBottom>
          Join Us Today.
        </Typography>
      </CardContent>
      <CardActions className={classes.pos}>
        <Button 
        variant="contained"
        href="http://localhost:5000/user" 
        color="primary" 
        >
          <FontAwesomeIcon icon={ faGoogle } style={{color:'red', marginRight: 8}}/> Log in with Google
        </Button>
      </CardActions>
    </Card> 
  </>
  );
}

