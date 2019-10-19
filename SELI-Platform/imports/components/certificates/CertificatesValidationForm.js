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
      
    fetch('http://201.159.223.92/datos', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(certificateInfo)
    }).then(res => res.json())
      .then(res => {
        if(res.validation === "true"){
          setTimeout(()=>{
          this.setState({
            certificateShown : true,
            certificateNotValid : false,
            loading: false,
            hash: certificateInfo.certificateHash});
            console.log(this.state)
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

  componentWillUnmount(){

  }

  componentDidMount(){

  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">
            Certificate Validation
          </div>
          <div className="form-subtitle">Please write the hash number of the certificate you want</div>
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
                        <iframe src={"http://201.159.223.92/vows/"+this.state.hash} alt="Certificate" padding-left="100px" height="800" width="1400"/>
                    </div>
                </div>)
                :
                (!this.state.certificateShown && this.state.certificateNotValid)?
                    (<div>
                      <h2 className="input-container">Sorry your certificate is not valid!</h2>
                      <div className="form-separator"></div>
                      <div className="exclamation-mark-container">
                          <img src="exclamation-mark.png" height="20%" width="20%"></img>
                      </div>
                  </div>)
                  :
                  (<p></p>)
         } 
        
          

      </div>
    );
  }
}
