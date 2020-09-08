var pathToFfmpeg = require('ffmpeg-static');
  const {
    exec
  } = require("child_process");
  const fs = require('fs');
export function ImageProcess(file, imageWidthSizeByPx) {
  
  processCommand = pathToFfmpeg + " -i " + file.path + " -vf scale=" + imageWidthSizeByPx + ":-1 " + file.path +" -y" ;
  console.log(processCommand);
  const proc = exec(processCommand, function (error, stdout, stderr) {
    if (error) throw error;
    {
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
};
