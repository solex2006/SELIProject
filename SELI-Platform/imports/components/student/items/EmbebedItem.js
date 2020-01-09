import React from 'react';
import Divider from '@material-ui/core/Divider';
import IframeComm from "react-iframe-comm";
import Loading from '../../tools/Loading';

export default class EmbebedItem extends React.Component {
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
        <div style={{flexDirection: this.props.item.attributes.alignment}} className="embebed-content-item">
          {
            this.props.item.attributes.description ?
              <div
                className="embebed-description-item-section"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.description}}
              >
              </div>
            :
            undefined
          }
          <div className="embebed-item-container-activity">
            <IframeComm
              attributes={this.state.attributes}
              handleReady={() => this.onReady()}
            />
            {
              this.state.loading ?
                <div className="embebed-loading-container">
                  <Loading message={this.props.loadingEmbebed}/>
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
