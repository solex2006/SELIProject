import { FilesCollection } from 'meteor/ostrio:files';
import {   ImageProcess } from "./ImageProcess";
const CourseFilesCollection = new FilesCollection({
  storagePath: '/home/mfx/SeliCourseFiles',
  downloadRoute: '/home/mfx/SeliCourseFiles',
  collectionName: 'CourseFilesCollection',
  permissions: 0o755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000',
  // Read more about cacheControl: https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
  onbeforeunloadMessage() {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onAfterUpload(file) {
  
     ImageProcess(file,1920);
   

    
  
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    // Note: You should never trust to extension and mime-type here
    // as this data comes from client and can be easily substitute
    // to check file's "magic-numbers" use `mmmagic` or `file-type` package
    // real extension and mime-type can be checked on client (untrusted side)
    // and on server at `onAfterUpload` hook (trusted side)
    //console.log("enCoursefilescollection",file ,file.type, file.isImage, file.ext, file.meta.tipo)
    //let type=file.type.split("/")
    if (file.size <= 104857600) {
      return true;
      /* if(type[0]==='image'){
        if (/png|jpg|tif|gif|jpeg|bmp|psd|ai|cdr|svg|raw|nef/i.test(file.extension)) { //for images only
          return true;
        }
      } else if(type[0]==='video'){
        if (/mkv|mp4|webm|webm|m4v|mov|mpg|mpeg|avi|asf|asx|lsf|swf|wmv|div|divx|dvd|wob|ivt|m1v|mp2v|mpa|mpe|mpv2/i.test(file.extension)) { //for video only
          return true;
        }
      } else if(type[0]==='audio'){
        if (/mp3|wav|m4a|mp4|aiff|au|mid|midi|wav|wma|cda|ogg|ogm|acc|ac3|flag|aym/i.test(file.extension)) { //for audio only
          return true;
        }
      } else if(type[0]==='text'){
        if (/vtt|srt/i.test(file.extension)) { //for vtt only
          return true;
        }
      } else if(type[0]==='application'){
        if (/pdf|rar|zip|7z|tar.gz|xz|gz|exe|tar|war|tar.xz|jar|odt|vnd.rar/i.test(file.extension)) { //for compressed and pdf only
          return true;
        }
      } else if((type[0]==="excel" || type[0]==="word" || type[0]==="power point") ){ // && (type[1]==='vnd.ms-excel'||type[1]==='docx')
        return true;
      } else {
        return false;
      } */
    } else {
      return false;
    }
  },
  downloadCallback(fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      CourseFilesCollection.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  }
});
// Export FilesCollection instance, so it can be imported in other files
export default CourseFilesCollection;
