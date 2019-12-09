import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import { Link } from '../routes';
import "../style.css";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import BaseLayout from './BaseLayout'

class CertificateLayout extends Component {
  state = {
    shareURL: ''
  }

  componentDidMount() {
    this.setState({ shareURL: window.location.href });
  }

  render() {
    return (
      <BaseLayout>
        <div className="Certificate-Layout">
          <div className="Certificate-Layout-Child">
          <div className="Certificate-Layout-Header">
            <div className="Social-Buttons">
              <FacebookShareButton url={ this.state.shareURL }>
                <FacebookIcon size={28} />
              </FacebookShareButton>
              <TwitterShareButton url={ this.state.shareURL }>
                <TwitterIcon size={28} />
              </TwitterShareButton>
            </div>
            <img className="Certificate-Layout-Image" src='/static/argyle.png'/>
            <h1 className="Cert-of-Marriage-Title"></h1>
            <div className="Cert-of-Marriage-Subtitle">CERTIFICATE OF ACCOMPLISHMENT</div>
          </div>

          { this.props.children }

          </div>
        </div>
      </BaseLayout>
    )
  }
}

export default CertificateLayout;
