import React ,{ Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import ResizableContent from './ResizableContent'

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
    file.name = file.name.toString().split('.');
    file.name = file.name[0];
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
    console.log("COORDENADA CURSOS--->", coordenada )
    this.props.coordenadasCursosImageForm(coordenada)
  }
  
  render() {
    console.log("Coordenada R" , this.props)
    if(this.props.type==="course"){
      this.setState({
        type: "course"
      })
    }
    return(
        <div className="file-preview-container">
          <div  id="image-preview-information" className="file-preview-information">
          <Fragment>
            <ResizableContent
              top={22}
              left={200}
              width={200}
              height={200}
              rotateAngle={0}
              //coordenada={this.props.coordenada}
              coordenadaCursos={this.coordenadaCursos}    
            >
              
              <div>
                  <img style={{width: '200px', height: '200px'}} src={this.props.file.link}></img>
              </div>
            </ResizableContent>
          </Fragment>
          {/* <ReactPanZoom  key={Math.random()} image={this.props.file.link} alt="document image"/> */}
            {/* <div style={{backgroundImage: `url(${this.props.file.link})`}} className="file-image-preview"></div> */}
          </div>
          <div className="file-preview-actions">
            <Tooltip title={this.props.language.open} placement="left">
              <IconButton onClick={() => this.open()} color="secondary" aria-label="open">
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={this.props.language.uploadAnother} placement="left">
              <IconButton onClick={() => this.props.unPickFile()} color="secondary" aria-label="another">
                <AutorenewIcon />
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
