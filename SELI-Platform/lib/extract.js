import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'Extract'(file){
    return extractFiles(file);
  }
});

async function extractFiles(file) {
  let fileName = file.name.toString().split('.');
  let extracted = true;
  let extract = [];
  let message = "";
  let loaderJs = false;
  let loaderPath = "..\\..\\data\\UnityFiles" + "\\" + fileName[0] + "\\Build\\UnityLoader.js";
  let buildJSON = false;
  let buildPath = "..\\..\\data\\UnityFiles" + "\\" + fileName[0] + "\\Build\\" + fileName[0] + ".json";
  var unrar = require('unrar.js');
  var util = require('util');
  var fs = require("fs");
  const path = require('path');
  var extractor = util.promisify(unrar.unrar);
  try {
    extract = await extractor(file.path, "../../data/UnityFiles");
    for (var i = 0; i < extract.length; i++) {
      if (extract[i] === buildPath) {
        buildJSON = true;
      }
      if (extract[i] === loaderPath) {
        loaderJs = true;
      }
    }
  } catch (e) {
    console.log(`Error ${e}`);
    if (e) {
      extracted = false;
    }
  }
  if (!(buildJSON && loaderJs && extracted)) {
    for (var i = 0; i < extract.length; i++) {
      if (extract[i] !== null) {
        fs.unlinkSync(extract[i].toString());
      }
    }
    cleanEmptyFolders("../../data/UnityFiles/");
  }
  return {extracted: extracted, buildJSON: {founded: buildJSON, path: buildPath}, loaderJs: {founded: loaderJs, path: loaderPath}};
}

function cleanEmptyFolders(folder) {
    var fs = require('fs');
    var path = require('path');

    var isDir = fs.statSync(folder).isDirectory();
    if (!isDir) {
      return;
    }
    var files = fs.readdirSync(folder);
    if (files.length > 0) {
      files.forEach(function(file) {
        var fullPath = path.join(folder, file);
        cleanEmptyFolders(fullPath);
      });

      // re-evaluate files; after deleting subfolder
      // we may have parent folder empty now
      files = fs.readdirSync(folder);
    }

    if (files.length == 0) {
      console.log("removing: ", folder);
      fs.rmdirSync(folder);
      return;
    }
  }
