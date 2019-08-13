import React from 'react';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Iframe from 'react-iframe'

export default class H5PItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  componentDidMount(){

  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'h5p' ?
                  <div>
                    <div className="h5P-item-container">
                      <p className="h5p-instruction-title">Instructions:</p>
                      <div className="h5P-item-container-instruction">
                        {this.props.item.attributes.instruction}
                      </div>
                      <Divider light={true}/>
                      <div className="h5P-item-container-activity">
                        <Iframe
                          url={this.props.item.attributes.link}
                          id="myId"
                          className="h5p-iframe"
                          display="initial"
                          position="relative"
                          width={this.props.item.attributes.size.width}
                          height={this.props.item.attributes.size.height}
                        />
                      </div>
                    </div>
                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
      </div>
      );
    }
  }
