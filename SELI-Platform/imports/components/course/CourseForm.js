import React from 'react';
import Stepper from '../navigation/Stepper';

export default class CourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">
            Create Course
          </div>
          <Stepper
            showControlMessage={this.props.showControlMessage.bind(this)}
            showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
            saveCourse={this.props.saveCourse.bind(this)}
            setCourseCategory={this.props.setCourseCategory.bind(this)}
            setCourseTemporalKey={this.props.setCourseTemporalKey.bind(this)}
            showAccesibilityForm={this.props.showAccesibilityForm.bind(this)}
            modalityItems={this.props.modalityItems}
            methodologyItems={this.props.methodologyItems}
            addedModalityItems={this.props.addedModalityItems}
            addedMethodologyItems={this.props.addedMethodologyItems}
            courseKey={this.props.courseKey}
            categories={this.props.categories}
            category={this.props.category}
            course={this.props.course}
            knowledgeItems={this.props.knowledgeItems}
            addedKnowledgeItems={this.props.addedKnowledgeItems}
            technilcaItems={this.props.technilcaItems}
            addedTechnilcaItems={this.props.addedTechnilcaItems}
            peopleItems={this.props.peopleItems}
            addedPeopleItems={this.props.addedPeopleItems}
          />
        </div>
      </div>
    );
  }
}
