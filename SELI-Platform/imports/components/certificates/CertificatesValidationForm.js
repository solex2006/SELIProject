import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
    margin: theme.spacing(2),
    }
}));

export default class CertificatesValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        certificateShown : false,
        certificateNotValid : false,
        loading: false,
        hash: '',
    }
  }

    CircularIndeterminate() {
        const classes = useStyles;
    
        return (
        <div>
            <div className="form-separator"></div>

            <div className="input-container">
                <CircularProgress className={classes.progress} size="20%"/>
            </div>
        </div>
        );
    }


  validateEmptyInputs(inputs){
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === "") {
        this.props.showControlMessage('Fields marked with * are required');
        this.showEmptyInputs();
        return false;
      }
    }
    return true;
  }

  getData(){
    this.setState({
      certificateShown : false,
      certificateNotValid : false,
      loading: true});

    let hash = document.getElementById('certificateNumber-input').value;
    
    let certificateInfo = {
        certificateHash:hash,
    };
    
    this.validateCertificate(certificateInfo);
  }

  validateCertificate(certificateInfo){
      
    fetch('https://www.seliblockcert.tk/datos', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(certificateInfo)
    }).then(res=>res.json())
      .then(res => {
        console.log(res)
        if(res === true){
          setTimeout(()=>{
          this.setState({
            certificateShown : true,
            certificateNotValid : false,
            loading: false,
            hash: certificateInfo.certificateHash});
          }, 1000);
        }else{
          this.setState({
            certificateShown : false,
            certificateNotValid : true,
            loading: false,
            hash: ''});
        }
      });

    //this.onCertificateLoad();

  }

  onCertificateLoad(){
    setTimeout(()=>{this.setState(
        {certificateShown : true,
        certificateNotValid : false,
        loading: false,});
    }, 4000);
    console.log("seconds later");
  }

  componentWillUnmount(){

  }

  componentDidMount(){

  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">
            Certificate Management
          </div>
          <div className="form-subtitle">Certificate information</div>
          <Divider/>
          <div className="form-separator"></div>

          <div className="input-container">
            <TextField
              id="certificateNumber-input"
              label="Certificate number"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>
          
          {
            <div className="form-button-container">
              <Button onClick={() => this.getData()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Validate
              </Button>
            </div>
          }
        </div>

         {
             this.state.loading ? 
             (this.CircularIndeterminate() ) 
             :
             (this.state.certificateShown && !this.state.certificateNotValid)?
                (<div>
                    <h2 className="input-container">Your certificate is valid!</h2>
                    <div className="form-separator"></div>
                    <div className="embeb-certificate-container">
                        <iframe src={"https://www.seliblockcert.tk/vows/"+this.state.hash} alt="Certificate" padding-left="100px" height="800" width="1400"/>
                    </div>
                </div>)
                :
                (!this.state.certificateShown && this.state.certificateNotValid)?
                  (<div></div>)
                  :
                  (<p></p>)
         } 
        
          

      </div>
    );
  }
}
