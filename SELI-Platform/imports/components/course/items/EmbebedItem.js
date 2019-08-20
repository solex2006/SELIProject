import React from 'react';
import Divider from '@material-ui/core/Divider';
import MenuItem from './MenuItem';
import Iframe from 'react-iframe'

export default class EmbebedItem extends React.Component {
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
            <div className="embebed-content-item">
              <div style={{textAlign: this.props.item.attributes.alignment}} className="embebed-item-container">
                <div className="embebed-description-item-section">
                  {this.props.item.attributes.content}
                </div>
              </div>
              <div className="embebed-item-container-activity">
                <Iframe
                  url={this.props.item.attributes.url}
                  id="myId"
                  className="embebed-iframe"
                  display="initial"
                  position="relative"
                  width={this.props.item.attributes.size.width}
                  height={this.props.item.attributes.size.height}
                />
              </div>
            </div>
          :
          undefined
        }
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
