import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  redirect = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  mailLink = (mail) =>{
    window.location.href = `mailto:${mail}`;
  }

  render() {
    return(
      <div className="user-card-container">
        <div className="user-card-image">
          <p className="user-card-header-text">Profile picture</p>
          <div className="user-card-profile-image" style={{backgroundImage: `url(${this.props.user.profile.profileImage.link})`}}></div>
        </div>
        <Divider/>
        <div className="center-row">
          <p className="user-card-header-text">Profile information</p>
        </div>
        <div className="user-card-header">
          <p className="user-card-header-text">{`Name: ${this.props.user.profile.fullname}`}</p>
          <p className="user-card-header-text">{`Username: ${this.props.user.username}`}</p>
          <p onClick={() => this.mailLink(this.props.user.emails[0].address)} className="user-card-link">{`Email: `} <span className="user-card-link-text">{this.props.user.emails[0].address}</span></p>
        </div>
        <p className="user-card-header-text">{this.props.user.profile.biography}</p>
        <div className="user-card-body">
          {
            this.props.user.profile.website !== "" ?
              <p onClick={() => this.redirect(this.props.user.profile.website)} className="user-card-link">{`Website: `}<span className="user-card-link-text">{this.props.user.profile.website}</span></p>
            :
            undefined
          }
          {
            this.props.user.profile.googleLink !== "" ?
              <p onClick={() => this.redirect(this.props.user.profile.googleLink)} className="user-card-link">{`Google Link: `}<span className="user-card-link-text">{this.props.user.profile.googleLink}</span></p>
            :
            undefined
          }
          {
            this.props.user.profile.phoneNumber !== "" ?
              <p className="user-card-link">{`Phone number: `}<span className="user-card-link-text">{`+${this.props.user.profile.countryCode} ${this.props.user.profile.phoneNumber}`}</span></p>
            :
            undefined
          }
        </div>
      </div>
    )
  }
}
