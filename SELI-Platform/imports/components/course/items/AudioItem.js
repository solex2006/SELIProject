import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ItemFeedback from '../../accessibility/ItemFeedback';
import Link from '@material-ui/core/Link';
import TextAlternatives from '../../accessibility/alternative/TextAlternatives';
//import CheckboxLabels from './CheckBox';

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay:false,
      key:78,
      shortlongDescription:'',
      captions:'nocaptions'
    }
  }

  openExternalLink = () => {
    var win = window.open(this.props.item.attributes.externalLink, '_blank');
    win.focus();
  }

  signalText=()=>{
    const contentState = convertFromRaw(this.props.item.attributes.accessibility.dataField.longDescription);
    const editorState = EditorState.createWithContent(contentState);
    return editorState
  }

  textAlternatives=()=>{
    return(
      <TextAlternatives
        item={this.props.item}
        language={this.props.language}
      ></TextAlternatives>
    )
  }

  audioPlayer=()=>{
    return(
      <Card tabIndex="-1" raised className="course-item-audio-card">
        <div className="course-item-audio-card-details">
          <CardMedia
            className="course-item-audio-card-image"
            image="/audio-gra.svg"
            title="Live from space album cover"
            tabIndex="-1"
          />
          <CardContent tabIndex="-1" className="course-item-audio-card-content">
            <Typography tabIndex="-1" className="course-item-card-subtitle" variant="subtitle1" color="textSecondary">
              {this.props.item.attributes.source === 'upload' ? this.props.language.audioFile : this.props.language.recordedAudio}
            </Typography>
            <Typography tabIndex="0" className="course-item-card-title" gutterBottom variant="h5" component="h2">
              {` ${this.props.item.attributes.title}`}
            </Typography>
          </CardContent>
        </div>
        {
          this.props.item.attributes.audio &&
          <audio
            ref="audioItemPreview" 
            className="course-item-audio-card-controls2"
            id={"audio_" + this.props.item.id}
            aria-describedby={"audio_" + this.props.item.id + "_transcriptText"}
            aria-labelledby={"audio_" + this.props.item.id + "_shortDescr"}
            src={this.props.item.attributes.audio.link}
            controls
          />
        }
        {/* <Tooltip title={this.props.language.addToMyLibrary}>
          <Link className="course-item-audio-card-icon-button" aria-label="add to favorites">
            <FolderSpecialIcon className="course-item-audio-card-icon"/>
          </Link>
        </Tooltip>  */}
        {
          this.props.item.attributes.externalLink !== '' ?
            <Link onClick={() => this.openExternalLink()} className="course-item-video-card-media-button MuiButtonBase-root MuiButton-root MuiButton-text course-item-video-card-media-button MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall" size="small" color="primary">
              {this.props.language.externalLink}
            </Link>
          :
            undefined
        }
      </Card> 
    )
  }

  //Functions for  Transcription
  audioCaption=(event)=>{
    var cues = Array.prototype.slice.call(document.querySelectorAll(".cue"));
    console.log(cues)
    var player = document.getElementById("audio");
    console.log("PALYER",player)
    
        var target = event.target;
        var key = event.which.toString();
        console.log("target", target, "key", key);
    
         if (key.match(/38|40/)) { //ARRIBA O ABAJO
          var index = cues.indexOf(target);
          var direction = key.match(/40/) ? 1 : -1;
          var length = cues.length;

          if (index + direction < length && index + direction >= 0) {
            cues[index + direction].focus();
          }
        } else if (key.match(/32|13/)) {
          //space or enter
          console.log("enter", target.getAttribute("data-time"));
          var start = parseFloat(target.getAttribute("data-time"));
          player.currentTime = start;
          player.play(); 
        } 
  }

  mouseClick=(event)=>{
    var player = document.getElementById("audio");
    var target = event.target;
    var start = parseFloat(target.getAttribute("data-time"));
    player.currentTime = start;
    console.log("el player", player, start)
    player.play(); 
  }
  
  componentDidMount=()=>{
        var cues = Array.prototype.slice.call(document.querySelectorAll(".cue"));
        var player = document.getElementById("audio");
        //console.log("audio update------------------------", this.state.captions)
        var speaking = document.getElementById("speaking");
        //console.log("PLAYER",player)

        if( player!=null ){
          player.addEventListener("timeupdate", function() {
            if (player.paused || player.ended) {
              return;
            }
            // scroll to currently playing time offset
            var current = 0;
            for (var i = 0; i < cues.length; i++) {
              var cueTime = cues[i].getAttribute("data-time");
            // console.log("cueTime", cueTime);
              if (i + 1 === cues.length && player.currentTime >= parseFloat(cueTime)) {
                current = i;
          
              } else if (
                player.currentTime >= parseFloat(cueTime) &&
                player.currentTime < parseFloat(cues[i + 1].getAttribute("data-time"))
              ) {
                current = i;
          
              } else {
                cues[i].classList.remove("current");
              }
            }
          
            if (cues[current].className.indexOf("current") === -1)
              cues[current].className += " current";
          
            if (cues[current].getAttribute("aria-live") === "rude") {
              speaking.innerHTML = "[Captions]" + cues[current].innerHTML;
            }
          });
        }
  }

  render() {
    return(
      <div className="content-box">
        <div className="image-content-item">
          <div className="audio-item-container">
            {
              this.props.item.attributes.accessibility.dataField!=undefined && this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='top'?
                this.textAlternatives()
              :
                undefined
            }         
            {this.audioPlayer()}
            {
              this.props.item.attributes.accessibility.dataField !=undefined && this.props.item.attributes.accessibility.dataField.longDescriptionPosition ==='bottom'?
                this.textAlternatives()
              :
                undefined
            }   
          </div>
        </div>
        { this.props.fromProgram &&
          <ItemFeedback
            accessibility={this.props.item.attributes.accessibility}
            language={this.props.language}
          />
        }
      </div>
      );
    }
  }
