const crypto = require("crypto");
const config = require("./config");
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

module.exports = helpers;