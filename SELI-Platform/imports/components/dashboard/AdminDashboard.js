import { Meteor } from 'meteor/meteor';
import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

export default class AdminDashboard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            title: "",
            iframeUrl: '',
            loading: true
        }
    }

    componentDidMount(){
        this.setState({loading: true});
        this.generateDashboardUrl();
        this.setState({loading: false});
    }

    generateDashboardUrl(){
        let iframeUrl;
        let user = this.props.user;
        if (user) {
            let jwt = require("jsonwebtoken");
            let METABASE_SITE_URL = Meteor.settings.public.METABASE_DOMAIN;
            let METABASE_SECRET_KEY = Meteor.settings.public.METABASE_KEY;
            let token;
            let payload;

            payload = {
                resource: { dashboard: 1 },
                params: {},
                exp: Math.round(Date.now() / 1000) + (10 * 60)
            };
            
            token = jwt.sign(payload, METABASE_SECRET_KEY);
            iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
            this.setState({ iframeUrl : iframeUrl });
        }
    }

    render() {
        return (
        <div className="metabase-main-container">
            {
            this.state.loading ?
                <div className="loading-library-container">
                    <div className="loading-library-row">
                        <div className="loading-library-container">
                            <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                        </div>
                        <p className="loading-library-text">LOADING ADMIN DASHBOARD</p>
                    </div>
                </div>
            :
                <React.Fragment>
                    <div>
                        <iframe className="metabase-main-frame" src={this.state.iframeUrl}></iframe>
                    </div>
                </React.Fragment>
            }
        </div>
        );
    }
}