import React from 'react';
import ContentPicker from './ContentPicker';
import TextAndImageForm from './TextAndImageForm';
import VideoForm from './VideoForm';
import H5PForm from './H5PForm';
import AnimationForm from './AnimationForm';
import FileForm from './FileForm';
import EmbedForm from './EmbedForm';

export default class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Picker',
    }
  }

  showContentForm(content){
    this.setState({
      content: content,
    })
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">Course editor</div>

          {
            this.state.content === 'Picker' ?
              <div>
                <div className="form-subtitle">Content type</div>
                <ContentPicker
                  showContentForm={this.showContentForm.bind(this)}
                />
              </div>
            :
              undefined
          }
          {
            this.state.content === 'TextAndImage' ?
              <TextAndImageForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
          {
            this.state.content === 'Video' ?
              <VideoForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
          {
            this.state.content === 'H5P' ?
              <H5PForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
          {
            this.state.content === 'Animation' ?
              <AnimationForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
          {
            this.state.content === 'Files' ?
              <FileForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
          {
            this.state.content === 'Embed' ?
              <EmbedForm
                showForm={this.props.showForm.bind(this)}
                addContent={this.props.addContent.bind(this)}
                courseKey={this.props.courseKey}
                showControlMessage={this.props.showControlMessage.bind(this)}
                showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
              />
            :
              undefined
          }
        </div>
      </div>
    );
  }
}
