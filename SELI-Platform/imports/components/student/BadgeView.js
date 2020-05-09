import React, { Component } from 'react';

export default class BadgeView extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            badgeName: this.props.name,
            badgeDescription: this.props.description,
            badgeImage: this.props.image,
        });
        console.log(this.state);
    }
    render(){
        return(
            this.state.badgeName ?
            
            <div className="badge-item">
                <center><img 
                    src={this.state.badgeImage.link} 
                    alt="Badge earned"
                    width="200"
                    height="200"
                /></center>  
                <center><h2>{this.state.badgeName}</h2></center>
            </div>
            :
            null
        );
    }
}