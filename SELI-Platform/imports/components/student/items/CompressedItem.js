import React from 'react';
import FileDial from '../../tools/FileDial';
import StarRateIcon from '@material-ui/icons/StarRate';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArchiveIcon from '@material-ui/icons/Archive';
import StudentEventType from '../../../../lib/StudentEventType';

export default class CompressedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: <CloudDownloadIcon />, name: this.props.language.download, action: () => this.download() },
        //{ icon: <StarRateIcon />, name: this.props.language.addToMyLibrary, action: () => this.addToFavorites() },
      ],
    }
  }

  addToFavorites = () => {
    console.log('yes');
  }

  download = () => {
    if(this.props.logStudentInteraction !== undefined){
      this.props.logStudentInteraction(StudentEventType.itemType.compressed
        , StudentEventType.actionType.download);
    }
    var win = window.open(this.props.item.attributes.compressed.link, '_blank');
    win.focus();
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
              <p className="instruction-title">{this.props.language.instructions}</p>
              <div
                id={this.props.item.attributes.compressed.id + "instruction" + this.props.item.id}
                className="pdf-item-instruction"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
