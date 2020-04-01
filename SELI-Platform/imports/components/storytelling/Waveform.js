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
      waveColor: 'violet',
      progressColor: 'purple',
      normalize: true,
      cursorWidth: 2,
      fillParent: false,
      height: 100,
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
  }

  getTime = () => {
    return this.wavesurfer.getCurrentTime();
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