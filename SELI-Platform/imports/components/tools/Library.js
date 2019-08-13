import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BounceLoader from 'react-spinners/BounceLoader';

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

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filesPerRow: [],
      loading: true,
      results: false,
    }
  }

  checkLoadedFiles(){
    let results = false;
    if(this.state.files.length){
      results = true;
    }
    this.setState({
      results: results,

    }, () => {
      this.setState({
        loading: false,
      })
    });
  }

  getFilesUrl(){
    let files = this.state.files;
    for (var i = 0; i < files.length; i++) {
      let link = CourseFilesCollection.findOne({_id: files[i]._id}).link();
      files[i].link = link;
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


  render() {
    return(
      <div className="library-tool-container">
        {
          this.state.loading ?
            <div className="loading-library-container">
              <div className="loading-library-row">
                <div className="loading-library-container">
                  <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                </div>
                <p className="loading-library-text">{"Loading " + this.props.type + " "}{this.props.type === "image" || this.props.type === "video" ? "gallery" : "library"}</p>
              </div>
            </div>

          :
          undefined
        }
        {
          this.state.results ?
            <div className="files-result-container">
              {
                this.state.files.map((file, i) => {
                  return(
                    <div>
                      {
                        this.props.type === 'image' ?
                          <LibraryImage file={file}
                            pickFile={this.props.pickFile.bind(this)}
                            type={this.props.type}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            resetInputButton={this.props.resetInputButton.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        this.props.type === 'video' ?
                          <LibraryVideo file={file}
                            pickFile={this.props.pickFile.bind(this)}
                            type={this.props.type}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            resetInputButton={this.props.resetInputButton.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        this.props.type === 'audio' ?
                          <LibraryAudio file={file}
                            pickFile={this.props.pickFile.bind(this)}
                            type={this.props.type}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            resetInputButton={this.props.resetInputButton.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        this.props.type === 'pdf' ?
                          <LibraryPdf file={file}
                            pickFile={this.props.pickFile.bind(this)}
                            type={this.props.type}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            resetInputButton={this.props.resetInputButton.bind(this)}
                          />
                        :
                        undefined
                      }
                      {
                        this.props.type === 'compressed' ?
                          <LibraryCompressed file={file}
                            pickFile={this.props.pickFile.bind(this)}
                            type={this.props.type}
                            showControlMessage={this.props.showControlMessage.bind(this)}
                            resetInputButton={this.props.resetInputButton.bind(this)}
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
            {
              this.props.type === 'audio' ?
                <div className="empty-result-message">
                  <FaItunesNote size="1.5em" color="#9e9e9e"/>
                  <p className="result-library-text">{"No " + this.props.type + " files founded"}</p>
                </div>
              :
              undefined
            }
            {
              this.props.type === 'image' ?
                <div className="empty-result-message">
                  <IoMdImages size="1.5em" color="#9e9e9e"/>
                  <p className="result-library-text">{"No " + this.props.type + " files founded"}</p>
                </div>
              :
              undefined
            }
            {
              this.props.type === 'video' ?
                <div className="empty-result-message">
                  <MdVideocam size="1.5em" color="#9e9e9e"/>
                  <p className="result-library-text">{"No " + this.props.type + " files founded"}</p>
                </div>
              :
              undefined
            }
            {
              this.props.type === 'pdf' ?
                <div className="empty-result-message">
                  <FaRegFilePdf size="1.5em" color="#9e9e9e"/>
                  <p className="result-library-text">{"No " + this.props.type + " files founded"}</p>
                </div>
              :
              undefined
            }
            {
              this.props.type === 'compressed' ?
                <div className="empty-result-message">
                  <GoPackage size="1.5em" color="#9e9e9e"/>
                  <p className="result-library-text">{"No " + this.props.type + " files founded"}</p>
                </div>
              :
              undefined
            }
          </div>
        }
      </div>
    );
  }
}
