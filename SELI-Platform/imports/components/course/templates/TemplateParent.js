import React from 'react';
import TemplateItem from './TemplateItem';
import ContentItem from '../ContentItem';
import SortItem from '../items/SortItem';
import MediaGallery from './MediaGallery';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  templateItem = (contentCode, label, type) => {
    var classNameTemplate;
    var contentItems = this.props.arrayOfItems.filter(item => item.code === contentCode);
    var contentLength = contentItems.length;
    if (type === 0) {
      if (this.props.editItem) {classNameTemplate = "template-column-item"}
      else {classNameTemplate = "template-column-item-student"}
    } else {
      if (this.props.editItem) {classNameTemplate = "template-row-item"}
      else{classNameTemplate = "template-column-item-student"}
    }
    if (this.props.editItem) {
      return(
        <TemplateItem
          arrayOfItems={contentItems}
          taskType={this.props.arrayOfDesignItems.type}
          classNameTemplate={classNameTemplate}
          contentCode={contentCode}
          label={label}
          contentLength={contentLength}
          openDialog={this.props.openDialog.bind(this)}
          removeItem={this.props.removeItem.bind(this)}
          editItem={this.props.editItem.bind(this)}
          handleDecorative={this.props.handleDecorative.bind(this)}
          editAccessibilityForm={this.props.editAccessibilityForm.bind(this)}
          language={this.props.language}
        ></TemplateItem>
      )
    } else if (contentLength > 0) {
      return(
        <div className={classNameTemplate}>
          {
            (contentLength > 1 && contentCode === "video") || (contentLength > 1 && contentCode === "image") ?
              <MediaGallery
                contentItems={contentItems}
                contentCode={contentCode}
                language={this.props.language}
              />
            :
              contentItems.map((p, i) => {
                return(
                  <ContentItem
                    fromTemplate
                    item={p}
                    courseId={this.props.courseId}
                    toResolve={this.props.toResolve}
                    fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                    handleControlMessage={this.props.handleControlMessage ? this.props.handleControlMessage.bind(this) : undefined}
                    completeActivity={this.props.completeActivity ? this.props.completeActivity.bind(this) : undefined}
                    language={this.props.language}
                  ></ContentItem>
                )
              })
          }
        </div>
      )
    }
  }

  loadingData = () => {
    let items;
    let file = false;
    let link = false;
    let embedded = false;
    let unity = false;
    let mediaGallery = false;
    this.props.tools.map((tool, index) => {
      if (tool.checked && tool.items && tool.items.length) {
        items = tool.items;
        if (index === 1) {
          items.map((item) => {
            if (item.type === "1") { //unity
              unity = true;
            } else if (item.type === "2") { //h5p
              embedded = true;
            } else if (item.external === true){ //external
              link = true;
            }
          })
        } else if (index === 3) {
          items.map((item) => {
            if (item.external === true){ //external
              link = true;
              embedded = true;
            } else if (item.type === "1") { //file
              file = true;
            } else if (item.type === "2") { //h5p
              embedded = true;
            }
          })
        } else if (index === 4) {
          items.map((item) => {
            if (item.copy === "1" && item.external === true){ //external
              link = true;
            } else if (item.copy === "1") { //copy
              file = true;
            }
          })
        }
      }
    });
    var contentImages = this.props.arrayOfItems.filter(item => item.code === 'image');
    var contentVideos = this.props.arrayOfItems.filter(item => item.code === 'video');
    if (!this.props.editItem && (contentImages.length > 1 || contentVideos.length > 1)) {
      mediaGallery = true;
    }
    return {file, link, embedded, unity, mediaGallery}
  }

  templateContent = () => {
    const {file, link, embedded, unity, mediaGallery} = this.loadingData();
    return(
      <div className={this.props.editItem ? "template-container" : "template-container-student"}>
        {
          !this.props.sortMode ?
            <React.Fragment>
              <div className="template-row">
                {
                  this.props.selected[3] === 2 ?
                    this.props.arrayOfDesignItems.type === "1" ? this.templateItem("task", this.props.language.activityItem, 0) :
                    this.props.arrayOfDesignItems.type === "2" ? this.templateItem("task", this.props.language.problemItem, 0) :
                    this.props.arrayOfDesignItems.type === "3" ? this.templateItem("task", this.props.language.quizItem, 0) :
                    this.props.arrayOfDesignItems.type === "4" ? this.templateItem("task", this.props.language.forumItem, 0) : undefined
                  :
                    this.templateItem("main", this.props.language.Maincontent, 0)
                }
              </div>
              {
                file && link ?
                  <div className="template-row">
                    {this.templateItem("file", this.props.language.files, 1)}
                    {this.templateItem("link", this.props.language.links, 1)}
                  </div>
                :
                  (file || link) && <div className="template-row">
                    {file && this.templateItem("file", this.props.language.files, 0)}
                    {link && this.templateItem("link", this.props.language.links, 0)}
                  </div>
              }
              {
                this.props.tools[2].checked && this.props.tools[5].checked ?
                  mediaGallery ?
                    <React.Fragment>
                      <div className="template-row">
                        {this.templateItem("image", this.props.language.Images, 0)}
                      </div>
                      <div className="template-row">
                        {this.templateItem("video", this.props.language.Videos, 0)}
                      </div>
                    </React.Fragment>
                  :
                    <div className="template-row">
                      {this.templateItem("image", this.props.language.Images, 1)}
                      {this.templateItem("video", this.props.language.Videos, 1)}
                    </div>
                :
                  (this.props.tools[2].checked || this.props.tools[5].checked) && <div className="template-row">
                    {this.props.tools[2].checked && this.templateItem("image", this.props.language.Images, 0)}
                    {this.props.tools[5].checked && this.templateItem("video", this.props.language.Videos, 0)}
                  </div>
              }
              {this.props.tools[0].checked && <div className="template-row">{this.templateItem("audio", this.props.language.Audios, 0)}</div>}
              {embedded && <div className="template-row">{this.templateItem("embeddedh5p", this.props.language.embeddedContent, 0)}</div>}
              {unity && <div className="template-row">{this.templateItem("unity", this.props.language.unityContent, 0)}</div>}
            </React.Fragment>
          :
            <Container
              lockAxis="y"
              dragBeginDelay={0}
              dragClass="drag-class"
              style={{width: "100%", height: "100%"}}
              groupName="1"
              getChildPayload={i => this.props.arrayOfItems[i]}
              onDrop={e => this.props.openDialog(e)}
            >
              {
                this.props.arrayOfItems.map((p, i) => {
                  return (
                    <Draggable key={i}>
                      <SortItem
                        item={p}
                        removeItem={this.props.removeItem.bind(this)}
                        index={i}
                        language={this.props.language}
                      />
                    </Draggable>
                  );
                })
              }
            </Container>
        }
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.templateContent()}
      </React.Fragment>
    )
  }
}
