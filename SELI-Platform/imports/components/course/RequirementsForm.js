import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TransferList from '../inputs/TransferList';

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  saveRequirements() {
    this.props.saveRequirements();
    this.props.showForm('UnitsEditor', true);
  }

  setItems(picked, type, action){
    let items;
    let added;
    if(type === 'knowledge'){
      added = this.props.addedKnowledgeItems;
      items = this.props.knowledgeItems;
    }
    if(type === 'technical'){
      added = this.props.addedTechnilcaItems;
      items = this.props.technilcaItems;
    }
    if(type === 'people'){
      added = this.props.addedPeopleItems;
      items = this.props.peopleItems;
    }
    for (var i = 0; i < picked.length; i++) {
      if(action === 'remove'){
        this.filterArray(picked[i], added);
        items.push(picked[i]);
      }
      if(action === 'add'){
        added.push(picked[i]);
        this.filterArray(picked[i], items);
      }
    }
  }

  setAll(type, action) {
    let items;
    let added;
    if(type === 'knowledge'){
      added = this.props.addedKnowledgeItems;
      items = this.props.knowledgeItems;
    }
    if(type === 'technical'){
      added = this.props.addedTechnilcaItems;
      items = this.props.technilcaItems;
    }
    if(type === 'people'){
      added = this.props.addedPeopleItems;
      items = this.props.peopleItems;
    }
    if(action === 'add'){
      for (var i = 0; i < items.length; i++) {
        added.push(items[i]);
      }
      items.splice(0);
    }
    if(action === 'remove'){
      for (var i = 0; i < added.length; i++) {
        items.push(added[i]);
      }
      added.splice(0);
    }
  }

  filterArray(filterItem, filterList){
    let removeIndex = filterList.indexOf(filterItem);
    filterList.splice(removeIndex, 1);
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
                items={this.props.knowledgeItems}
                added={this.props.addedKnowledgeItems}
                type="knowledge"
                setItems={this.setItems.bind(this)}
                setAll={this.setAll.bind(this)}
              />
            </div>
          </div>
          <div className="input-list-container">
            <p className="list-input-label">Technical requirements</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.props.technilcaItems}
                added={this.props.addedTechnilcaItems}
                type="technical"
                setItems={this.setItems.bind(this)}
                setAll={this.setAll.bind(this)}
              />
            </div>
          </div>
          <div className="input-list-container">
            <p className="list-input-label">People who should take the course</p>
            <div className="transfer-list-container">
              <TransferList
                items={this.props.peopleItems}
                added={this.props.addedPeopleItems}
                type="people"
                setItems={this.setItems.bind(this)}
                setAll={this.setAll.bind(this)}
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
