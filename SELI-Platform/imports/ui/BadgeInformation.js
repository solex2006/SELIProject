import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageSharpIcon from "@material-ui/icons/ImageSharp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FileUpload from "../components/files/FileUpload";
import ImagePreview from "../components/files/previews/ImagePreview";
import Library from "../components/tools/Library";
import FormPreview from "../components/files/previews/FormPreview";
import { noSpecialCharacters } from "../../lib/textFieldValidations";
import BadgeUpload from "../components/files/BadgeUpload";
import verifyBadge from "../components/badge/VerificateBadge";

export default class BadgeInformation extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      badgeInformation: "",
      badgeClass: {
        name: "",
        description: "",
        issuedOn: "",
        criteria: "",
      },
      showError: false,
      passwordToConfirm: "",
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openFileSelector(fileType, accept) {
    this.setState(
      {
        fileType: fileType,
        accept: accept,
      },
      () => {
        this.handleClickOpen();
      }
    );
  }

  getFileInformation(file) {
    this.state.fileType === "image"
      ? this.setState({
          image: file,
          showPreview: true,
          showLibrary: false,
        })
      : this.setState({
          sylabus: file,
          showPreview: true,
          showLibrary: false,
        });
  }

  unPickFile() {
    this.state.fileType === "image"
      ? this.setState({
          showPreview: false,
          image: undefined,
        })
      : this.setState({
          showPreview: false,
          sylabus: undefined,
        });
  }

  showLibrary() {
    this.setState({
      showLibrary: true,
    });
  }

  hideLibrary() {
    this.setState({
      showLibrary: false,
    });
  }

  selectFile(fileType) {
    let badgeInformation = this.state.badgeInformation;
    if (fileType === "image") {
      badgeInformation.image = this.state.image;
      this.setState({
        showPreview: false,
        badgeInformation: badgeInformation,
      });
    }
    this.handleClose();
    this.clearFields();
  }

  changeFile(type) {
    if (type === "image") {
      this.openFileSelector("image", "image/*");
    } else {
      this.openFileSelector("pdf", ".pdf");
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.showErrorFunction(() => this.showError());
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextProps;
  }
  clearFields() {
    console.log("clearing");
    var fields = {
      name: "",
      description: "",
      criteria: "",
      issuedOn: "",
    };
    this.setState({
      badgeClass: fields,
    });
    console.log(this.state);
  }
  verificateImage() {
    console.log("verificate Image badgeinformation.js");
    console.log(this.state);
    verifyBadge(this.state.badgeInformation.image._id).then((res, err) => {
      if (err) console.log(err);
      else {
        res = JSON.parse(res);
        var fields = {
          name: res.badge.name,
          description: res.badge.description,
          criteria: res.badge.criteria,
          issuedOn: res.issuedOn,
        };
        this.setState({ badgeClass: fields });
      }
    });
  }
  showError = () => {
    this.setState({
      showError: true,
    });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ badgeInformation: nextProps.badgeInformation });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.badgeInformation);
    if (nextProps.badgeInformation !== prevState.badgeInformation) {
      return { badgeInformation: nextProps.badgeInformation };
    } else return null;
  }
  render() {
    return (
      <div className="badge-verification-container">
        <div className="form-file-column">
          {this.state.badgeInformation.image !== undefined ? (
            <FormPreview
              file={this.state.badgeInformation.image}
              type="image"
              unPickFile={this.unPickFile.bind(this)}
              changeFile={this.changeFile.bind(this)}
            />
          ) : (
            <Button
              onClick={() => this.openFileSelector("image", "image/*")}
              className="form-image-button"
              fullWidth
              color="secondary"
            >
              <ImageSharpIcon className="form-image-icon" />
              {this.props.language.selectBadgeImage}
            </Button>
          )}
        </div>
        <div className="form-input-column">
          <div className="sign-form">
            <label class="badge-information-label">
              {this.props.language.badgeName}
            </label>
            <TextField
              id="description-input"
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.state.badgeClass.name || ""}
            />
            <label class="badge-information-label">
              {this.props.language.badgeDescription}
            </label>
            <TextField
              id="description-input"
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              InputProps={{
                readOnly: true,
              }}
              value={this.state.badgeClass.description}
            />
            <label class="badge-information-label">
              {this.props.language.earningCriteria}
            </label>
            <TextField
              id="description-input"
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.state.badgeClass.criteria}
            />

            <label class="badge-information-label">
              {this.props.language.issuedOn}
            </label>
            <TextField
              id="description-input"
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={this.state.badgeClass.issuedOn}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={this.verificateImage.bind(this)}
            >
              {this.props.language.verify}
            </Button>
            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={this.clearFields.bind(this)}
            >
              {this.props.language.clear}
            </Button> */}
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="form-dialog"
          keepMounted
          maxWidth={false}
        >
          <DialogTitle className="form-dialog-title" id="alert-dialog-title">
            {this.state.fileType === "image"
              ? this.props.language.chooseOrUploadBadgeImage
              : undefined}
          </DialogTitle>
          <DialogContent>
            <div className="file-form-dialog">
              {this.state.showLibrary ? (
                <Library
                  user={"MyUser"}
                  type={this.state.fileType}
                  getFileInformation={this.getFileInformation.bind(this)}
                  hideLibrary={this.hideLibrary.bind(this)}
                  language={this.props.language}
                />
              ) : (
                <div>
                  {this.state.showPreview ? (
                    <div className="form-preview-container">
                      <ImagePreview
                        file={this.state.image}
                        unPickFile={this.unPickFile.bind(this)}
                        language={this.props.language}
                      />
                    </div>
                  ) : (
                    <div className="form-file-container">
                      <BadgeUpload
                        type={this.state.fileType}
                        user={"guest"}
                        accept={this.state.accept}
                        getFileInformation={this.getFileInformation.bind(this)}
                        label={this.props.language.uploadImageButtonLabel}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.language.cancel}
            </Button>
            <Button
              onClick={() => this.selectFile(this.state.fileType)}
              disabled={
                this.state.fileType === "image"
                  ? this.state.image === undefined
                  : this.state.sylabus === undefined
              }
              color="primary"
            >
              {this.props.language.select}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
