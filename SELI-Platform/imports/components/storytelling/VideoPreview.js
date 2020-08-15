import React from 'react';

export default class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay:false,
      captions:'',
    }
  }


  componentDidMount(){
    //console.log("desde VIDEOPREVIEW", this.props.captions)
    if(this.props.captions!=undefined){
      if(this.props.captions.fileTranscription && this.props.captions.fileTranscription.length>0){
        this.setState({
          captions:this.props.captions.fileTranscription[0].link
        })
      }
    }
    

    this.setState({
      isPlaying: (this.props.file!=undefined)? (this.props.file.link):(undefined),
    })
    if (this.props.autoplay==="autoplay"){
      this.setState({
        autoplay: true
      })
    }
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.file!=undefined && prevProps.file!=undefined ){
      if (prevProps.file.link !== this.props.file.link) {
        this.setState({
          isPlaying: this.props.file.link,
        })
        this.refs.video.pause();
        this.refs.video.play();
        this.refs.video.load();
      }
    }
  }

  render() {
    return(
        <video 
          width={"350"} 
          height={undefined}
          controls 
          id="video-preview-information" 
          className="file-preview-information" 
          ref="video"
        >
          <source src={(this.props.file!=undefined)? (this.props.file.link):(undefined)}></source>
          {
            this.state.captions!=''?   
            <track src={this.state.captions} kind="subtitles" srcLang="captions" />
            :
            undefined
          }
        </video>
      );
    }
  }
