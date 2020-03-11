import React from 'react';
import Divider from '@material-ui/core/Divider';
import Code  from '../../tools/Code';
import Speech from 'react-speech';

export default class TextItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

 /*  handlespeech=()=>{
    return(
      <div>
      <Speech 
        text="hola ozgureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" 
        stop={true}
        pause={true}
        resume={true}
        lang="en-GB"
    
      />
  </div>
    )
  } */
  render() {
    return(
      <div className="content-box">
        
        
        <div className="text-content-item">
          {
            this.props.item.attributes.type === 'title' ?
              <h2 className="text-item-title" style={{textAlign: this.props.item.attributes.alignment, fontSize: this.props.item.attributes.size}}>
                {this.props.item.attributes.content}
              </h2>
            :
            undefined
          }
      
          {
            this.props.item.attributes.type === 'section' ?
            <div>
              {/* <Button onClick={this.handlespeech} color="primary">
                Done
              </Button> */}
              <div dangerouslySetInnerHTML={{__html: this.props.item.attributes.content}} id={this.props.item.id + "section"} className="text-item-section">
              </div>
            </div>
              
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'code' ?
              <Code
                theme={this.props.item.attributes.theme}
                language={this.props.item.attributes.language}
                code={this.props.item.attributes.content}
              />
            :
            undefined
          }
        </div>
      </div>
      );
    }
  }
