import React ,{ Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import ResizableContent from './ResizableContent'
import { IoIosReturnLeft } from 'react-icons/io';

export default class ImagePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        type:''
    }
  }
  componentDidMount(){
    let file = this.props.file;
    this.setState({
      nameWithoutExtension: true,
    });
    //file.name = file.name.toString().split('.');
    //file.name = file.name[0];
  }

  delete(){
    Meteor.call("RemoveCourseFile", this.props.file._id, function (err) {
      if (err) {

      }
    });
    this.props.unPickFile();
  }

  open(){
    var win = window.open(this.props.file.link, '_blank');
    win.focus();
  }

  coordenadaCursos=(coordenada)=>{
    //console.log("COORDENADA CURSOS--->", coordenada )
    this.props.coordenadasCursosImageForm(coordenada)
  }
  
content =()=>{
  if(this.props.tipo==="Course"){
    return(
      <div className="storytelling-media-image1">
            <div style={{backgroundImage: `url(${this.props.file.link})`}} className="file-image-preview"></div>  
      </div>
    )
  }else {
    return(
      <Fragment>
        <ResizableContent
          //top={185}
         // left={200}
          width={200}
          height={200}
          rotateAngle={0}
          //coordenada={this.props.coordenada}
          coordenadaCursos={this.coordenadaCursos}    
        > 
          <div style={{backgroundImage: `url(${this.props.file.link})`, backgroundColor: "black"}} className="file-image-preview"></div>  
        </ResizableContent>
      </Fragment>
    )
  }
}

  render() {
    return(
        <div className="file-preview-container">
          <div  id="image-preview-information" className="file-preview-information">
          {this.content()}
          </div>
          <div className="file-preview-actions">
            <Tooltip title={this.props.language.open} placement="left">
              <IconButton onClick={() => this.open()} color="secondary" aria-label="open">
                <img src="openNew.svg"/>
              </IconButton>
            </Tooltip>
            <Tooltip title={this.props.language.uploadAnother} placement="left">
              <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={this.props.language.delete} placement="left">
              <IconButton onClick={() => this.delete()} color="secondary" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      );
    }
  }
