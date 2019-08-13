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
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'pdf' ?
                  <div>
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
                        <div id={this.props.item.attributes.pdf.id+"instruction"+this.props.item.id} className="pdf-item-instruction">
                          {this.props.item.attributes.instruction}
                        </div>
                      </div>
                    </div>

                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
      </div>
    );
  }
}
