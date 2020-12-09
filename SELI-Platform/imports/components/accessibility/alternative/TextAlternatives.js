import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Editor, EditorState, convertFromRaw } from "draft-js";

export default class TextAlternatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }
 
  
  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  setExpanded = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    return(
      <div tabIndex="0" className="text-alt-container" style={this.props.fromMediaPlayer && {color: "white"}}>
        {
          this.props.item.type === "audio" || this.props.item.type === "video"?
            <Grid container spacing={1}>
              <Grid item xs={12}>
              {
                this.props.item.attributes.accessibility.dataField &&
                <React.Fragment>
                  <h2 tabIndex="0" className="description">{this.props.language.shortDescription_a11y_label}</h2>
                  <div tabIndex="0" id={`${this.props.item.type === "audio" ? "audio" : "video"}_${this.props.item.id}_shortDescr`}>
                    {
                      this.props.item.attributes.accessibility.dataField.shortDescription!="" ? 
                      this.props.item.attributes.accessibility.dataField.shortDescription :
                      this.props.item.attributes.title
                    }
                  </div>
                </React.Fragment>
              }
              </Grid>
              <Grid item xs={12}>
                {
                  this.props.item.attributes.accessibility.dataField===undefined?
                    undefined
                  :
                    <React.Fragment>
                      {
                        this.props.item.attributes.accessibility.dataField.longDescription.blocks[0].text!="" ?
                          this.props.item.type === "audio" ?
                            <details>
                              <summary
                                aria-controls={"audio_" + this.props.item.id + "_transcriptBox"}
                                aria-expanded={this.state.expanded}
                                id={"audio_" + this.props.item.id + "_transcriptBox_showhide"}
                                onClick={() => this.setExpanded()}
                              >
                                <h2 className="audio-transcription">{!this.state.expanded ? this.props.language.showTranscription : this.props.language.hideTranscription}</h2> 
                              </summary>
                              <div
                                tabIndex="0"
                                id={"audio_" + this.props.item.id + "_transcriptBox"}
                                aria-expanded={this.state.expanded}
                                className="show-hide-transcription"
                              >
                                <div tabIndex="0" id={"audio_" + this.props.item.id + "_transcriptText"}>
                                  <Editor
                                    editorState={this.signalText()} 
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </details>
                          :
                            <React.Fragment>
                              <h2 className="description">{this.props.language.longDescription_a11y_label}</h2>
                              <div tabIndex="0" id={"video_" + this.props.item.id + "_longDescr"}>
                                <figcaption>
                                  <Editor editorState={this.signalText()} readOnly={true} />
                                </figcaption>
                              </div>
                            </React.Fragment>
                        :
                          <div>{this.props.language.NolongDescription}</div>
                      }  
                    </React.Fragment>
                }
              </Grid>
            </Grid>
          :
            this.props.item.attributes.accessibility && this.props.item.attributes.accessibility.dataField &&
            <Grid container spacing={3}>
              <Grid item xs={12}>       
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='info'?
                  <React.Fragment> 
                    <h2 tabIndex="0" className="description">{this.props.language.image_a11y_purpose_informative_label}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </React.Fragment>
                :
                  undefined
              }
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='deco'?
                  <h2>{this.props.language.image_a11y_purpose_decorative_label}</h2>
                :
                  undefined
              }
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='txt'?
                  <React.Fragment> 
                    <h2 tabIndex="0" className="description">{this.props.language.image_a11y_purpose_text}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </React.Fragment>
                :
                  undefined
              }
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='cplx' ?
                  <React.Fragment> 
                    <h2 tabIndex="0" className="description">{this.props.language.image_a11y_purpose_complex}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                    <figcaption tabIndex="0">
                      <Editor editorState={this.signalText()} readOnly={true}/>
                    </figcaption>
                  </React.Fragment>
                :
                  undefined
              }
              </Grid>
            </Grid>
        }
      </div>
    );
  }
}
