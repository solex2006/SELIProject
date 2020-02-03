import React from 'react';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class SortItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="sort-item">
              <p className="sort-item-index">[{this.props.index + 1}]</p>
              <p className="sort-item-text">{this.props.language[this.props.item.type]}</p>
            </div>
          :
          <div className="content-preview-container">
            {
              `${this.props.language.creating}: ${this.props.language[this.props.item.type]}`
            }
            <div className="linear-creating-container">
              <LinearProgress valueBuffer={95} color="secondary" />
            </div>
          </div>
        }
      </div>
      );
    }
  }
