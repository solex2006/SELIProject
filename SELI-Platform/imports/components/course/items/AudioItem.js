import React from 'react';

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="">
        {
          this.props.item.attributes !== undefined ?
            <div className="content-item">
              {
                this.props.item.type === 'audio' ?
                  <div>
                    <div id={this.props.item.attributes.audio.id+"container"+this.props.item.id} className="audio-item-container" style={{justifyContent: this.props.item.attributes.alignment}}>
                      {
                        this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-end" ?
                          <div id={this.props.item.attributes.audio.id+"description"+this.props.item.id} className="audio-item-description">
                            {this.props.item.attributes.description}
                          </div>
                        :
                        undefined
                      }
                      <audio id={ this.props.item.attributes.audio.id+this.props.item.id } className="audio-item" controls>
                        <source src={this.props.item.attributes.audio.url}></source>
                      </audio>
                      {
                        this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "flex-start" ?
                          <div id={this.props.item.attributes.audio.id+"description"+this.props.item.id} className="audio-item-description">
                            {this.props.item.attributes.description}
                          </div>
                        :
                        undefined
                      }
                    </div>
                    {
                      this.props.item.attributes.description !== "" && this.props.item.attributes.alignment === "center" ?
                        <div id={this.props.item.attributes.audio.id+"description"+this.props.item.id} className="audio-item-description-full">
                          {this.props.item.attributes.description}
                        </div>
                      :
                      undefined
                    }
                  </div>
                :
                undefined
              }
            </div>
          :
          undefined
        }
      </div>
      );
    }
  }
