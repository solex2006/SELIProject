import React from 'react';
import TeacherDashboard from '../dashboard/TeacherDashboard';
import StudentDashboard from '../dashboard/StudentDashboard';
import AdminDashboard from '../dashboard/AdminDashboard';
import BounceLoader from 'react-spinners/BounceLoader';

export default class DashboardComponent extends React.Component {

  constructor(props) {
    super();

    this.state = {
      user: null,
      loading: true
    }
  }

  componentDidMount(){
    this.setState({loading: true});
    let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
    this.setState({ user: user[0], loading: false });
  }

  render() {
    return (
      <div>
        {
          this.state.loading ?
            <div className="loading-library-container">
                <div className="loading-library-row">
                    <div className="loading-library-container">
                        <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                    </div>
                    <p className="loading-library-text">LOADING DASHBOARD</p>
                </div>
            </div>
          :
            this.state.user.profile.type === 'tutor' ?
              <TeacherDashboard
                user={this.state.user}
              ></TeacherDashboard>
            :
            this.state.user.profile.type === 'student' ?
              <StudentDashboard
                user={this.state.user}
              ></StudentDashboard>
            :
            this.state.user.profile.type === 'administrator' ?
              <AdminDashboard
                user={this.state.user}
              ></AdminDashboard>
            :
              undefined
        }
      </div>
    );
  }
}
