const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
// Uso promify para que sea más facil leer el código
const { promisify } = require("util");

fs.open = promisify(fs.open);
fs.appendFile = promisify(fs.appendFile);
fs.close = promisify(fs.close);
fs.readdir = promisify(fs.readdir);

fs.readFile = promisify(fs.readFile);
const myReadFile = promisify(fs.readFile);
zlib.gzip = promisify(zlib.gzip);
fs.writeFile = promisify(fs.writeFile);
fs.truncate = promisify(fs.truncate);
const lib = {};

lib.baseDir = path.join(__dirname,"/../.logs/");

lib.append = async (file,str,callback) => {

  try {
    const fd = await fs.open(`${lib.baseDir}${file}.log`, "a");
    await fs.appendFile(fd,str+'\n');
    await fs.close(fd);
    callback(false);
  } catch (error) {
    callback(error)
    console.log(error);  
  }
  
}

lib.list = async (compressLogs, callback)=>{
  try {
    const files = await fs.readdir(lib.baseDir);
    const trimmedFileNames = [];
    
    files.forEach(fileName => {
      
      if(fileName.indexOf(".log") > -1){
        trimmedFileNames.push(fileName.replace(".log",""));
      }

      if( fileName.indexOf(".gz.b64") > -1 && compressLogs){
        trimmedFileNames.push(fileName.replace(".gz.b64",""));
      }
    });
  
    callback(false,trimmedFileNames);

  } catch (error) {
    callback(error,null);
  } 
}

lib.compress = async (logId,newFileId,callback) => {
  
  const sourceFile = logId+".log";
  const destFile = newFileId+".gz.b64";
  try {
    
   // const inputString = await fs.readFile(lib.baseDir+sourceFile,"utf8");
   const inputString = await myReadFile(lib.baseDir+sourceFile,"utf8");

    //compress data with gzip
    const buffer = await zlib.gzip(inputString);

    const fd = await fs.open(lib.baseDir+destFile,"wx");

    await fs.writeFile(fd,buffer.toString("base64"));
    await fs.close(fd);

    callback(false);
  } catch (error) {
     callback(error);
     console.log(error); 
  }
}

lib.decompress = async (fieldId, callback)=>{
  const fileName = fileId+".gz.b64";
  try {
//    const str = await fs.readFile(lib.baseDir+fileName,"utf8");
    const str = await myReadFile(lib.baseDir+fileName,"utf8");

    const inputBuffer = Buffer.from(str,"base64");
    const outputBuffer = zlib.unzip(inputBuffer);
    
    callback(false,outputBuffer.toString());
  } catch (error) {
    callback(error);
    console.log(error);
  }

}

lib.truncate = async (logId, callback)=>{
  
  try {
    await fs.truncate(lib.baseDir+logId+".log",0);
    callback(false);
  } catch (error) { 
    callback(error);
    console.log(error);
  }
}
module.exports = lib;
