import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class ListTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClearInput: false,
    }
  }

  clearSearchInput(){
    document.getElementById('search-input').value = "";
    document.getElementById('search-input').focus();
    this.props.resetSearch();
  }

  searchTutors(){
    let input = document.getElementById('search-input').value;
    if(input !== ""){
      this.props.searchTutors(input);
    }
    else {
      this.props.resetSearch();
    }
  }

  render() {
    return(
      <div>
        <div className="list-tools-container">
          <div className="search-container">
            <div className="search-icon"></div>
            <input onKeyUp={() => this.searchTutors()} id="search-input" className="search-input" placeholder={"Search " + this.props.type + "..."}></input>
            <div onClick={() => this.clearSearchInput()} className="clear-search-button"></div>
          </div>
          <div className="order-tool-container">
            <div onClick={() => this.props.ascOrder()} className="order-tool-asc"></div>
            <div onClick={() => this.props.desOrder()} className="order-tool-des"></div>
          </div>
        </div>
      </div>
    );
  }
}
