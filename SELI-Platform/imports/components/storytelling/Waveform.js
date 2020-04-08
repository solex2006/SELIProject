// components/waveform.js
import React from 'react'
import ReactDOM from 'react-dom'
import WaveSurfer from 'wavesurfer.js'

export default class Waveform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.$waveform,
      waveColor: '#f5f5f5',
      progressColor: 'violet',
      /* normalize: true, */
      cursorWidth: 2,
      fillParent: false,
      height: 100,
      barWidth: 3,
      barHeight: 4,
      minPxPerSec: this.props.zoom,
    })
    this.wavesurfer.load(this.props.src);
    this.wavesurfer.on('ready', () => {
      this.props.getSingleDuration(this.wavesurfer.getDuration());
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src){
      this.wavesurfer.load(this.props.src)
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.wavesurfer.zoom(this.props.zoom);
    }
  }

  componentWillUnmount = () => {
    this.wavesurfer.stop();
    this.wavesurfer.destroy();
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