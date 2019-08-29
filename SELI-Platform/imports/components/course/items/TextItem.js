import React from 'react';
import MenuItem from './MenuItem';
import Divider from '@material-ui/core/Divider';

export default class TextItem extends React.Component {
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
        <div className="text-content-item">
          {
            this.props.item.attributes.type === 'title' ?
              <h2 className="text-item-title" style={{textAlign: this.props.item.attributes.alignment}}>
                {this.props.item.attributes.content}
              </h2>
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'section' ?
              <div dangerouslySetInnerHTML={{__html: this.props.item.attributes.content}} id={this.props.item.id + "section"} className="text-item-section">

              </div>
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'subtitle' ?
              <h3 className="text-item-subtitle" style={{textAlign: this.props.item.attributes.alignment}}>
                {this.props.item.attributes.content}
              </h3>
            :
            undefined
          }
        </div>
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
