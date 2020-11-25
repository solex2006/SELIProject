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
        { icon: <CloudDownloadIcon />, name: this.props.language.download, action: () => this.download() },
        //{ icon: <StarRateIcon />, name: this.props.language.addToMyLibrary },
      ],
    }
  }

  download = () => {
    var win = window.open(this.props.item.attributes.compressed.link, '_blank');
    win.focus();
  }

  render() {
    return(
      <div className="content-box">
        <div className="file-content-item">
        <div id={this.props.item.attributes.compressed.id+"container"+this.props.item.id} className="pdf-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
            <div className="item-instruction-column">
              <p id={`dial-title-${this.props.item.id}`} tabIndex="0"  className="instruction-title">{`${this.props.language.title}: ${this.props.item.attributes.compressed.name}`}</p>
            </div>
            <div id={ this.props.item.attributes.compressed.id+this.props.item.id } className="pdf-item">
              <FileDial
                id={this.props.item.id}
                type={this.props.item.type}
                color={'secondary'}
                actions={this.state.actions}
                labels={{
                  ariaLabel: this.props.language.compressed,
                  closeLabel: this.props.language.close,
                  navigationLabel: this.props.language.speedDialNavigation 
                }}
                icon={<ArchiveIcon/>}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
