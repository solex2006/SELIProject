import React, { Component } from 'react';

import ImageItem from './items/ImageItem'
import AudioItem from './items/AudioItem'
import TextItem from './items/TextItem'
import CompressedItem from './items/CompressedItem'
import EmbebedItem from './items/EmbebedItem'
import H5PItem from './items/H5PItem'
import ActivityItem from './items/ActivityItem'
import LinkItem from './items/LinkItem'
import PdfItem from './items/PdfItem'
import QuizItem from './items/QuizItem'
import VideoItem from './items/VideoItem'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  showControlMessage(){

  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        {
          this.props.course.organization.subunit ?
            <div>
              {
                this.props.course.program[this.props.selected[1]].lessons[this.props.selected[0]].items.map((item, index) => {
                  return(
                    <div>
                      {
                        item.type === "text" ?
                          <TextItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "image" ?
                          <ImageItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "video" ?
                          <VideoItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "audio" ?
                          <AudioItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "link" ?
                          <LinkItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "unity" ?
                          <UnityItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "embebed" ?
                          <EmbebedItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "pdf" ?
                          <PdfItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "compressed" ?
                          <CompressedItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "h5p" ?
                          <H5PItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "quiz" ?
                          <QuizItem item={item}/>
                        :
                        undefined
                      }
                      {
                        item.type === "activity" ?
                          <ActivityItem item={item}/>
                        :
                        undefined
                      }
                    </div>
                  )
                })
              }
            </div>
          :
          <div>
            {
              this.props.course.program[this.props.selected[0]].items.map((item, index) => {
                return(
                  <div>
                    {
                      item.type === "text" ?
                        <TextItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "image" ?
                        <ImageItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "video" ?
                        <VideoItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "audio" ?
                        <AudioItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "link" ?
                        <LinkItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "unity" ?
                        <UnityItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "embebed" ?
                        <EmbebedItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "pdf" ?
                        <PdfItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "compressed" ?
                        <CompressedItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "h5p" ?
                        <H5PItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "quiz" ?
                        <QuizItem item={item}/>
                      :
                      undefined
                    }
                    {
                      item.type === "activity" ?
                        <ActivityItem item={item}/>
                      :
                      undefined
                    }
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    )
  }
}
