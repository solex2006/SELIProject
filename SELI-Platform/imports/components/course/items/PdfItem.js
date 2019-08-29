import React from 'react';
import FileDial from '../../tools/FileDial';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import StarRateIcon from '@material-ui/icons/StarRate';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import MenuItem from './MenuItem';

export default class PdfItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: <CloudDownloadIcon />, name: 'Download' },
        { icon: <OpenInNewIcon />, name: 'Read new tab' },
        { icon: <ChromeReaderModeIcon />, name: 'Read here' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <StarRateIcon />, name: 'Add to my library' },
      ],
    }
  }

  render() {
    return(
      <div className="content-box">
        <div className="file-content-item">
          <div id={this.props.item.attributes.pdf.id+"container"+this.props.item.id} className="pdf-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
            <div id={ this.props.item.attributes.pdf.id+this.props.item.id } className="pdf-item">
              <FileDial
                type={this.props.item.type}
                color={'primary'}
                actions={this.state.actions}
                icon={<PictureAsPdfIcon/>}
              />
            </div>
            <div className="item-instruction-column">
              <p className="instruction-title">Instructions:</p>
              <div
                id={this.props.item.attributes.pdf.id + "instruction" + this.props.item.id}
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
