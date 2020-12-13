import React from 'react';
import FileDial from '../../tools/FileDial';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ItemFeedback from '../../accessibility/ItemFeedback';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
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
      iframeFullUrl: "",
      openReadDialog: false,
      iframeFeOpen: false,
      actions: [
        { icon: <CloudDownloadIcon />, name: this.props.language.download, action: () => this.download()},
        { icon: <OpenInNewIcon />, name: this.props.language.readNewTab, action: () => this.openNewTab()},
        { icon: <ChromeReaderModeIcon />, name: this.props.language.readHere, action: () => this.read()},
        { icon: <PrintIcon />, name: this.props.language.print, action: () => this.printPdf()},
        //{ icon: <StarRateIcon />, name: this.props.language.addToMyLibrary},
      ],
    }
  }

  componentDidMount(){
      this.setIframeFullUrl();
  }

   setIframeFullUrl = () =>{
    let end_point = 'http://fd.worldpixelmarket.com/books/reading/iframe';
    var filename = this.props.item.attributes.pdf.link.substring(this.props.item.attributes.pdf.link.lastIndexOf('/')+1);
    let user_id =  Meteor.userId();
    let pdf_title =  this.props.item.attributes.pdf.name || filename;
    let pdf_url = this.props.item.attributes.pdf.link;
    let full_url = end_point+"?"+"user_id="+user_id+"&pdf_title="+pdf_title+"&pdf_url="+pdf_url;
    var full_url_encode = new URL(full_url);
    this.state.iframeFullUrl = full_url_encode;
  }

 handleReadOption = () => {
    this.setState({ openReadDialog: true });
   };

  handleIframeFeClose = () => {
    this.setState({ iframeFeOpen: false });
  };
  handleDialogClose = () => {
    this.setState({ openReadDialog: false });
  };
  handleReadWithExpression = () =>{ 
      this.setState({ iframeFeOpen: true });
  };

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
            <div className="item-instruction-column">
              <p id={`dial-title-${this.props.item.id}`} tabIndex="0" className="instruction-title">{`${this.props.language.title}: ${this.props.item.attributes.pdf.name}`}</p>
            </div>
            <div id={ this.props.item.attributes.pdf.id+this.props.item.id } className="pdf-item">
              <FileDial
                id={this.props.item.id}
                type={this.props.item.type}
                color={'primary'}
                actions={this.state.actions}
                labels={{
                  ariaLabel: this.props.language.pdf,
                  closeLabel: this.props.language.close,
                  navigationLabel: this.props.language.speedDialNavigation 
                }}
                icon={<PictureAsPdfIcon/>}
              />
            </div>
          </div>
        </div>
        {this.props.fromProgram && 
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
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

        <Dialog
        open={this.state.openReadDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleDialogClose}
        aria-labelledby="alert-dialog-read-title"
        aria-describedby="alert-dialog-slide-description"
        className="read-dialog-container"
        disableBackdropClick={true}
      >
      <DialogTitle id="alert-dialog-read-title" className="success-dialog-title" >Read With Expression</DialogTitle>
        <Divider/>
        <DialogContent className="read-dialog-content">
          <div className="read-dialog-form">
          
   <DialogActions className="read-actions">
      <Button onClick={() => this.read()} color="primary" variant="outlined">
        Simple Read
      </Button>
      <Button onClick={() => this.handleReadWithExpression()} color="primary" variant="outlined">
        Read With Face Expression
      </Button>
    </DialogActions>

          </div>
        </DialogContent>
        <Divider light={true}/>
      </Dialog>


      <Dialog
          open={this.state.iframeFeOpen}
          onClose={this.handleIframeFeClose}
          TransitionComponent={Transition}
          fullScreen
          aria-labelledby="alert-dialog-confirmation"
          aria-describedby="alert-dialog-confirmation"
          disableBackdropClick={true}
          className="media-dialog"
        >
          <AppBar2 position="static" className="course-dialog-app-bar">
            <Toolbar style={{position: 'relative'}}>
              <IconButton edge="start" color="inherit" onClick={this.handleIframeFeClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="course-dialog-title" variant="h6">
                {this.props.language.seliPdfReader}
              </Typography>
              <p className="app-tooltip">{this.props.language.pressEscCourse}</p>
            </Toolbar>
          </AppBar2>
          <DialogContent className="media-dialog-content">
            <div className="pdf-dialog-content">

 <iframe id="myIframe" src={this.state.iframeFullUrl} frameBorder="0" marginHeight="0" marginWidth="0" scrolling="Yes" width="100%" height="100%" >
    Your browser doesn't support iframes
</iframe>

    </div>
          </DialogContent>
        </Dialog>



      </div>
      );
    }
  }
