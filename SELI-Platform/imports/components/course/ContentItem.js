import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class ContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div>
              {
                this.props.item.type === 'text' ?
                  <div>
                    {
                      this.props.item.attributes.type === 'title' ?
                        <div className="text-title" style={{textAlign: this.props.item.attributes.alignment}}>
                          <Divider light={true}/>
                          {this.props.item.attributes.content}
                          <Divider light={true}/>
                        </div>
                      :
                      undefined
                    }
                    {
                      this.props.item.attributes.type === 'subtitle' ?
                        <div className="text-subtitle" style={{textAlign: this.props.item.attributes.alignment}}>
                          {this.props.item.attributes.content}
                        </div>
                      :
                      undefined
                    }
                    {
                      this.props.item.attributes.type === 'section' ?
                        <div className="text-section" style={{textAlign: this.props.item.attributes.alignment}}>
                          {this.props.item.attributes.content}
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }
            </div>
          :
          this.props.item.type
        }
      </div>
    );
  }
}
