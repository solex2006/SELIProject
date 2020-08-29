import React from "react";
import AppBar from "../components/navigation/AppBar";
import ControlSnackbar from "../components/tools/ControlSnackbar";
import BadgeInformation from "./BadgeInformation";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../style/theme";
import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SchoolIcon from "@material-ui/icons/School";
import english from "../../lib/translation/english";
import spanish from "../../lib/translation/spanish";
import portuguese from "../../lib/translation/portuguese";
import polish from "../../lib/translation/polish";
import turkish from "../../lib/translation/turkish";
export default class BadgeVerification extends React.Component {
  constructor(props) {
    super(props);
    Session.set({
      language: Session.get("language") ? Session.get("language") : english,
    });
    this.state = {
      badgeInformation: {
        badgeName: "",
        badgeDescription: "",
        badgeStudent: "",
        badgeTeacher: "",
        badgeCourse: "",
        badgeDate: "",
        image: undefined,
      },
      language: Session.get("language") ? Session.get("language") : english,
    };
    console.log(this.props);
    console.log(this.state.language);
  }

  componentDidMount() {
    Session.set({
      language: Session.get("language") ? Session.get("language") : english,
    });
    this.setState({
      language: Session.get("language") ? Session.get("language") : english,
    });
  }

  showError = () => {};

  setDataForm(data, image) {
    data = JSON.parse(data);
    this.setState({
      badgeInformation: {
        badgeName: data.recipient.badgeName,
        badgeDescription: data.recipient.badgeDescription,
        badgeStudent: data.recipient.badgeStudent,
        badgeTeacher: data.recipient.badgeTeacher,
        badgeCourse: data.recipient.badgeCourse,
        badgeDate: data.issuedOn,
        image: this.state.badgeInformation.image,
      },
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
                    {this.state.language.verificateBadge}
                    <SchoolIcon className="management-title-icon" />
                  </h1>
                  {/* <Button onClick={()=>this.verifyBadge()} className="form-stepper-complete-button" color={this.props.color}>
                {"Extraer Datos"}
              </Button> */}
                </div>
                <BadgeInformation
                  showErrorFunction={(showError) =>
                    (this.showError = showError)
                  }
                  badgeInformation={this.state.badgeInformation}
                  language={this.state.language}
                />

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
