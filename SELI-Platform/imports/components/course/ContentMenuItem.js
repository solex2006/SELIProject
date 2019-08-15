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

import Hint from '../tools/Hint';

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
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <GoTextSize className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Text</p>
                </div>
              }
              hint="Create titles, subtitles and custom paragraphs or text sections."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "image" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <IoMdImages className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Image</p>
                </div>
              }
              hint="Upload or select images to create content with text sections optionally."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "video" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdVideocam className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Video</p>
                </div>
              }
              hint="Upload or select videos to create content with text sections optionally."
              placement="left"
            />
          :
          undefined
        }
        {
          this.props.type === "audio" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaItunesNote className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Audio</p>
                </div>
              }
              hint="Upload or select audios to create content with text sections optionally."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "link" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <IoIosLink className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Link</p>
                </div>
              }
              hint="Insert link or custom text with links."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "unity" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <DiUnitySmall className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Unity</p>
                </div>
              }
              hint="Select one unity game from our library"
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "embebed" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdCode className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Embebed</p>
                </div>
              }
              hint="Embebed"
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "pdf" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaRegFilePdf className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Pdf</p>
                </div>
              }
              hint="Upload or select pdfs, adding an instruction about what the student has to do with it."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "compressed" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <GoPackage className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Compressed</p>
                </div>
              }
              hint="Upload or select compressed files (.rar, .zip, 7z, etc.), adding an instruction about what the student has to do with it."
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "h5p" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <div className="h5p-logo"></div>
                  </div>
                  <p className="course-creator-menu-text">H5P</p>
                </div>
              }
              hint="Insert any H5P content"
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "quiz" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaRegQuestionCircle className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Quiz</p>
                </div>
              }
              hint="Create a quiz for this part of the course"
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "activity" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaPuzzlePiece className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Activity</p>
                </div>
              }
              hint="Create an activity for this part of the course"
              placement="left"
            />
          :
            undefined
        }
      </div>
    );
  }
}
