import { Meteor } from 'meteor/meteor';

import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

export default class DashboardComponent extends React.Component {

    iframeUrl;

  constructor(props) {
    super(props);
    var jwt = require("jsonwebtoken");

    var METABASE_SITE_URL = "http://10.42.0.102:3000";
    var METABASE_SECRET_KEY = "790ed9c1e1154c0072716babff490b51b2fd36df6322d9efd225c37a99fe6dc7";

    var payload = {
      resource: { dashboard: 1 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    this.iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
    console.debug(this.iframeUrl);

    this.state = {
      message: {
        title: '',
        description: '',
        subject: 'report'
      }
    }
  }

  componentDidMount() {

  }

  getLink(){
      return this.iframeUrl;
  }

  render() {
    return(
        <script>
            { document.body.innerHTML = '<iframe src=\"'+this.iframeUrl+'\" style=\"position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;\"></iframe>' }
        </script>
      );
    }
  }
