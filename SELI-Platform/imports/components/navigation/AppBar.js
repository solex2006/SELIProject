import React from 'react';
import LanguageSelector from './LanguageSelector';
import Button from '@material-ui/core/Button';
import { MdSearch } from "react-icons/md";
export default class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  setLanguage(){

  }

  render() {
    return(
      <div>
        <div className="app-bar-container">
          <p className="bar-title">SELI Project</p>
          <div className="bar-button-container">
            <Button className="no-text-button">
              <MdSearch
                color={ "#FFFFFF" }
                size={ "1.75em" }
              />
            </Button>
            <Button color="primary" className="bar-button">
              sign in
            </Button>
            <Button color="secondary" className="bar-button">
              sign up
            </Button>
            <LanguageSelector
              setLanguage={this.setLanguage.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
