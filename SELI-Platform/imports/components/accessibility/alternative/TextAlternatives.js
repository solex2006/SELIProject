import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Editor, EditorState, convertFromRaw } from "draft-js";

export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  render() {
    return(
      <div className="text-alt-container" style={this.props.fromMediaPlayer && {color: "white"}}>
        {
          this.props.item.type === "audio" || this.props.item.type === "video"?
            <Grid container spacing={1}>
              <Grid item xs={12}>
              {
                  this.props.item.attributes.accessibility.dataField===undefined?
                  undefined
                  :
                <div> 
                  {
                    this.props.item.attributes.accessibility.dataField.shortDescription!="" ?
                    <div>
                      <h2 className="description">{this.props.language.shortDescription_a11y_label}</h2>
                      {this.props.item.attributes.accessibility.dataField.shortDescription}
                    </div>
                    :
                    <div>{this.props.language.NoshortDescription}</div>
                  }  
                  </div>
              }
              </Grid>
              <Grid item xs={12}>
                {
                  this.props.item.attributes.accessibility.dataField===undefined?
                  undefined
                  :
                <div> 
                  {
                    this.props.item.attributes.accessibility.dataField.longDescription.blocks[0].text!="" ?
                      <div>
                        <h2 className="description">{this.props.language.longDescription_a11y_label}</h2> 
                        <Editor editorState={this.signalText()} readOnly={true} />
                      </div>
                    :
                    <div>{this.props.language.NolongDescription}</div>
                  }  
                  </div>
                }
              </Grid>
            </Grid>
          :
            <Grid container spacing={3}>
              <Grid item xs={12}>       
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='info'?
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_informative_label}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </div>
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
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_text}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                  </div>
                :
                  undefined
              }
              {
                this.props.item.attributes.accessibility.dataField.imagePurpose==='cplx' ?
                  <div> 
                    <h2 className="description">{this.props.language.image_a11y_purpose_complex}</h2>
                    {this.props.item.attributes.accessibility.dataField.shortDescription}
                    <Editor editorState={this.signalText()} readOnly={true}/>
                  </div>
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
