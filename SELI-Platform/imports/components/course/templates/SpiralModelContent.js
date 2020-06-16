import React from 'react';
import TemplateItem from './TemplateItem';

export default class SpiralModelContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.loadingData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.courseInformation.program[this.props.selected[0]].items.length !== this.props.courseInformation.program[this.props.selected[0]].items.length) {
      console.log("actrualizando");
      this.loadingData();
    }
  }

  loadingData = () => {
    let txtmain = -1;
    let imgmain = -1;
    let iovsub = -1;
    let txtsub = -1;
    this.props.courseInformation.program[this.props.selected[0]].items.map((item, index) => {
      if (item.code) {
        if (item.code === "txtmain") {
          txtmain = index;
        } else if (item.code === "imgmain") {
          imgmain = index;
        } else if (item.code === "iovsub") {
          iovsub = index;
        } else if (item.code === "txtsub") {
          txtsub = index;
        }       
      }
    })
    this.setState({
      txtmain,
      imgmain,
      iovsub,
      txtsub,
    })
  }

  render() {
    return(
      <div className="template-container">
        <div className="template-title">
          {`${this.props.courseInformation.title} - ${this.props.courseInformation.program[this.props.selected[0]].name}`}
        </div>
        <div className="spiral-row-1">
          <TemplateItem
            contentIndex={this.state.txtmain}
            contentCode={"txtmain"}
            label={"Main Content"}
            classNameTemplate={"spiral-main-content"}
            item={this.props.courseInformation.program[this.props.selected[0]].items[this.state.txtmain]}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
          <TemplateItem
            contentIndex={this.state.imgmain}
            contentCode={"imgmain"}
            label={this.props.language.image}
            classNameTemplate={"spiral-image-top"}
            item={this.props.courseInformation.program[this.props.selected[0]].items[this.state.imgmain]}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
        </div>
        <div className="spiral-row-2">
          <TemplateItem
            contentIndex={this.state.iovsub}
            contentCode={"iovsub"}
            label={`${this.props.language.image} ${this.props.language.or} ${this.props.language.video}`}
            classNameTemplate={"spiral-image-video"}
            item={this.props.courseInformation.program[this.props.selected[0]].items[this.state.iovsub]}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
          <TemplateItem
            contentIndex={this.state.txtsub}
            contentCode={"txtsub"}
            label={"Subcontent"}
            classNameTemplate={"spiral-sub-content"}
            item={this.props.courseInformation.program[this.props.selected[0]].items[this.state.txtsub]}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
        </div>
      </div>
    );
  }
}
