import { Meteor } from 'meteor/meteor';
import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

export default class StudentDashboard extends React.Component {
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
            iframeUrl = Meteor.settings.public.STUDENT_DASHBOARD_SITE_URL;
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
                        <p className="loading-library-text">LOADING STUDENT DASHBOARD</p>
                    </div>
                </div>
            :
                <React.Fragment>
                    <div>
                        <iframe className="student-dashboard-main-frame" src={this.state.iframeUrl}></iframe>
                    </div>
                </React.Fragment>
            }
        </div>
        );
    }
}