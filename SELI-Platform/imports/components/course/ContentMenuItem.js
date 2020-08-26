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
import Divider from '@material-ui/core/Divider';

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
                  <p className="course-creator-menu-text">{this.props.language.text}</p>
                </div>
              }
              hint={this.props.language.textInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.image}</p>
                </div>
              }
              hint={this.props.language.imageInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.video}</p>
                </div>
              }
              hint={this.props.language.videoInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.audio}</p>
                </div>
              }
              hint={this.props.language.audioInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.quiz}</p>
                </div>
              }
              hint={this.props.language.quizInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.activity}</p>
                </div>
              }
              hint={this.props.language.activityInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.link}</p>
                </div>
              }
              hint={this.props.language.linkInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.unity}</p>
                </div>
              }
              hint={this.props.language.unityInfoHelp}
              placement="left"
            />
          :
            undefined
        }
        {
          this.props.type === "embedded" ?
            <Hint
              node={
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdCode className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">{this.props.language.embedded}</p>
                </div>
              }
              hint={this.props.language.embeddedInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.pdf}</p>
                </div>
              }
              hint={this.props.language.pdfInfoHelp}
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
                  <p className="course-creator-menu-text">{this.props.language.compressed}</p>
                </div>
              }
              hint={this.props.language.compressedInfoHelp}
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
              hint={this.props.language.h5pInfoHelp}
              placement="left"
            />
          :
            undefined
        }
      </div>
    );
  }
}
