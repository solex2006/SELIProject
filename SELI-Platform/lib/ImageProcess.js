import {
  Console
} from 'console';

var pathToFfmpeg = require('ffmpeg-static');
const {
  exec
} = require("child_process");
const fs = require('fs');
export function ImageProcess(file, imageWidthSizeByPx) {
  console.log(file)
  if (file.type.includes("image")) {
    processCommand = pathToFfmpeg + " -i " + file.path + " -vf scale=" + imageWidthSizeByPx + ":-1 " + file.path + " -y";
    console.log(processCommand);

    const proc = exec(processCommand, function (error, stdout, stderr) {
      if (error) throw error; {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      }
    });



    proc.on('exit', (code) => {
      proc.kill("SIGABRT");
      proc.kill("SIGKILL");
      console.log('Process completed. Result code:  ' + code);
    });
    debugger;
    console.log(pathToFfmpeg);
  }
  if (file.type.includes("video")) {

    processCommand = pathToFfmpeg + " -i " + file.path + " -vcodec libx264 -crf 27 -preset veryfast  -vf scale=" + imageWidthSizeByPx + ":-1 /home/mfx/SeliCourseFiles/reduced.mp4 -b:v 6M -r 20";
    console.log(processCommand);

    const proc = exec(processCommand, function (error, stdout, stderr) {
      if (error) throw error; {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      }
    });



    proc.on('exit', (code) => {
      proc.kill("SIGABRT");
      proc.kill("SIGKILL");
      console.log('Process completed. Result code:  ' + code);
    });
    debugger;
    console.log(pathToFfmpeg);
  }
}