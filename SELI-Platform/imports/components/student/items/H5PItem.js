import React from 'react';
import Divider from '@material-ui/core/Divider';
import IframeComm from "react-iframe-comm";
import Loading from '../../tools/Loading';

export default class H5PItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      attributes: {
        src: this.props.item.attributes.link,
        width: this.props.item.attributes.size.width,
        height: this.props.item.attributes.size.height,
        frameBorder: 0,
      }
    }
  }

  onReady = () => {
    this.setState({
      loading: false,
    })
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
                    <IframeComm
                      attributes={this.state.attributes}
                      handleReady={() => this.onReady()}
                    />
                    {
                      this.state.loading ?
                        <div className="embebed-loading-container">
                          <Loading message="Loading h5p content..."/>
                        </div>
                      :
                      undefined
                    }
                  </div>
                </div>
              </div>
            </div>
          :
          undefined
        }
      </div>
      );
    }
  }
