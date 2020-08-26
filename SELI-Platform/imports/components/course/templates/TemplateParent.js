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
      file: false,
      link: false,
      embedded: false,
      unity: false,
      mediaGallery: false,
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
                openMedia={this.props.openMedia ? this.props.openMedia.bind(this) : undefined}
                language={this.props.language}
              />
            :
              contentItems.map((p, i) => {
                return(
                  <ContentItem
                    item={p}
                    courseId={this.props.courseId}
                    toResolve={this.props.toResolve}
                    fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                    openMedia={this.props.openMedia ? this.props.openMedia.bind(this) : undefined}
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

  componentDidMount() {
    this.loadingData();
  }

  loadingData = () => {
    let items;
    let file;
    let unity;
    let h5p;
    let copy;
    let external;
    this.props.tools.map((tool, index) => {
      if (tool.checked && tool.items && tool.items.length) {
        items = tool.items;
        if (index === 1) {
          unity = items.filter(item => item.type === "1").length;
          h5p = items.filter(item => item.type === "2").length;
          external = items.filter(item => item.external === true).length;
          if (external > 0){
            this.setState({link: true});
          } 
          if (unity > 0) {
            this.setState({unity: true});
          }
          if (h5p > 0) {
            this.setState({embedded: true});
          }
        } else if (index === 3) {
          file = items.filter(item => item.type === "1").length;
          h5p = items.filter(item => item.type === "2").length;
          external = items.filter(item => item.external === true).length;
          if (file > 0 && external > 0) {
            this.setState({file: true});
          } else if (external > 0){
            this.setState({link: true, embedded: true});
          } else if (h5p > 0) {
            this.setState({embedded: true});
          }
        } else if (index === 4) {
          copy = items.filter(item => item.copy === "1").length;
          external = items.filter(item => item.external === true).length;
          if (copy > 0 && external > 0){
            this.setState({link: true});
          } else if (copy > 0 && external === 0) {
            this.setState({file: true});
          }
        }
      }
    });
    var contentImages = this.props.arrayOfItems.filter(item => item.code === 'image');
    var contentVideos = this.props.arrayOfItems.filter(item => item.code === 'video');
    if (contentImages.length > 1 || contentVideos.length > 1) {
      if (!this.props.editItem) this.setState({mediaGallery: true})
    }
  }

  render() {
    return(
      <div className="template-container" style={this.props.editItem ? {overflowY: "scroll"} : undefined}>
        {
          !this.props.sortMode ?
            <React.Fragment>
              <div className="template-row">
                {
                  this.props.selected[3] === 2 ?
                    this.props.arrayOfDesignItems.type === "1" ? this.templateItem("task", "Activity Item", 0) :
                    this.props.arrayOfDesignItems.type === "2" ? this.templateItem("task", "Problem Item", 0) :
                    this.props.arrayOfDesignItems.type === "3" ? this.templateItem("task", "Quiz Item", 0) :
                    this.props.arrayOfDesignItems.type === "4" ? this.templateItem("task", "Forum Item", 0) : undefined
                  :
                    this.templateItem("main", "Main Content", 0)
                }
              </div>
              {
                this.state.file && this.state.link ?
                  <div className="template-row">
                    {this.templateItem("file", "Files", 1)}
                    {this.templateItem("link", "Links", 1)}
                  </div>
                :
                  <div className="template-row">
                    {this.state.file && this.templateItem("file", "Files", 0)}
                    {this.state.link && this.templateItem("link", "Links", 0)}
                  </div>
              }
              {
                this.props.tools[2].checked && this.props.tools[5].checked ?
                  this.state.mediaGallery ?
                    <React.Fragment>
                      <div className="template-row">
                        {this.templateItem("image", "Images", 0)}
                      </div>
                      <div className="template-row">
                        {this.templateItem("video", "Videos", 0)}
                      </div>
                    </React.Fragment>
                  :
                    <div className="template-row">
                      {this.templateItem("image", "Images", 1)}
                      {this.templateItem("video", "Videos", 1)}
                    </div>
                :
                  <div className="template-row">
                    {this.props.tools[2].checked && this.templateItem("image", "Images", 0)}
                    {this.props.tools[5].checked && this.templateItem("video", "Videos", 0)}
                  </div>
              }
              <div className="template-row">{this.props.tools[0].checked && this.templateItem("audio", "Audios", 0)}</div>
              <div className="template-row">{this.state.embedded && this.templateItem("embeddedh5p", "Embedded Content", 0)}</div>
              <div className="template-row">{this.state.unity && this.templateItem("unity", "Unity Content", 0)}</div>
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
}
