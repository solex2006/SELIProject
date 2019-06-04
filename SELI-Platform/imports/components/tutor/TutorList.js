import React from 'react';

export default class TutorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Registered tutors</div>
        </div>
      </div>
    );
  }
}
