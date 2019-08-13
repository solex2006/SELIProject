import React from 'react';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  componentDidMount(){
    console.log(this.props);
    if (this.props.item.attributes.type === 'text') {
      document.getElementById(this.props.item.id + "link").innerHTML = this.props.item.attributes.content;
    }
  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'link' ?
                  <div>
                    {
                      this.props.item.attributes.type === 'normal' ?
                        <div style={{textAlign: this.props.item.attributes.alignment}} className="link-item-container">
                          <div className="link-item-section">
                            <Link
                              component="button"
                              color="primary"
                              variant="body2"
                              onClick={() => {
                                window.open(this.props.item.attributes.link,'_blank');;
                              }}
                            >
                              {this.props.item.attributes.link}
                            </Link>
                          </div>
                          <div className="link-description-item-section">
                            {this.props.item.attributes.content}
                          </div>
                        </div>
                      :
                      undefined
                    }
                    {
                      this.props.item.attributes.type === 'text' ?
                        <div id={this.props.item.id + "link"} className="link-item-container-html">

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
          undefined
        }
      </div>
      );
    }
  }
