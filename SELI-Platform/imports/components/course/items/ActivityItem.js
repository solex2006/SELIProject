import React from 'react';
import MenuItem from './MenuItem';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'activity-panel',
    }
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false
    });
    let item = this.props.item;
    item.attributes.expanded = !item.attributes.expanded;
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="activity-content-item">
              <div>
                <div className="activity-item-container">
                  <div className="activity-container">
                    <ExpansionPanel
                      defaultExpanded
                      expanded={this.props.item.attributes.expanded}
                      onChange={this.handleChange('activity-panel')}
                      className="activity-parent-panel"
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id={this.props.item.id}
                        className="item-quiz-expansion-summary"
                      >
                        <div className="item-quiz-expansion-summary-text-container">
                          <h2 className="activity-panel-title MuiTypography-root activity-panel-title MuiTypography-body1">{this.props.language.activity}</h2>
                          <h3 className="quiz-panel-subtitle MuiTypography-root quiz-panel-subtitle MuiTypography-body1">  
                          <Button className="quiz-panel-subtitle " aria-expanded="true" aria-controls="sect1" id="acc1id"  size="large" >
                            { this.props.item.attributes.type === 'storyboard' ? this.props.language.storyboardActivity : undefined }
                            { this.props.item.attributes.type === 'upload' ? this.props.language.uploaddActivity : undefined } 
                            { this.props.item.attributes.type === 'section' ? this.props.language.textSectionActivity : undefined } 
                            { this.props.item.attributes.type === 'forum' ? this.props.language.forum : undefined }  
                          </Button>
                          </h3>
                        </div>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="item-quiz-detail">
                        <div className="item-quiz-detail-container">
                          <h2 className="activity-instruction-title">{this.props.language.instructions}</h2> 
                          <div
                            className="activity-item-container-instruction"
                            dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}
                          >
                          </div>
                          {
                            this.props.item.attributes.type === 'upload' ?
                              <div className="activity-detail-container">
                                <Typography className="item-quiz-text-detail" variant="overline" display="block" gutterBottom>
                                  {this.props.language.acceptedFileType}
                                </Typography>
                                <Typography className="file-type-text-detail" variant="overline" display="block" gutterBottom>
                                  {this.props.item.attributes.fileTypes.label}
                                </Typography>
                              </div>
                            :
                            undefined
                          }
                        </div>
                      </ExpansionPanelDetails>
                      <Divider />
                    </ExpansionPanel>
                  </div>
                </div>
              </div>
            </div>
          :
          undefined
        }
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            language={this.props.language}
          />
        </div>
      </div>
      );
    }
  }
