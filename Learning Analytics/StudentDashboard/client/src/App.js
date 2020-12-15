import React from 'react';
import Login from './components/Login'; 
import LayoutDeshBoard from './components/LayoutDeshBoard';
import LayoutStudyPlan from './components/LayoutStudyPlan';
import LayoutHealthPlan from './components/LayoutHealthPlan';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/DeshBoard" component={LayoutDeshBoard}/>
        <Route path="/StudyPlan" component={LayoutStudyPlan}/>
        <Route path="/HealthPlan" component={LayoutHealthPlan}/>
      </Switch> 
    </div>
  </Router>
  )
}
export default App;