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

import Main from '../imports/ui/Main';
import Test from '../imports/ui/Test';

const history = createBrowserHistory();

window.browserHistory = history;

Tracker.autorun(() => {

});



Meteor.startup(() => {
  ReactDOM.render(
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main} history={history}/>
        <Route exact path="/test" component={Test} history={history}/>
      </Switch>
    </Router>, document.getElementById('render-target')
  );
});
