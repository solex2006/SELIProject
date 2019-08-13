import React from 'react';
import FileDial from '../../tools/FileDial';
import StarRateIcon from '@material-ui/icons/StarRate';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArchiveIcon from '@material-ui/icons/Archive';

export default class PdfItem extends React.Component {
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
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'compressed' ?
                  <div>
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
                        <div id={this.props.item.attributes.compressed.id+"instruction"+this.props.item.id} className="pdf-item-instruction">
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
