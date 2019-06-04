import React from 'react';

export default class TutorRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <div className="registry-container">
          <div className="registry-icon-column">
            <p className="registry-first-letter">{this.props.tutors.name.charAt(0).toUpperCase()}</p>
          </div>
          <div className="registry-information-column">
            <p className="registry-text-information">{"Name: " + this.props.tutors.name}</p>
            <p className="registry-paragraph-information">{"Biography: " + this.props.tutors.name}</p>
            <p className="registry-text-information">{"Email: " + this.props.tutors.email}</p>
            <p className="registry-text-information">{"Phone number: " + this.props.tutors.phoneNumber}</p>
            <a target="_blank" href={this.props.tutors.googleLink} className="registry-link-information">Google link</a>
            <a target="_blank" href={this.props.tutors.personalWebsite} className="registry-link-information">Web site</a>
        </div>
          <div className="registry-photo-column">
            <div className="registry-image" style={{ backgroundImage: "url(" + this.props.tutors.url + ")" }}></div>
          </div>
        </div>
      </div>
    );
  }
}
