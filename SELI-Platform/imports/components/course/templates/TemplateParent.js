import React from 'react';
import ContentItem from '../ContentItem';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.loadingData();
  }

  loadingData = () => {
    let txtmain = -1;
    let imgmain = -1;
    let iovsub = -1;
    let txtsub = -1;
    this.props.arrayOfItems.map((item, index) => {
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

  templateItem = (contentIndex, contentCode, label, type) => {
    var classNameTemplate;
    if (type === 0) {
      classNameTemplate = "template-column-item";
    } else {
      classNameTemplate = "template-row-item";
    }
    return(
      <div
        style={
          contentIndex === -1 ?
            {backgroundImage: "url(drag-drop.svg)", animation: "bounce 1s 1"} : {backgroundImage: "none"}
        } className={classNameTemplate}
      >
        { contentIndex === -1 && (
          <div className="template-background-text">
            {label}
          </div> 
        )}
        <Container
          lockAxis="y"
          dragBeginDelay={500}
          dragClass="drag-class"
          style={{width: "100%", height: "200px"}}
          groupName="1"
          getChildPayload={i => this.props.arrayOfItems[i]}
          onDrop={e => this.props.openDialog(e, contentCode)}>
          {
            contentIndex > -1 && (
              <Draggable key={contentIndex}>
                <ContentItem
                  fromTemplate
                  item={this.props.arrayOfItems[contentIndex]}
                  removeItem={this.props.removeItem.bind(this)}
                  editItem={this.props.editItem.bind(this)}
                  handleDecorative={this.props.handleDecorative.bind(this)}
                  editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
                  language={this.props.language}
                />
              </Draggable>
            )
          }
        </Container>
      </div>
    )
  }

  render() {
    return(
      <div className="template-container">
        {this.templateItem(this.state.txtmain, "txtmain", "Main Content", 0)}
        {this.templateItem(this.state.imgmain, "imgmain", this.props.language.image, 1)}
        {/* <TemplateItem
          contentIndex={this.state.txtmain}
          contentCode={"txtmain"}
          label={"Main Content"}
          classNameTemplate={"template-column-item"}
          arrayOfItems={this.props.arrayOfItems}
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
          classNameTemplate={"template-column-item"}
          arrayOfItems={this.props.arrayOfItems}
          openDialog={this.props.openDialog.bind(this)}
          removeItem={this.props.removeItem.bind(this)}
          editItem={this.props.editItem.bind(this)}
          handleDecorative={this.props.handleDecorative.bind(this)}
          editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
          language={this.props.language}
        ></TemplateItem> */}
        {/* <div className="template-row">
          <TemplateItem
            contentIndex={this.state.txtmain}
            contentCode={"txtmain"}
            label={"Main Content"}
            classNameTemplate={"template-row-item"}
            arrayOfItems={this.props.arrayOfItems}
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
            classNameTemplate={"template-row-item"}
            arrayOfItems={this.props.arrayOfItems}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
        </div>
        <div className="template-row">
          <TemplateItem
            contentIndex={this.state.iovsub}
            contentCode={"iovsub"}
            label={`${this.props.language.image} ${this.props.language.or} ${this.props.language.video}`}
            classNameTemplate={"template-row-item"}
            arrayOfItems={this.props.arrayOfItems}
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
            classNameTemplate={"template-row-item"}
            arrayOfItems={this.props.arrayOfItems}
            openDialog={this.props.openDialog.bind(this)}
            removeItem={this.props.removeItem.bind(this)}
            editItem={this.props.editItem.bind(this)}
            handleDecorative={this.props.handleDecorative.bind(this)}
            editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
            language={this.props.language}
          ></TemplateItem>
        </div> */}
      </div>
    );
  }
}
