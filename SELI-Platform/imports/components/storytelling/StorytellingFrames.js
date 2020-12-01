import React from 'react';

export default class StorytellingFrames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getFullName = (time) => {
    Meteor.call("GetUser", (error, response) =>  {
      if (response) {
        this.setState({fullName: response.profile.fullname}, () => {
          this.setTimer(time);
        })
      }
  });
  }

  setTimer = (seconds) => {
    if (this.props.playing) {
      this.setState({seconds,}, () => {this.timer()});
    } else {
      clearInterval(this.myInterval);
    }
  }

  timer = () => {
    this.myInterval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds - 1
      }, () => {
        if (this.state.seconds === 0) {
          clearInterval(this.myInterval)
          if (this.props.intervalFrame === "start") {
            this.props.handleFrame("scenes");
          } else if (this.props.intervalFrame === "end"){
            this.props.handleFrame("none");
          }
        } 
      });
    }, 1000)
  }

  testFrame = () => {
    if (this.props.intervalFrame === "start") {
      this.getFullName(3);
    } else if (this.props.intervalFrame === "end"){
      this.getFullName(4);
    }
  }

  componentDidMount() {
    this.testFrame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.intervalFrame !== this.props.intervalFrame || prevProps.playing !== this.props.playing) {
      this.testFrame();
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  thisTime = () => {
    var date = new Date(this.props.story.lastModified);
    return date.toLocaleDateString('en-US');
  }

  render() {
    return(
      <div>
        {
          this.props.intervalFrame === "start" ?
            <div className="storytelling-player-frame-container">
              <div>
                <div className="storytelling-player-title">{this.props.story.name}</div>
                <div className="storytelling-player-full-name">{this.state.fullName ? `${this.props.language.author}: ${this.state.fullName}` : undefined}</div>
              </div>
            </div>
          : undefined
        }
        {
          this.props.intervalFrame === "end" ?
            this.props.story.endType && this.props.story.endType === 'image'?
              <div className="storytelling-player-image-container-time">
                <div
                  className="file-image-preview"
                  style={{
                    backgroundImage: this.props.story.endFrame ? `url(${this.props.story.endFrame.link})` : "none",
                  }}
                ></div>
              </div>
            :
              <div className="storytelling-player-frame-container">
                <div>
                  <div 
                    className="storytelling-player-end-image"
                    style={{backgroundImage: "url(seli-logo.png)"}}
                  />
                  <div className="storytelling-player-end-subtitle">{this.props.language.workshop1}</div>
                  <div className="storytelling-player-end-subtitle">
                    <b><i>{`"${this.props.story.workshop ? this.props.story.workshop : ""}"`}</i></b>
                    &nbsp;&nbsp;
                    {this.props.language.workshop2}
                  </div>
                  <div className="storytelling-player-end-subtitle">{this.props.story.project ? `${this.props.story.project}.` : ""}</div>
                  <div className="storytelling-player-end-footer">
                    <div className="storytelling-player-end-tutor">
                      {
                        this.props.story.facilitators && this.props.story.facilitators.enabled ?
                          <div>
                            <b>{`${this.props.language.facilitators}:\n`}</b>
                            {this.props.story.facilitators.label}
                          </div>
                        : ""
                      }
                    </div>
                    <div className="storytelling-player-end-date">{this.props.story.lastModified ? this.thisTime() : ""}</div>
                    <div 
                      className="storytelling-player-end-copyright"
                      style={{backgroundImage: "url(cc.png)"}}
                    />
                  </div>
                </div>
              </div>
          : undefined
        }
      </div>
    )
  }
}
