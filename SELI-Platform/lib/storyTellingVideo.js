// https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
// Library for image, audio and video creation and format conversion.

var ffprobeInstaller = require('@ffprobe-installer/ffprobe')
const ffmpeg = require('fluent-ffmpeg');

import * as fs from 'fs';
import { Meteor } from "meteor/meteor";
import { Activities } from './ActivitiesCollection';
import CourseFilesCollection from "./CourseFilesCollection";
import * as os from 'os';
import * as path from "path";

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');


Meteor.methods({
  'saveAsVideo': (id, userId) => {
    const videoFileName = id.toString() + '.mp4';
    // Delete existing file
    const existingFile = CourseFilesCollection.findOne({ name: videoFileName })
    if (existingFile) {
      existingFile.remove((err) => {
        if (err) throw err;
      })
    }
    const story = Activities.findOne({ _id: id });
    // Create a list from story's scenes
    const files = createFileList(story);

    return new Promise((resolve, reject) => {
      // Creates video from image and audio
      getLangFromUser(userId)
        .then(val => {
          files.forEach(file => {
            file.lang = val;
          })
          return createTempSceneVideos(files)
        })
        .then(val => getAllMediaDuration(files))
        .then(val => mergeAllSubtitles(files))
        .then(val => {
          const videoFiles = files.map(file => file.video2);
          const mergedVideo = path.join(os.tmpdir(), videoFileName);
          return mergeVideoFiles(videoFiles, mergedVideo)
        })
        .then(val => {
          // Add new file to the 
          CourseFilesCollection.addFile(val, {
            fileName: id.toString() + '.mp4',
            type: 'video/mp4',
            meta: {}
          }, (err, fileRef) => {
            if (err) {
              fs.unlinkSync(val);
              throw err;
            } else {
              resolve(fileRef._id)
            }
          });
        })
        .catch(err => reject(err))
        .finally(() => {
          files.forEach(file => {
            if (file.temp) {
              fs.unlinkSync(file.video);
              fs.unlinkSync(file.video2);
              fs.unlinkSync(file.subtitle);
            }
          })
        })
    })
  }
})

const mergeAllSubtitles = (files) => {
  const taskList = [];
  let fileName = '';
  files.forEach(file => {
    taskList.push(mergeSubtitles(file))
  });

  return Promise.all(taskList);
}

const mergeSubtitles = (file) => {
  return new Promise((resolve, reject) => {
    const srtFileName = file.video.replace('mp4', 'srt');
    file.video2 = file.video.replace('.mp4', '2.mp4');
    const time = '00:00:00,000 --> ' + printDuration(file.duration) + '\n';
    srtContent = '1\n' + time + file.description[file.lang];
    fs.writeFile(srtFileName, srtContent, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        file.subtitle = srtFileName;
      }

      //ffmpeg.setFfmpegPath(ffmpegPath.path);
      //console.log("PATH",ffmpegPath.path)


      ffmpeg().setFfmpegPath(ffmpegInstaller.path.replace('app.asar', 'app.asar.unpacked'))
        .addInput(file.video)
        .output(file.video2)
        .outputFormat('mp4')
        .addOutputOption('-vf subtitles=' + srtFileName)
        .on('end', (ffmpegCmd) => {
          resolve(true);
        })
        .on('error', (err, stdout, stderr) => {
          reject(err);
        })
        .run();
    })
  })
}

const printDuration = (duration) => {
  const miliseconds = (duration % 1) * 1000;
  const seconds = Math.floor(duration);
  const dt = new Date(0, 0, 0, 0, 0, seconds, miliseconds);

  let strDuration = dt.getHours().toString().padStart(2, '0') + ':' +
    dt.getMinutes().toString().padStart(2, '0') + ':' +
    dt.getSeconds().toString().padStart(2, '0') + ',' +
    dt.getMilliseconds().toString().padEnd(3, '0');
  return strDuration;
}

const getLangFromUser = (userId) => {
  return new Promise((resolve, reject) => {
    const user = Meteor.users.findOne({ _id: userId });
    if (!user) reject('User not found');
    let lang = '';
    switch (user.profile.configuration.language) {
      case 'English (US)':
        lang = 'english';
        break;
      case 'Portuguese (PT)':
        lang = 'portuguese';
        break;
      case 'Spanish (ES)':
        lang = 'spanish';
        break;
      case 'Turkish (TR)':
        lang = 'turkish';
        break;
      case 'Polish (PL)':
        lang = 'polish';
        break;
      default:
        lang = 'english';
        break;
    }
    resolve(lang);
  })

}

const getAllMediaDuration = (files) => {
  const taskList = [];
  let fileName = '';
  files.forEach(file => {
    taskList.push(getMediaDuration(file))
  });

  return Promise.all(taskList);
}

const getMediaDuration = (file) => {
  return new Promise((resolve, reject) => {
    let fileName = file.video;
    if (fileName.length === 0) {
      file.duration = 5;
      resolve(false);
    } else {
      ffmpeg.ffprobe(fileName, (err, metadata) => { 
        if (err) {
          reject(err);
        } else {
          file.duration = metadata.format.duration;
          resolve(true);
        }
      })
    }
  })
}

const createTempVideoFileName = (image, audio) => {
  let fileName = '';
  if (image && image.length > 0) {
    fileName += path.basename(image).replace('.', '_').toString();
  }
  fileName += '__';
  if (audio && audio.length > 0) {
    fileName += path.basename(audio).replace('.', '_').toString();
  }
  return fileName.concat('.mp4')
}



// Create video from image and audio
const createTempSceneVideos = (files) => {
  const tempDir = os.tmpdir();
  const taskList = [];
  files.forEach(file => {
    if (!file.video) {
      const videoFileName = createTempVideoFileName(file.image, file.audio);
      file.video = path.join(tempDir, videoFileName);
      file.temp = true;
      taskList.push(mergeImageAndAudio(file.image, file.audio, file.video));
    } else {
      file.temp = false;
    }
  })

  return Promise.all(taskList);
}

// Get file paths of the scenes from CourseFileCollections
const createFileList = (story) => {
  const files = [];
  story.activity.data.forEach(data => {
    if (data.type !== 'end') {
      const tmpFile = {};
      let file;
      if (data.image && data.image._id.length > 0) {
        file = CourseFilesCollection.findOne({ _id: data.image._id });
        tmpFile.image = file.path;
      }
      if (data.audio && data.audio._id.length > 0) {
        file = CourseFilesCollection.findOne({ _id: data.audio._id });
        tmpFile.audio = file.path;
      }
      if (data.video && data.video._id.length > 0) {
        file = CourseFilesCollection.findOne({ _id: data.video._id });
        tmpFile.video = file.path;
      }
      tmpFile.description = data.description;
      files.push(tmpFile);
    }
  })
  return files;
}




// Merge an image and audio file into a video file.
const mergeImageAndAudio = (imageName, audioName, videoName) => {
  return new Promise((resolve, reject) => {
      let ffmpegCmd =ffmpeg().setFfmpegPath(ffmpegInstaller.path.replace('app.asar', 'app.asar.unpacked')) ;
    if (imageName && imageName.length > 0) {
      ffmpegCmd = ffmpegCmd.addInput(imageName).loop();
    }
    if (audioName && audioName.length > 0) {
      ffmpegCmd = ffmpegCmd.addInput(audioName)
    } else {
      ffmpegCmd.duration(5);
    }
    ffmpegCmd
      .size('1024x768')
      .autopad(true)
      .output(videoName)
      .audioCodec('aac')
      .videoCodec('libx264')
      .audioBitrate('192k')
      .outputOptions([
        '-shortest'
      ])
      .outputFormat('mp4')
      .on('end', (ffmpegCmd) => {
        // returns video filename. This will be auto generated file name, soon
        resolve(videoName);
      })
      .on('error', (err, stdout, stderr) => {
        reject(err);
      })
      .run();
  })

}

// Merges video files into a video file. This video file can be downloaded by users.
const mergeVideoFiles = (fileList, videoFileName) => {
  return new Promise((resolve, reject) => {
    const listFileName = videoFileName.replace('.', '_') + '.txt';
    let fileNames = '';

    fileList.forEach((fileName, index) => {
      fileNames = fileNames + 'file ' + fileName + '\n';
    });

    fs.writeFile(listFileName, fileNames, 'utf8', (err) => {

      if (err) return reject(err);

      ffmpeg().setFfmpegPath(ffmpegInstaller.path.replace('app.asar', 'app.asar.unpacked'))
        .input(listFileName)
        .inputOptions(['-f concat', '-safe 0'])
        .outputOptions('-c copy')
        .outputFormat('mp4')
        .on('end', () => {
          fs.unlinkSync(listFileName);
          resolve(videoFileName);
        })
        .on('error', (err, stdout, stderr) => {
          fs.unlinkSync(listFileName);
          reject(err);
        })
        .save(videoFileName)
    });
  })
}