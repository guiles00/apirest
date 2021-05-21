const crypto = require("crypto");
const config = require("./config");
const querystring = require("querystring");
const https = require("https");


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
     // console.log(requestDetails);
     // console.log(payload)
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

module.exports = helpers;