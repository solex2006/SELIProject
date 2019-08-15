import React from 'react';
import MenuItem from './MenuItem';

export default class AudioItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div className="content-box">
        {
          this.props.item.attributes !== undefined ?
            <div className="audio-content-item">
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
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
          />
        </div>
      </div>
      );
    }
  }
