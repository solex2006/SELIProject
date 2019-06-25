import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TransferList from '../inputs/TransferList';

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledgeItems: ['Math', 'Programing', 'Physics', 'Biology'],
      technilcaItems: ['Headphones', 'Microphone', 'Movil device'],
      peopleItems: ['Low vision & bind people', 'People with hear impairmet', 'People with intellectual disability', 'People with learning disabilities', 'People with Dyslexia', 'Elders',],
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  saveRequirements() {
    this.props.showForm('UnitsEditor', true);
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>
          <div className="form-subtitle">Requirements</div>
          <div className="input-list-container">
            <p className="list-input-label">Knowledge requirements</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.state.knowledgeItems}
              />
            </div>
          </div>
          <div className="input-list-container">
            <p className="list-input-label">Technical requirements</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.state.technilcaItems}
              />
            </div>
          </div>
          <div className="input-list-container">
            <p className="list-input-label">People who should take the course</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.state.peopleItems}
              />
            </div>
          </div>
          <div className="form-button-container">
            <Button onClick={() => this.saveRequirements()} className="form-button" id="upload-button" variant="contained" color="secondary">
              Save requirements
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
