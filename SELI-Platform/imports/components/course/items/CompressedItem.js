import React from 'react';
import FileDial from '../../tools/FileDial';
import StarRateIcon from '@material-ui/icons/StarRate';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArchiveIcon from '@material-ui/icons/Archive';
import MenuItem from './MenuItem';

export default class CompressedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: <CloudDownloadIcon />, name: 'Download' },
        { icon: <StarRateIcon />, name: 'Add to my library' },
      ],
    }
  }

  render() {
    return(
      <div className="content-box">
        <div className="file-content-item">
          <div id={this.props.item.attributes.compressed.id+"container"+this.props.item.id} className="pdf-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
            <div id={ this.props.item.attributes.compressed.id+this.props.item.id } className="pdf-item">
              <FileDial
                type={this.props.item.type}
                color={'secondary'}
                actions={this.state.actions}
                icon={<ArchiveIcon/>}
              />
            </div>
            <div className="item-instruction-column">
              <p className="instruction-title">Instructions:</p>
              <div
                id={this.props.item.attributes.compressed.id + "instruction" + this.props.item.id}
                className="pdf-item-instruction"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}
              >
              </div>
            </div>
          </div>
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
