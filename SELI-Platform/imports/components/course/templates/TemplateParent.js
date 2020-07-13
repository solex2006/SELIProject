import React from 'react';
import TemplateItem from './TemplateItem';

export default class TemplateParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  templateItem = (contentCode, label, type) => {
    var classNameTemplate;
    var contentLength = this.props.arrayOfItems.filter(item => item.code === contentCode).length;
    if (type === 0) {
      classNameTemplate = "template-column-item";
    } else {
      classNameTemplate = "template-row-item";
    }
    return(
      <TemplateItem
        arrayOfItems={this.props.arrayOfItems}
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
  }

  render() {
    return(
      <div className="template-container">
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
        <div className="template-row">
          {this.templateItem("file", "Files", 1)}
          {this.templateItem("link", "Links", 1)}
        </div>
        {
          this.props.tools[2].checked && this.props.tools[5].checked ?
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
        <div className="template-row">{this.templateItem("embeddedh5p", "Embedded Content", 0)}</div>
        <div className="template-row">{this.props.tools[1].checked && this.templateItem("unity", "Unity Content", 0)}</div>
      </div>
    );
  }
}
