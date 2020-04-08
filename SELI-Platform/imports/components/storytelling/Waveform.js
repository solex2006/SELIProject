// components/waveform.js
import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'

export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zoom: 20,
      scale: 5,
    }
  }

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: 'violet',
      progressColor: 'purple',
      normalize: true,
      cursorWidth: 2,
      fillParent: false,
      height: 100,
      minPxPerSec: this.state.zoom,
    })
    this.wavesurfer.load(this.props.src);
    this.wavesurfer.on('ready', () => {
      this.props.getSingleDuration(this.wavesurfer.getDuration());
      this.props.setZoom(this.state.zoom);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src){
      this.wavesurfer.load(this.props.src)
    }
  }

  getTime = () => {
    return this.wavesurfer.getCurrentTime();
  }

  play = () => {
    this.wavesurfer.play();
    this.wavesurfer.on('finish', () => {
      this.props.sendAction('next');
    });
  }

  pause = () => {
    this.wavesurfer.pause();
    this.wavesurfer.unAll();
  }

  stop = () => {
    this.wavesurfer.stop();
    this.wavesurfer.unAll();
  }

  zoomIn = () => {
    let zoom = this.state.zoom + this.state.scale;
    if (zoom <= 200) {
      this.scaling(zoom);
      this.props.setZoom(zoom);
    }
  }

  zoomOut = () => {
    let zoom = this.state.zoom - this.state.scale;
    if (this.state.zoom >= 10) {
      this.scaling(zoom);
      this.props.setZoom(zoom);
    }
  }

  scaling = (scaleRate) => {
    this.wavesurfer.zoom(scaleRate);
    this.setState({
      zoom: scaleRate,
    })
  }

  render() {
    return (
      <div className='waveform'>
        <div className='wave'></div>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}