import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

let classes = makeStyles(theme => ({
    root: {
      display: 'grid',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 1000,
    height: 5000,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

  

export default class CertificateGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            certificates: [],
        }
        

      }
  
    componentDidMount(){
      let user = Meteor.user();
        let myCertificates=user.profile.certificates;
        this.setState({
          certificates: myCertificates,
        });
        console.log("los certificados student",myCertificates )
    }

  render() {
    return (
        <div className={classes.root}>
        <GridList cellHeight={700} className={classes.gridList}  cols={2}>
            {this.state.certificates.map(link => (
            <GridListTile key={link}>
                <iframe src={"https://201.159.223.92/vows/"+link} alt="Certificate" class="myCertificate"/>
            </GridListTile>
            ))}
        </GridList>
        </div>
    );
    }
    }
