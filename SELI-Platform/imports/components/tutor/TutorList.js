import React from 'react';

import Button from '@material-ui/core/Button';

import TutorRegistry from './TutorRegistry';

export default class TutorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  saveTutor(){
    this.props.showForm('RequirementsForm', true);
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Registered tutors</div>
          <div className="registry-list-container">
            {
              this.props.tutors.map((tutors) =>
                {
                  return <TutorRegistry
                    tutors={tutors}
                    key={tutors._id}/>
                })
            }
          </div>
          {
            this.props.saveTutor ?
              <div className="form-button-container">
                <Button onClick={() => this.saveTutor()} className="form-button" id="upload-button" variant="contained" color="secondary">
                  Save tutor
                </Button>
              </div>
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
