import React from 'react';
import FileDial from '../../tools/FileDial';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import StarRateIcon from '@material-ui/icons/StarRate';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
            <div className="item-instruction-column">
              <p className="instruction-title">{`${this.props.language.title}: ${this.props.item.attributes.pdf.name}`}</p>
            </div>
            <div className="pdf-item">
              <FileDial
                type={this.props.item.type}
                color={'primary'}
                actions={this.state.actions}
                icon={<PictureAsPdfIcon/>}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
