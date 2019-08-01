import React from 'react';
import Button from '@material-ui/core/Button';

import Unit from './Unit';

import BottomMenu from '../navigation/BottomMenu';

import { MdShortText } from "react-icons/md";
import { MdImage } from "react-icons/md";
import { MdVideocam } from "react-icons/md";
import { MdMusicNote } from "react-icons/md";
import { MdLink } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";
import { DiCode } from "react-icons/di";
import { DiUnitySmall } from "react-icons/di";

export default class CourseCreatorTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [
        {
          name: 'Basics',
          ordinal: 1,
          lessons: [
            {
              ordinal: 1,
              name: 'introducction',
            },
            {
              ordinal: 2,
              name: 'Enviroment',
            },
          ]
        },
        {
          name: 'Training',
          ordinal: 2,
          lessons: [
            {
              ordinal: 1,
              name: 'introducction',
            },
          ]
        },
        {
          name: 'Advanced',
          ordinal: 3,
          lessons: [
            {
              ordinal: 1,
              name: 'introducction',
            },
            {
              ordinal: 1,
              name: 'introducction',
            },
          ]
        },
      ],
    }
  }

  setMenu(option){

  }

  render() {
    return(
      <div>
        <div className="course-creator-container">
          <div className="course-creator-units-container">
            {
              this.state.units.map(units => {
                return(
                  <Unit
                    unit={units}
                    key={units.ordinal}
                  />
                )
              })
            }
            <Button className="new-tool-button" color="secondary">New unit</Button>
          </div>
          <div className="course-creator-work-area">
            <div className="course-creator-drop-area">

            </div>
            <div className="course-creator-menu-area">
              <div className="course-creator-menu-row">
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdShortText className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Text</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdImage className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Image</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdVideocam className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Video</p>
                </div>
              </div>
              <div className="course-creator-menu-row">
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdMusicNote className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Audio</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <MdLink className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Link</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <DiUnitySmall className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Unity</p>
                </div>
              </div>
              <div className="course-creator-menu-row">
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <DiCode className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Embebed</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaFilePdf className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Pdf</p>
                </div>
                <div className="course-creator-menu-option">
                  <div className="course-creator-menu-option-row">
                    <FaFileArchive className="course-creator-menu-icon" size={"1.45em"}/>
                  </div>
                  <p className="course-creator-menu-text">Compressed</p>
                </div>
              </div>
              <BottomMenu
                setMenu={this.setMenu.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
