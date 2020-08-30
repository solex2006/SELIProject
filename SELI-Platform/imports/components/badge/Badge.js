import React from "react";
import AppBar from "../navigation/AppBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SchoolIcon from "@material-ui/icons/School";
import english from "../../../lib/translation/english";
import spanish from "../../../lib/translation/spanish";
import portuguese from "../../../lib/translation/portuguese";
import polish from "../../../lib/translation/polish";
import turkish from "../../../lib/translation/turkish";
import theme from "../../style/theme";
import { Badges } from "../../../lib/BadgesCollection";
import Loading from "../tools/Loading";
export default class Badge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      criteria: "",
      description: "",
      image: "",
      language: Session.get("language") ? Session.get("language") : english,
    };
  }

  componentDidMount() {
    Session.set({
      language: Session.get("language") ? Session.get("language") : english,
    });
    this.setState({
      language: Session.get("language") ? Session.get("language") : english,
    });
    Tracker.autorun(() => {
      var url=Meteor.settings.public.URL_SITE+"badges/"+this.props.match.params.id
      console.log(url)
      var badge = Badges.findOne({
        _id:url,
      });
      console.log(this.props.match.params.id)
      if (badge)
        this.setState({
          id: this.props.match.params.id,
          name: badge.name,
          description: badge.description,
          criteria: badge.criteria,
          image: badge.image,
        });
    });
  }

  handleError = (error) => {
    let errorLabel = error;

    this.handleControlMessage(true, errorLabel);
  };

  setLanguage = (option) => {
    let language = this.state.language;
    if (option === "Portuguese (PT)") {
      Session.set({ language: portuguese });
      language = portuguese;
    } else if (option === "English (US)") {
      Session.set({ language: english });
      language = english;
    } else if (option === "Spanish (ES)") {
      Session.set({ language: spanish });
      language = spanish;
    } else if (option === "Polish (PL)") {
      Session.set({ language: polish });
      language = polish;
    } else if (option === "Turkish (TR)") {
      Session.set({ language: turkish });
      language = turkish;
    }
    this.setState({
      language: language,
    });
  };
  renderBadgeClass() {
    if (this.state.id) {
      return (
        <div className="badge-class-container">
          <div className="badge-image">
            <img src={this.state.image.link} alt="Awarded Badge" />
          </div>
          <div className="badge-information">
            <label class=" badge-title">{this.state.name}</label>
            <label class="badge-font-medium">{this.state.description}</label>
            <label class="badge-label">{this.state.language.earningCriteria}</label>
            <label class="badge-font-medium">{this.state.criteria}</label>
          </div>
        </div>
      );
    }
    return (
      <div className="loading-course-container">
        <Loading message={this.state.language.loadingBadgeInformation} />
      </div>
    );
  }
  render() {
    return (
      <div>
        {
          <MuiThemeProvider theme={theme}>
            {this.state.language && Session.get("language") ? (
              <React.Fragment>
                <AppBar
                  history={this.props.history}
                  language={this.state.language}
                  setLanguage={this.setLanguage.bind(this)}
                />

                <div className="title-badge-registration">
                  <h1 className="management-title">
                    {this.state.language.badgeInformation}
                    <SchoolIcon className="management-title-icon" />
                  </h1>
                </div>
                <div className="management-container">
                  {this.renderBadgeClass()}
                </div>

                <DialogContent className="sign-content">
                  <div className="sign-form">
                    {this.state.action === "in" ? (
                      <SignInForm
                        language={this.props.language}
                        history={this.props.history}
                      />
                    ) : undefined}
                    {this.state.action === "up" ? (
                      <SignUpForm
                        handleClose={this.handleClose.bind(this)}
                        history={this.props.history}
                        language={this.props.language}
                      />
                    ) : undefined}
                  </div>
                </DialogContent>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-success"
                  aria-describedby="alert-dialog-success"
                  disableBackdropClick={true}
                  disableEscapeKeyDown={true}
                >
                  <DialogTitle
                    className="success-dialog-title"
                    id="alert-dialog-title"
                  >
                    {this.state.language.resquestSuccessfullySent}
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      onClick={() => this.handleClose()}
                      color="secondary"
                      variant="contained"
                      autoFocus
                    >
                      {this.state.language.ok}
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            ) : undefined}
          </MuiThemeProvider>
        }
      </div>
    );
  }
}
