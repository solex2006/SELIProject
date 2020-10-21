import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Tracker } from 'meteor/tracker';
import Home from '../imports/ui/Home';
import User from '../imports/ui/User';
import Community from '../imports/ui/Community';
import Administrator from '../imports/ui/Administrator';
import UserRegistration from '../imports/ui/UserRegistration';
import RetrievePasswd from '../imports/ui/RetrievePasswd';
import CoursePreview from '../imports/ui/CoursePreview';
import Story from '../imports/ui/Story';
import UnityWebgl from '../imports/ui/UnityWebgl';
import MediaPlayer from '../imports/components/student/MediaPlayer';
import CoursesDashboard from '../imports/ui/CoursesDashboard';
import TutorRequestList from '../imports/components/administrator/TutorRequestList';
import CertificateValidation from '../imports/ui/CertificateValidation';
import {Helmet} from "react-helmet";
import StoriesDashboard from '../imports/components/student/StoriesDashboard';

const history = createBrowserHistory();
window.browserHistory = history;
Tracker.autorun(() => {

});


Meteor.startup(() => {
  ReactDOM.render(
    <Router  history={history}>
    <Helmet>
      <meta name="viewport" content="width=device-width,initial-scale=0.85,maximum-scale=1,user-scalable=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      <meta name="HandheldFriendly" content="true"/>
      <meta charset="utf-8" />
      <title>SELI-Platform</title>
      <meta name="description" content="THE SELI learning platform provides the opportunity tot create courses for various types of disabilities, taking into consideration accessibility standards, interaction between students and stimulating the creativity of tutors and students." />
      </Helmet>
      <Switch >
        <Route exact path="/" component={Home} history={history}/>
        <Route exact path="/user" component={User} history={history}/>
        <Route exact path="/administrator" component={Administrator} history={history}/>
        <Route exact path="/Community" component={Community} history={history}/>
        <Route exact path="/UserRegistration" component={UserRegistration} history={history}/>
        <Route exact path="/RetrievePasswd" component={RetrievePasswd} history={history}/>
        <Route exact path="/unityWebgl" component={UnityWebgl} history={history}/>
        <Route exact path="/coursePreview" component={CoursePreview} history={history}/>
        <Route exact path="/story" component={Story} history={history}/>
        <Route exact path="/media" component={MediaPlayer} history={history}/>
        <Route exact path="/dashboard" component={CoursesDashboard} history={history}/>
        <Route exact path="/StoriesDashboard" component={StoriesDashboard} history={history}/>
        <Route exact path="/tutorRequests" component={TutorRequestList} history={history}/>
        <Route exact path="/certificatesValidation" component={CertificateValidation} history={history}/>
      </Switch>
    </Router>, document.getElementById('render-target')
  );
});
