import React from 'react';
import Divider from '@material-ui/core/Divider';
import MenuItem from './MenuItem';
import Link from '@material-ui/core/Link';

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  componentDidMount(){
    if (this.props.item.attributes.type === 'text') {
      document.getElementById(this.props.item.id + "link").innerHTML = this.props.item.attributes.content;
    }
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="link-content-item">
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
                        className="link-item-url"
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
