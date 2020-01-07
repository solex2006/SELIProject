import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Loading from '../tools/Loading';

import LibraryImage from './LibraryImage';
import LibraryVideo from './LibraryVideo';
import LibraryAudio from './LibraryAudio';
import LibraryPdf from './LibraryPdf';
import LibraryCompressed from './LibraryCompressed';

import CourseFilesCollection from '../../../lib/CourseFilesCollection';

import { IoMdImages } from "react-icons/io";
import { MdVideocam } from "react-icons/md";
import { FaItunesNote } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import SortIcon from '@material-ui/icons/Sort';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LabelIcon from '@material-ui/icons/Label';
import FilterNoneIcon from '@material-ui/icons/FilterNone';

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: undefined,
      filesPerRow: [],
      loading: true,
      results: false,
      options: [
        {label: this.props.language.date, value: 'date', icon: <DateRangeIcon/>},
        {label: this.props.language.Favorite, value: 'favorite', icon: <FavoriteIcon/>},
        {label: this.props.language.name, value: 'name', icon: <LabelIcon/>},
        {label: this.props.language.none, value: 'none', icon: <FilterNoneIcon/>},
      ],
      selectedIndex: 3,
    }
  }

  checkLoadedFiles(){
    let loading = true;
    let results = false;
    let files = this.state.files;
    files !== undefined ? loading = false : undefined;
    files.length ? results = true : undefined;
    this.setState({
      loading: loading,
      results: results,
    })
  }

  getFilesUrl(){
    let files = this.state.files;
    for (var i = 0; i < files.length; i++) {
      let link = CourseFilesCollection.findOne({_id: files[i]._id}).link();
      files[i].link = link;
      if (this.props.type === 'compressed') {
        files[i].isCompressed = true;
      }
    }
    this.setState({
      files: files,
    }, () => this.checkLoadedFiles());
  }

  searchUserFiles(){
    Tracker.autorun(() => {
      let files = CourseFilesCollection.find({isImage: this.props.type === 'image', isVideo: this.props.type === 'video', isAudio: this.props.type === 'audio', isPDF: this.props.type === 'pdf', 'meta.userId': this.props.user}).fetch();
      this.setState({
        files: files,
      }, () => {
        this.getFilesUrl();
      });
    });
  }

  componentDidMount(){
    this.searchUserFiles();
  }

  getLibraryIcon(){
    if (this.props.type === "image") {
      return(<IoMdImages size="3.5em" color="#9e9e9e"/>);
    }
    if (this.props.type === "audio") {
      return(<FaItunesNote size="3.5em" color="#9e9e9e"/>)
    }
    if (this.props.type === "video") {
      return(<MdVideocam size="3.5em" color="#9e9e9e"/>)
    }
    if (this.props.type === "pdf") {
      return(<FaRegFilePdf size="3.5em" color="#9e9e9e"/>)
    }
    if (this.props.type === "compressed") {
      return(<GoPackage size="3.5em" color="#9e9e9e"/>)
    }
  }

  handleClickListItem(event) {
    this.setState({
      anchorEl: event.target
    });
  }

  handleMenuItemClick(event, index) {
    this.setState({
      anchorEl: null,
      selectedIndex: index,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
    });
  }

  sortByAttribute(attribute){
    var sortJsonArray = require('sort-json-array');
  }

  changeSortWay(attribute){
    this.setState({
      sortWay: !this.state.sortWay,
    });
  }

  render() {
    return(
      <div className="library-tool-container">
        {
          this.state.loading ?
            <Loading message={`Loading ${this.props.type}s`}/>
          :
          <div>
            {
              this.state.results ?
                <Paper className="library-results-header">
                  <Tooltip title={this.props.language.back}>
                    <IconButton onClick={() => this.props.hideLibrary()} color="primary" size="medium" aria-label="filter list">
                      <ArrowBackIcon />
                    </IconButton>
                  </Tooltip>
                  <InputBase
                    placeholder={`${this.props.language.searchInLibrary} ...`}
                    inputProps={{ 'aria-label': 'search in library' }}
                    className="library-search-input"
                  />
                  <Tooltip title={this.props.language.search}>
                    <IconButton aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={this.props.language.order}>
                    <IconButton color="primary" size="medium" aria-label="filter list">
                      <ArrowUpwardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={this.props.language.filter}>
                    <IconButton color="primary" onClick={() => this.handleClickListItem(event)} size="medium" aria-label="filter list">
                      <SortIcon style={{pointerEvents: "none"}} />
                    </IconButton>
                  </Tooltip>
                  <Popover
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={() => this.handleClose()}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    className="form-selector-container"
                  >
                    <p className="form-selector-options-title">{this.props.language.filterBy}</p>
                    <Divider/>
                    <List dense className="form-selector-options-list">
                      {this.state.options.map((option, index) => {
                        return (
                          <ListItem className="form-selector-options-list-item" onClick={() => this.handleMenuItemClick(event, index)} key={option.label} button>
                            <ListItemIcon>
                              {option.icon}
                            </ListItemIcon>
                            <ListItemText id={option.label} primary={`${option.label}`} />
                            <ListItemSecondaryAction>
                              <Checkbox
                                edge="end"
                                onClick={() => this.handleMenuItemClick(event, index)}
                                checked={this.state.selectedIndex === index}
                                inputProps={{ 'aria-labelledby': option.label }}
                                color="primary"
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Popover>
                </Paper>
              :
              undefined
            }
            <div className="library-results-container">
              {
                this.state.results ?
                  <div className="library-files-container">
                    {
                      this.state.files.map((file, index) => {
                        return(
                          <div>
                            {
                              this.props.type === "image" ?
                                <LibraryImage
                                  file={file}
                                  getFileInformation={this.props.getFileInformation.bind(this)}
                                  language={this.props.language}
                                />
                              :
                              undefined
                            }
                            {
                              this.props.type === "video" ?
                                <LibraryVideo
                                  file={file}
                                  getFileInformation={this.props.getFileInformation.bind(this)}
                                  language={this.props.language}
                                />
                              :
                              undefined
                            }
                            {
                              this.props.type === "audio" ?
                                <LibraryAudio
                                  file={file}
                                  getFileInformation={this.props.getFileInformation.bind(this)}
                                  language={this.props.language}
                                />
                              :
                              undefined
                            }
                            {
                              this.props.type === "pdf" ?
                                <LibraryPdf
                                  file={file}
                                  getFileInformation={this.props.getFileInformation.bind(this)}
                                  language={this.props.language}
                                />
                              :
                              undefined
                            }
                            {
                              this.props.type === "compressed" ?
                                <LibraryCompressed
                                  file={file}
                                  getFileInformation={this.props.getFileInformation.bind(this)}
                                  language={this.props.language}
                                />
                              :
                              undefined
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                :
                <div className="empty-result-container">
                  <div className="empty-result-message">
                    {this.getLibraryIcon()}
                    {
                      this.props.type === "image" ?
                        <p className="result-library-text">{this.props.language.noImageFounded}</p> : undefined
                    }
                    {
                      this.props.type === "video" ?
                        <p className="result-library-text">{this.props.language.noVideoFounded}</p> : undefined
                    }
                    {
                      this.props.type === "audio" ?
                        <p className="result-library-text">{this.props.language.noAudioFounded}</p> : undefined
                    }
                    {
                      this.props.type === "pdf" ?
                        <p className="result-library-text">{this.props.language.noPdfFounded}</p> : undefined
                    }
                    {
                      this.props.type === "compressed" ?
                        <p className="result-library-text">{this.props.language.noCompressedFounded}</p> : undefined
                    }
                  </div>
                  <Button className="form-big-button" onClick={() => this.props.hideLibrary()} color="primary">{this.props.language.backToUploadFiles}</Button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}
