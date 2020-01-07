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
        { icon: <CloudDownloadIcon />, name: this.props.language.download },
        { icon: <OpenInNewIcon />, name: this.props.language.readNewTab },
        { icon: <ChromeReaderModeIcon />, name: this.props.language.readHere },
        { icon: <PrintIcon />, name: this.props.language.print },
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
                color={'primary'}
                actions={this.state.actions}
                icon={<PictureAsPdfIcon/>}
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
