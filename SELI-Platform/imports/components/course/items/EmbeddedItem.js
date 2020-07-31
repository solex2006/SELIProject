import React from 'react';
import Iframe from 'react-iframe'

export default class EmbeddedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="content-box">
        <div style={{flexDirection: this.props.item.attributes.alignment}} className="embedded-content-item">
          {/* {
            this.props.item.attributes.description ?
              <div
                className="embedded-description-item-section"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
              >
              </div>
            :
            undefined
          } */}
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
      </div>
      );
    }
  }
