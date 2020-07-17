import React from 'react';
import MenuItem from './MenuItem';
import Code  from '../../tools/Code';

export default class TextItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="text-content-item">
          {
            this.props.item.attributes.type === 'title' ?
                <div>
                {
                  this.props.item.attributes.size==="1.5em"?
                    <h1 className="text-item-title" style={{textAlign: this.props.item.attributes.alignment, fontSize: '2em'}}>
                      {this.props.item.attributes.content}
                    </h1>
                  :
                  undefined
                }
                {
                  this.props.item.attributes.size==="1.15em"?
                    <h2 className="text-item-title" style={{textAlign: this.props.item.attributes.alignment,fontSize: '1.5em'}}>
                      {this.props.item.attributes.content}
                    </h2>
                  :
                  undefined
                }
                {
                  this.props.item.attributes.size==="0.9em"?
                    <h3 className="text-item-title" style={{textAlign: this.props.item.attributes.alignment,fontSize: '1.17em'}}>
                      {this.props.item.attributes.content}
                    </h3>
                  :
                  undefined
                }
              </div>
              :
              undefined
          }
          {
            this.props.item.attributes.type === 'section' ?
              <div dangerouslySetInnerHTML={{__html: this.props.item.attributes.content}} id={this.props.item.id + "section"} className="text-item-section">

              </div>
            :
            undefined
          }
          {
            this.props.item.attributes.type === 'code' ?
              <Code
                theme={this.props.item.attributes.theme}
                language={this.props.item.attributes.language}
                code={this.props.item.attributes.content}
              />
            :
            undefined
          }
        </div>
        <div className="menu-content-item">
          <MenuItem
            item={this.props.item}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            language={this.props.language}
          />
        </div>
      </div>
      );
    }
  }
