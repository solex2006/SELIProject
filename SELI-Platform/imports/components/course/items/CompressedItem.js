import React from 'react';
import FileDial from '../../tools/FileDial';
import StarRateIcon from '@material-ui/icons/StarRate';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArchiveIcon from '@material-ui/icons/Archive';
import MenuItem from './MenuItem';
import DragItem from './DragItem'
import Divider from '@material-ui/core/Divider';
export default class CompressedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: <CloudDownloadIcon />, name: this.props.language.download },
        { icon: <StarRateIcon />, name: this.props.language.addToMyLibrary },
      ],
    }
  }

  render() {
    return(
      <div className="content-box">
        <div className="file-content-item">
          <div className="pdf-item-container">
            <div className="pdf-item">
              <FileDial
                type={this.props.item.type}
                color={'secondary'}
                actions={this.state.actions}
                icon={<ArchiveIcon/>}
              />
            </div>
            <div className="item-instruction-column">
              <p className="instruction-title">{this.props.language.instructions}</p>
              <div
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
            editItem={this.props.editItem.bind(this)}
            language={this.props.language}
          />
        </div>
      </div>
    );
  }
}
