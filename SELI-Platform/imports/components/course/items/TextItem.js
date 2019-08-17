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
              <h2 style={{textAlign: this.props.item.attributes.alignment}}>
                  {this.props.item.attributes.content}
              </h2>
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'section' ?
              <p  style={{textAlign: this.props.item.attributes.alignment}}>
                {this.props.item.attributes.content}
              </p>
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'subtitle' ?
              <h3 style={{textAlign: this.props.item.attributes.alignment}}>
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
