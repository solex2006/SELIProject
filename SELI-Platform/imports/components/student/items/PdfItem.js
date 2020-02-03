import React from 'react';
import FileDial from '../../tools/FileDial';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import StarRateIcon from '@material-ui/icons/StarRate';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class PdfItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        { icon: <CloudDownloadIcon />, name: this.props.language.download, action: () => this.download()},
        { icon: <OpenInNewIcon />, name: this.props.language.readNewTab, action: () => this.openNewTab()},
        { icon: <ChromeReaderModeIcon />, name: this.props.language.readHere, action: () => this.read()},
        { icon: <PrintIcon />, name: this.props.language.print, action: () => this.printPdf()},
        { icon: <StarRateIcon />, name: this.props.language.addToMyLibrary},
      ],
    }
  }

  printPdf = () => {
    var iframe = document.createElement('iframe');
    // iframe.id = 'pdfIframe'
    iframe.className='pdfIframe'
    document.body.appendChild(iframe);
    iframe.style.display = 'none';
    iframe.onload = function () {
      setTimeout(function () {
        iframe.focus();
        iframe.contentWindow.print();
        URL.revokeObjectURL(this.props.item.attributes.pdf.link)
        // document.body.removeChild(iframe)
      }, 1);
    };
    iframe.src = this.props.item.attributes.pdf.link;
    // URL.revokeObjectURL(url)
  }

  download = () => {
    // for non-IE
    if (!window.ActiveXObject) {
      var save = document.createElement('a');
      save.href = this.props.item.attributes.pdf.link;
      save.target = '_blank';
      var filename = this.props.item.attributes.pdf.link.substring(this.props.item.attributes.pdf.link.lastIndexOf('/')+1);
      save.download = this.props.item.attributes.pdf.name || filename;
      if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
        document.location = save.href;
        // window event not working here
      }else{
            var evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(this.props.item.attributes.pdf.link, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, this.props.item.attributes.pdf.name || this.props.item.attributes.pdf.link)
        _window.close();
    }
  }

  openNewTab = () => {
    var win = window.open(this.props.item.attributes.pdf.link, '_blank');
    win.focus();
  }

  read = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
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
              <p className="instruction-title">{this.props.language.instructions}</p>
              <div
                id={this.props.item.attributes.pdf.id + "instruction" + this.props.item.id}
                className="pdf-item-instruction"
                dangerouslySetInnerHTML={{__html: this.props.item.attributes.instruction}}
              >
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
          className="media-dialog"
        >
          <AppBar position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                {this.props.language.seliPdfReader}
              </Typography>
              <p className="app-tooltip">{this.props.language.pressEscCourse}</p>
            </Toolbar>
          </AppBar>
          <DialogContent className="media-dialog-content">
            <div className="pdf-dialog-content">
              <object className="pdf-reader" data={this.props.item.attributes.pdf.link} type="application/pdf" width="100%" height="100%"></object>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      );
    }
  }
