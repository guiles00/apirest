/*Library for storing and editing data*/
  const fs = require("fs");
  const path = require("path");

  /*Esto lo pongo yo, para que sea mas facil el uso de los callbacks*/
  const { promisify } = require("util");
  const helpers = require("./helpers");

  //Container for the module (to be exported)
  var lib = {};
  // Base directory of the data folder
  lib.baseDir = path.join(__dirname,"/../.data/");

  //Promisify the functions
  fs.unlink = promisify(fs.unlink); 
  
  const myReadFile = promisify(fs.readFile); 
  
  fs.open = promisify(fs.open);
  fs.writeFile = promisify(fs.writeFile);
  fs.close = promisify(fs.close);
  fs.truncate = promisify(fs.truncate);

  lib.create = async function(dir,filename,data,callback){
    
    const stringData = JSON.stringify(data);

    try{
      const fd = await fs.open(`${lib.baseDir}${dir}/${filename}.json`, "wx");
      
      const res = await fs.writeFile(fd,stringData);
      
      if(!res){
        await fs.close(fd);
        callback(false)
      }
    }catch(err){
      callback(err);
      console.log(err);
    }

  };

  // Read data from a file
  lib.read = async function(dir,filename,callback){

    try {
     // const data = await fs.readFile(`${lib.baseDir}${dir}/${filename}.json`,"utf8");
     const data = await myReadFile(`${lib.baseDir}${dir}/${filename}.json`,"utf8");
      
     const parsedData = helpers.parseJsonToObject(data);
      
      callback(null,parsedData);
    } catch (err){
      callback(err,null)
    } 
  }

  // The old way
  lib.update = async function(dir,filename,data,callback){

    const fd = await fs.open(`${lib.baseDir}${dir}/${filename}.json`, "r+");

    if(fd){
      const stringData = JSON.stringify(data);
      
      const errTruncate = await fs.truncate(fd);
      if(errTruncate) return callback("Error truncating file");

      const writeErr = await fs.writeFile(fd,stringData)
      if(writeErr) return callback("Error writing to existing file");

      const errClose = await fs.close(fd);
      if(errClose) return callback("Error closing the file");

      callback(false);

    }else{

      callback("Could not open the file for updating");

    }

  }

  lib.delete = async function(dir,filename,callback){
    // Unlink the file from the fs
    const res = await fs.unlink(`${lib.baseDir}${dir}/${filename}.json`);
    console.log(res);
    callback(res)
  }

  // List all the items in a directory
  lib.list = function(dir,callback){
    fs.readdir(lib.baseDir+dir+'/', function(err,data){
      if(!err && data && data.length > 0){
        var trimmedFileNames = [];
        data.forEach(function(fileName){
          trimmedFileNames.push(fileName.replace('.json',''));
        });
        callback(false,trimmedFileNames);
      } else {
        callback(err,data);
      }
    });
  };

  module.exports = lib;