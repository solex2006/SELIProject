import React from 'react';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Iframe from 'react-iframe'
import MenuItem from './MenuItem';

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
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="h5p-content-item">
              <div>
                <div className="h5P-item-container">
                  <p className="h5p-instruction-title">Instructions:</p>
                  <div
                    className="h5P-item-container-instruction"
                    dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}
                  >
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
            </div>
          :
          undefined
        }
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
