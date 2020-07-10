import React from 'react';
import MenuItem from './MenuItem';
import Iframe from 'react-iframe'
import DragItem from './DragItem'
import Divider from '@material-ui/core/Divider';
export default class EmbeddedItem extends React.Component {
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
        <div style={{flexDirection: this.props.item.attributes.alignment}} className="embedded-content-item">
          {
            this.props.item.attributes.description ?
              <div
                className="embedded-description-item-section"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
              >
              </div>
            :
            undefined
          }
          <div className="embedded-item-container-activity">
            <Iframe
              url={this.props.item.attributes.url}
              id={this.props.item.id}
              className="embedded-iframe"
              display="initial"
              position="relative"
              width={this.props.item.attributes.size.width}
              height={this.props.item.attributes.size.height}
            />
          </div>
        </div>
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            language={this.props.language}
          />
        </div>
        {
          !this.props.fromTemplate && (
            <React.Fragment>
              <Divider orientation="vertical" />
              <DragItem
                holdanddrag={this.props.language.holdanddrag}
              />
            </React.Fragment>
          )
        }
      </div>
      );
    }
  }
