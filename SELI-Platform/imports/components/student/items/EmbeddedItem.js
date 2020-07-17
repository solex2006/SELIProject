import React from 'react';
import Divider from '@material-ui/core/Divider';
import IframeComm from "react-iframe-comm";
import Loading from '../../tools/Loading';

export default class EmbeddedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      attributes: {
        src: this.props.item.attributes.url,
        width: this.props.item.attributes.size.width,
        height: this.props.item.attributes.size.height,
        frameBorder: 0,
      }
    }
  }

  componentDidMount(){

  }

  onReady = () => {
    this.setState({
      loading: false,
    })
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
            <IframeComm
              attributes={this.state.attributes}
              handleReady={() => this.onReady()}
            />
            {
              this.state.loading ?
                <div className="embedded-loading-container">
                  <Loading message={this.props.loadingEmbedded}/>
                </div>
              :
              undefined
            }
          </div>
        </div>
      </div>
      );
    }
  }
