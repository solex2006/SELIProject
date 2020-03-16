import { Meteor } from 'meteor/meteor';
import Loading from '../../components/tools/Loading';

import React, { Component } from 'react';

export default class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      iframeUrl : null
    }
  }

  componentDidMount(){
    let iframeUrl;
    Meteor.call("GetUserById", Meteor.userId(), (error, response) =>  
    {
      let user = response;
      if (user.length) {
        let jwt = require("jsonwebtoken");
        let METABASE_SITE_URL = "http://localhost:3000";
        let METABASE_SECRET_KEY = "790ed9c1e1154c0072716babff490b51b2fd36df6322d9efd225c37a99fe6dc7";
        let token;
        let payload;

        if(user[0].profile.type === 'tutor'){
          payload = {
            resource: { dashboard: 2 },
            params: {
              "id": Meteor.userId()
            },
            exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
          };
        }
        else if(user[0].profile.type === 'administrator'){
          payload = {
            resource: { dashboard: 1 },
            params: {},
            exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
          };
        }
        token = jwt.sign(payload, METABASE_SECRET_KEY);
        iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
        this.setState({ iframeUrl : iframeUrl });
      }
    });
  }

  render() {
    const { iframeUrl } = this.state;
    if(iframeUrl === null){
      return(
          <div className="loading-course-container">
            <Loading message="Loading Dashboard..."/>
          </div>
        );
    }
    else{
      return(
        <iframe className="metabase-main-frame" src={iframeUrl}></iframe>
        );
      }
    }
  }