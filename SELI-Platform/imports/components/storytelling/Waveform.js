// components/waveform.js
import React from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

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
      progressColor: '#9bc8ca',
      cursorColor: '#333',
      cursorWidth: 2,
      fillParent: false,
      height: 100,
      barWidth: 3,
      barHeight: 4,
      minPxPerSec: this.props.zoom,
      plugins: [
        CursorPlugin.create({
            showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#333',
                color: '#f5f5f5',
                padding: '2px',
                'font-size': '12px'
            }
        })
      ]
    })
    this.wavesurfer.load(this.props.src);
    this.wavesurfer.on('ready', () => {
      this.props.getSingleDuration(this.wavesurfer.getDuration());
      this.wavesurfer.unAll();
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

  setTime = () => {
    this.wavesurfer.un('seek', this.setTimeID);
    this.wavesurfer.on('seek', this.setTimeID);
  }

  setTimeID = (result) => {
    this.props.setCurrentTime(this.getTime());
  }

  setActionID = () => {
    this.props.sendAction('next');
  }

  play = () => {
    this.wavesurfer.play();
    this.wavesurfer.on('finish', this.setActionID);
  }

  pause = () => {
    this.wavesurfer.pause();
    this.wavesurfer.un('finish', this.setActionID);
  }

  stop = () => {
    this.wavesurfer.stop();
    this.wavesurfer.unAll();
  }

  render() {
    return (
      <div className='waveform'>
        <div className='wave' onClick={() => this.setTime()}></div>
      </div>
    )
  }
}

Waveform.defaultProps = {
  src: ""
}