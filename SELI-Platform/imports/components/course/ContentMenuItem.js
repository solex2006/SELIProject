import React from 'react';

import { GoTextSize } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import { MdVideocam } from "react-icons/md";
import { FaItunesNote } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { MdCode } from "react-icons/md";
import { DiUnitySmall } from "react-icons/di";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";

export default class ContentMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return(
      <div>
        {
          this.props.type === "text" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <GoTextSize className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Text</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "image" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <IoMdImages className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Image</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "video" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <MdVideocam className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Video</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "audio" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <FaItunesNote className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Audio</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "link" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <IoIosLink className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Link</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "unity" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <DiUnitySmall className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Unity</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "embebed" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <MdCode className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Embebed</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "pdf" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <FaRegFilePdf className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Pdf</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "compressed" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <GoPackage className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Compressed</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "h5p" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <div className="h5p-logo"></div>
              </div>
              <p className="course-creator-menu-text">H5P</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "quiz" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <FaRegQuestionCircle className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Quiz</p>
            </div>
          :
            undefined
        }
        {
          this.props.type === "activity" ?
            <div className="course-creator-menu-option">
              <div className="course-creator-menu-option-row">
                <FaPuzzlePiece className="course-creator-menu-icon" size={"1.45em"}/>
              </div>
              <p className="course-creator-menu-text">Activity</p>
            </div>
          :
            undefined
        }
      </div>
    );
  }
}
