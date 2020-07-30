import React from 'react';
import FileDial from '../../tools/FileDial';
import StarRateIcon from '@material-ui/icons/StarRate';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArchiveIcon from '@material-ui/icons/Archive';

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
            <div className="item-instruction-column">
              <p className="instruction-title">{`${this.props.language.title}: ${this.props.item.attributes.compressed.name}`}</p>
            </div>
            <div className="pdf-item">
              <FileDial
                type={this.props.item.type}
                color={'secondary'}
                actions={this.state.actions}
                icon={<ArchiveIcon/>}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
