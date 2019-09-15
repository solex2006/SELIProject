import React from 'react';
import Divider from '@material-ui/core/Divider';
import Iframe from 'react-iframe';

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
        <div style={{flexDirection: this.props.item.attributes.alignment}} className="embebed-content-item">
          {
            this.props.item.attributes.description ?
              <div
                className="embebed-description-item-section"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.content}}
              >
              </div>
            :
            undefined
          }
          <div className="embebed-item-container-activity">
            <Iframe
              url={this.props.item.attributes.url}
              id={this.props.item.id}
              className="embebed-iframe"
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
