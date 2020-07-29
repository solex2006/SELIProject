import React from 'react';
import ImageItem from './ImageItem';
import AudioItem from './AudioItem';
import TextItem from './TextItem';
import CompressedItem from './CompressedItem';
import EmbeddedItem from './EmbeddedItem';
import H5PItem from './H5PItem';
import ActivityItem from './ActivityItem';
import LinkItem from './LinkItem';
import PdfItem from './PdfItem';
import QuizItem from './QuizItem';
import VideoItem from './VideoItem';

export default class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <React.Fragment>
        {
          this.props.arrayOfItems.map(item => {
            return(
              <div>
                {
                  item.type === "text" ?
                    <TextItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "image" ?
                    <ImageItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "video" ?
                    <VideoItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      openMediaPlayer={this.props.fromTutor ? undefined : this.props.openMediaPlayer.bind(this)}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "audio" ?
                    <AudioItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      openMediaPlayer={this.props.fromTutor ? undefined : this.props.openMediaPlayer.bind(this)}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "link" ?
                    <LinkItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "unity" ?
                    <UnityItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "embedded" ?
                    <EmbeddedItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      loadingEmbedded={this.props.language.loadingEmbedded}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "pdf" ?
                    <PdfItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "compressed" ?
                    <CompressedItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
                {
                  item.type === "h5p" ?
                    <H5PItem
                      item={item}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      instructions={this.props.language.instructions}
                      loadingH5p={this.props.language.loadingH5p}
                      key={Math.random()}
                    />
                  :
                  undefined
                }
                {
                  item.type === "quiz" ?
                  <div>
                    <QuizItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      toResolve={this.props.toResolve}
                      course={this.props.courseId}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      completeActivity={this.props.fromTutor ? undefined : this.props.completeActivity.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  </div>
                    
                  :
                  undefined
                }
                {
                  item.type === "activity" ?
                    <ActivityItem
                      fromTutor={this.props.fromTutor ? this.props.fromTutor : undefined}
                      item={item}
                      toResolve={this.props.toResolve}
                      handleControlMessage={this.props.handleControlMessage.bind(this)}
                      completeActivity={this.props.fromTutor ? undefined : this.props.completeActivity.bind(this)}
                      key={Math.random()}
                      language={this.props.language}
                    />
                  :
                  undefined
                }
              </div>
            )
          })
        }
      </React.Fragment>
    );
  }
}
