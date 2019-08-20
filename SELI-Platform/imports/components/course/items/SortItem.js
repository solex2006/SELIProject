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
              <p className="sort-item-text">{this.props.item.type + " item"}</p>
            </div>
          :
          <div className="content-preview-container">
            {
                "Creating " + this.props.item.type + " content"
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
