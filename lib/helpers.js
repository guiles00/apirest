const crypto = require("crypto");
const config = require("./config");
const querystring = require("querystring");
const https = require("https");
const path = require("path");
const fs = require("fs");
const helpers = {};

helpers.hash = (string)=>{
  
  if(typeof(string) ==="string" && string.length > 0){
    const hash = crypto.createHmac("sha256",config.hashingSecret).update(string).digest("hex");
    return hash;
  }else{
    return false;
  }

};

helpers.parseJsonToObject = (string) =>{
  try {
    const obj = JSON.parse(string);
    return obj;
  } catch (error) {
    return {}
  }
}

helpers.createRandomString = (stringLength) =>{
  stringLength = typeof(stringLength) === "number" && stringLength > 0 ? stringLength: false;
  if(stringLength){
    const posibleCharacters = "abcdefghijklmnopqrstxyz0123456789";
    let str = "";
    for(let i=1;i<=stringLength;i++){
      const randomCharacter = posibleCharacters.charAt(Math.floor(Math.random()*posibleCharacters.length));
      str+=randomCharacter;
    }

    return str;
  }else{
    return false;
  }
};

// Send an SMS message via Twilio
helpers.sendTwilioSms = function(phone,msg,callback){
  phone = typeof(phone) === "string" && phone.trim().length > 8
    ? phone.trim()
    : false;

  msg = typeof(msg) === "string" && msg.trim().length > 0 
    && msg.trim().length <= 1600 
    ? msg.trim()
    : false;

    if(phone && msg){
      
      const payload = {
        "From": config.twilio.fromPhone,
        "To":"+1"+phone,
        "Body": msg
      };
      
      //JSON.stringify(payload)
      const stringPayload = querystring.stringify(payload);
      const requestDetails = {
        "protocol": "https:",
        "hostname": "api.twilio.com",
        "method": "GET",
        "path": "/2010-04-01/Accounts/"+config.twilio.accountSid+"/Messages.json",
        "auth": config.twilio.accountSid+":"+config.twilio.authToken,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(stringPayload)
        }
      }
      
      // Instanciate the request
      const req = https.request(requestDetails,(res)=>{
        const status = res.statusCode;
        
        console.log(status)
        
        if(status === 200 || status === 201){
          callback(false);
        }else{
          callback("status code:"+status);
        }
      });

      req.on("error",(err)=>{
        callback(err);
      });

      req.write(stringPayload);
      req.end();

    }else{
      callback("Parameters invalid");
    }
}

helpers.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) === "string" && templateName.length > 0
    ? templateName
    : false;

    if(templateName){
      const templateDir = path.join(__dirname,"/../templates/");
      fs.readFile(templateDir+templateName+".html","utf8",function(err,str){
        if(!err && str && str.length > 0){
          const finalString = helpers.interpolate(str,data);
          callback(false,finalString);
        }else{
          callback("No template could be found");
        }
      });
    }else{
      callback("A valid template name was not specified")
    }
};

//Add header and footer
helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) === "string" && str.length > 0 ? str : "";
  data = typeof(data) === "object" && data !== null ? data : {};
  //Header
  helpers.getTemplate("_header",data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      helpers.getTemplate("_footer",data,function(err,footerString){
        if(!err && footerString){
          const fullString = headerString+str+footerString;
          callback(false,fullString);
        }else{
          callback("Could not find footer");
        }
      });

    }else{
      callback("Could not find the header template");
    }
  });
}

//Parse template
helpers.interpolate = function(str,data){
  str = typeof(str) === "string" && str.length > 0 ? str : "";
  data = typeof(data) === "object" && data !== null ? data : {};

  //Globals
  for(let keyName in config.templateGlobals){
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data["global."+keyName] = config.templateGlobals[keyName];
    }
  }

  for(let key in data){
    if(data.hasOwnProperty(key) && typeof(data[key] === "string")){
      let replace = data[key];
      let find = '{'+key+'}';
      str = str.replace(find,replace);
    }
  }

  return str;
}

helpers.tryReadFile = function(filename,callback){
  const publicDir = path.join(__dirname,"/../public/");
  console.log("inside read");
  console.log(fs.readFile.toString());
  fs.readFile(publicDir+"app.js","utf8",function(err,data){
    if(err){
      console.log(err);
      callback("err");
    } else{
      callback(data)
    }

  });
}

helpers.getStaticAsset = async function(filename, callback){

  filename = typeof(filename) === "string" && filename.length > 0
    ? filename
    : false;

    if(filename){

    const publicDir = path.join(__dirname,"/../public/");
    
    try {

      const data = await fs.readFile(publicDir+filename);
    
      callback(false,data);
      
    } catch (error) {
      callback("No file could be found");  
    }

  }else{
    callback("A valid file name was not specified");
  } 
};

module.exports = helpers;