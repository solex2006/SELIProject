import React from 'react';
import ResizableContent from './ResizableContent'
import CheckboxLabels from './CheckBox'
import Grid from '@material-ui/core/Grid';
import { Editor, EditorState, convertFromRaw } from "draft-js";
export default class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.item.attributes.size.width,
      height: this.props.item.attributes.size.height,
      shortlongDescription:''
    }
  }

  componentDidMount(){
  }

  checkBoxLabels=()=>{
    return(
      <div>
        {
          this.props.item.attributes.accessibility.dataField===undefined?
                   undefined
                   :
                  <div className="checkBoxItem"> 
                      {
                        this.props.item.attributes.accessibility.dataField.imagePurpose!=undefined?
                          <div className="checkboxstyle">
                            <CheckboxLabels
                                language={this.props.language}
                                checkbox={this.checkbox}
                                type="shortLongDescription"
                                label={this.props.language.textAlternatives}
                            />
                          </div>
                          :
                          undefined
                      }
                  </div>
        }
      </div>
    )
  }

  checkbox=(event, name)=>{
    console.log("event and name", event, name)
    if(event===true && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'shortlongDescription',
      })
    }
    else if(event===false && name==='shortLongDescription'){
      this.setState({
        shortlongDescription:'noshortlongDescription'
      })
    }
  }
  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  render() {
   // console.log("DESDEiMAGEITEMDELCURSOESTUDIANTE", this.props.item.attributes.accessibility.dataField)
    return(
      <div className="content-box">
        {this.checkBoxLabels()}
        <div className="image-content-item">
          <div style={{flexDirection: this.props.item.attributes.alignment}} className="image-item-container">
            <div
              id={ this.props.item.attributes.image._id + this.props.item.id }
              className="image-item"
              style={{
                 
                  width: `${this.props.item.attributes.size.width}px`,
                  height: `${this.props.item.attributes.size.height}px`,
              }}
            >
              <ResizableContent
                top={22}
                left={22}
                width={this.props.item.attributes.size.width}
                height={this.props.item.attributes.size.height}
                rotateAngle={this.props.item.attributes.image.coordenada}
              >
              <div>
                  <img style={{width: `${this.props.item.attributes.size.width}px`,height: `${this.props.item.attributes.size.height}px`}} src={this.props.item.attributes.image.link}></img>
              </div>
            </ResizableContent>
            </div>
            {
              this.props.item.attributes.hasDescription ?
                <div
                  id={this.props.item.attributes.image._id+"description"+this.props.item.id}
                  style={{width: this.props.item.attributes.descriptionWidth}}
                  className={
                    this.props.item.attributes.alignment === "row" || this.props.item.attributes.alignment === "row-reverse" ?
                      "image-item-description"
                    :
                    "image-item-description-full"
                  }
                  dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
                >
                </div>
              :
                undefined
            }

            {//For text Alternatives
                this.state.shortlongDescription==='shortlongDescription'?
                <Grid container spacing={3}>
                  <Grid item xs={6}>       
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
                      this.props.item.attributes.accessibility.dataField.imagePurpose==='cplx'?
                      <div> 
                        <h2 className="description">{this.props.language.image_a11y_purpose_complex}</h2>
                        {this.props.item.attributes.accessibility.dataField.shortDescription}
                        <Editor editorState={this.signalText()} readOnly={true}/>
                      </div>
                      :
                      undefined
                  }
                  </Grid>
                  {/* <Grid item xs={6}>
                   <h2 className="description">{this.props.language.longDescription_a11y_label}</h2> 
                    {
                      this.props.item.attributes.accessibility.dataField===undefined?
                      undefined
                      :
                    <div> 
                      {
                        this.props.item.attributes.accessibility.dataField!=undefined ?
                        <Editor editorState={this.signalText()} readOnly={true} />
                        :
                        <div>{this.props.language.NolongDescription}</div>
                      }  
                      </div>
                    }
                  </Grid> */}
                </Grid>
                :
                undefined
            } 


          </div>
        </div>
      </div>
      );
    }
  }
