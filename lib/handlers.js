/* Request handlers */

const config = require("./config");
const _data = require("./data");
//const { randomBytes } = require("crypto");
const helpers = require("./helpers");

// Define the handlers
const handlers = {};

/*
* HTML Handlers
*/
// Index handler
handlers.index = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Uptime Monitoring",
      "head.description":"This is a Class",
      "body.class":"index"
    }

    //Read in a template as a string
    helpers.getTemplate("index",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
}


//favicon
handlers.favicon = function(data, callback){
  if(data.method ==="get"){
    helpers.getStaticAsset("favicon.ico",function(err,data){
      if(!err && data){
        callback(200,data,"favicon");
      }else{
        console.log(err);
        callback(500);
      }
    });
  }else{
    callback(405);
  }
};

handlers.accountCreate = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Create an Account",
      "head.description":"Signup is easy and only takes a few seconds",
      "body.class":"acountCreate"
    }

    //Read in a template as a string
    helpers.getTemplate("accountCreate",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.sessionCreate = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Login to your Account",
      "head.description":"Please enter your phone number and password",
      "body.class":"sessionCreate"
    }

    //Read in a template as a string
    helpers.getTemplate("sessionCreate",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.sessionDeleted = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Logout",
      "head.description":"Logout",
      "body.class":"sessionDeleted"
    }

    //Read in a template as a string
    helpers.getTemplate("sessionDeleted",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.accountEdit = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Account Settings",
      "body.class":"accountEdit"
    }

    //Read in a template as a string
    helpers.getTemplate("accountEdit",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.accountDeleted = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Account Deleted",
      "head.description":"Account Deleted",
      "body.class":"accountDeleted"
    }

    //Read in a template as a string
    helpers.getTemplate("accountDeleted",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.checksCreate = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "Create a New Check",
      
      "body.class":"checksCreate"
    }
    //Read in a template as a string
    helpers.getTemplate("checksCreate",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

handlers.checksList = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "List the checks",
      "body.class":"checksList"
    }
    //Read in a template as a string
    helpers.getTemplate("checksList",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};


handlers.checksEdit = function(data, callback){
  if(data.method === "get"){
    // Prepare data for interpolation
    let templateData = {
      "head.title": "List the checks",
      "body.class":"checksEdit"
    }
    //Read in a template as a string
    helpers.getTemplate("checksEdit",templateData,(err,str)=>{
      if(!err && str){
        //Add header and footers
        helpers.addUniversalTemplates(str,templateData,(err,str)=>{
          if(!err && str){
            callback(200,str,"html");
          }else{
            callback(500,undefined,"html");
          }
        });

      }else{
        callback(500,undefined,"html");
      }
    });
  }else{
    callback(405,undefined,"html");
  }
};

//public
handlers.public = function(data, callback){
  
  if(data.method === "get"){
    const trimmedAssetName = data.trimmedPath.replace("public/","").trim();
   
    if(trimmedAssetName.length > 0){

      helpers.getStaticAsset(trimmedAssetName, function(err,data){
       
        if(!err && data){
          let contentType = "plain";
          
          if(trimmedAssetName.indexOf(".css") > -1){
            contentType = "css";
          }
          
          if(trimmedAssetName.indexOf(".png") > -1){
            contentType = "png";
          }

          if(trimmedAssetName.indexOf(".jpg") > -1){
            contentType = "jpg";
          }

          if(trimmedAssetName.indexOf(".ico") > -1){
            contentType = "ico";
          }
       
          callback(200,data,contentType);
        }else{
          callback(404);
        }
      });

    }else{
      callback(404);
    }

  }else{
    callback(405);
  }
};


/*
* JSON API handlers
*/ 

handlers.users = (data, callback) =>{
  const acceptableMethods = ["post","get","put","delete"];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  }else{
    callback(405);
  }
}

// Users
handlers._users = {};

// Data: name,lastname,phone,password,tosAgreement
handlers._users.post =  (data, callback) => {  
  
  // Data Validation
  const firstname = typeof(data.payload.firstname) === "string" && data.payload.firstname.trim().length > 0
    ? data.payload.firstname.trim() 
    : false;
  
  const lastname = typeof(data.payload.lastname) === "string" && data.payload.lastname.trim().length > 0
    ? data.payload.lastname.trim() 
    : false;
  
  const phone = typeof(data.payload.phone) === "string" && data.payload.phone.trim().length === 10
    ? data.payload.phone.trim() 
    : false;
  
  const password = typeof(data.payload.password) === "string" && data.payload.password.trim().length > 0
    ? data.payload.password.trim() 
    : false;
  
  const tosAgreement = typeof(data.payload.tosAgreement) === "boolean" && data.payload.tosAgreement === true
    ? true 
    : false;

    if(firstname && lastname && phone && password && tosAgreement){
      // Make sure the user doesnt already exist
      _data.read('users',phone,function(err,data){
        if(err){
          // Hash the password
          var hashedPassword = helpers.hash(password);
  
          // Create the user object
          if(hashedPassword){
            var userObject = {
              'firstname' : firstname,
              'lastname' : lastname,
              'phone' : phone,
              'hashedPassword' : hashedPassword,
              'tosAgreement' : true
            };
  
            // Store the user
            _data.create('users',phone,userObject,function(err){
              if(!err){
                callback(200);
              } else {
                console.log(err);
                callback(500,{'Error' : 'Could not create the new user'});
              }
            });
          } else {
            callback(500,{'Error' : 'Could not hash the user\'s password.'});
          }
  
        } else {
          // User alread exists
          callback(400,{'Error' : 'A user with that phone number already exists'});
        }
      });
  
    } else {
      callback(400,{'Error' : 'Missing required fields'});
    }
};
// Required Data: phone
// @TODO: Authenticated user only 
handlers._users.get = (data, callback) => {
  console.log("EN GET USERS");
  //phone valid
  const phone = typeof(data.queryStringObject.phone) === "string" && data.queryStringObject.phone.length === 10
  ? data.queryStringObject.phone.trim()
  : false;

  if(phone){
      console.log(data.headers)
      //Get the token from the headers
      const token = typeof(data.headers.token) === "string" ?
        data.headers.token : false;

          //verify the token
      handlers._tokens.verifyToken(token,phone,(tokenValid)=>{
        
        if(tokenValid){
          
               _data.read("users",phone, (err,data) => {
                
                if(!err && data){
                  delete data.hashedPassword;
                
                  callback(200,data);
                }else{
                  callback(404);
                }
               });

        }else{
          callback(403,{"Error":"Invalid token"})
        }
      });

  }else{
    callback(400, {"Error": "Missing required field"});
  }
};

// Required: phone
handlers._users.put = (data, callback) => {

  //phone valid
  const phone = typeof(data.payload.phone) === "string" && data.payload.phone.length === 10
  ? data.payload.phone.trim()
  : false;

  //Check optional
   // Data Validation
   const firstname = typeof(data.payload.firstname) === "string" && data.payload.firstname.trim().length > 0
   ? data.payload.firstname.trim() 
   : false;
 
 const lastname = typeof(data.payload.lastname) === "string" && data.payload.lastname.trim().length > 0
   ? data.payload.lastname.trim() 
   : false;

 const password = typeof(data.payload.password) === "string" && data.payload.password.trim().length > 0
   ? data.payload.password.trim() 
   : false;
 
 const tosAgreement = typeof(data.payload.tosAgreement) === "boolean" && data.payload.tosAgreement === true
   ? true 
   : false;

  if(phone){

    if(firstname || lastname || password){

      //Get the token from the headers
      const token = typeof(data.headers.token) === "string" ?
      data.headers.token : false;
      
      //verify the token
      handlers._tokens.verifyToken(token,phone,(tokenValid)=>{
        
          if(tokenValid){

            _data.read("users", phone,(err,userData) =>{
              if(!err && userData){
                
                if(firstname){
                  userData.firstname = firstname
                }
                if(lastname){
                  userData.lastname = lastname
                }
                if(password){
                  userData.hashedPassword = helpers.hash(password);
                }
                
                _data.update("users",phone,userData, (err)=>{
                  if(!err){
                    
                    callback(200);
                  }else{
                    
                    console.log(err);
                    callback(500,{"Error":"Could no udpate the user"});
                  }
                });
              }else{
                callback(400, {"Error": "The specified user does not exists"});
              }
            });

          }else{
          callback(403,{"Error":"Invalid token"})
          }
        });

    }else{
      callback(400, {"Error": "Missing fieds to update"})
    }
  }else{
    callback(400, {"Error": "Missing required field"}); 
  }

};

handlers._users.delete = (data, callback) => {
   //phone valid
   const phone = typeof(data.queryStringObject.phone) === "string" && data.queryStringObject.phone.length === 10
   ? data.queryStringObject.phone.trim()
   : false;

   if(phone){
    
      //Get the token from the headers
      const token = typeof(data.headers.token) === "string" ?
      data.headers.token : false;
     
      //verify the token
      handlers._tokens.verifyToken(token,phone,(tokenValid)=>{
       
        if(tokenValid){  
          _data.read("users",phone,(err,data)=>{
            if(!err && data){
              _data.delete("users",phone, (err)=>{
                if(!err){
                  //Delete asociated data
                  const userChecks = typeof(data.checks) === "object" && data.checks instanceof Array
                  ? data.checks 
                  : [];
                  const checksToDelete = userChecks.length;
                  if(checksToDelete > 0){
                    let checksDeleted = 0;
                    let deletionErrors = false;
                    // Loop through the checks
                    userChecks.forEach(checkId => {
                      _data.delete("checks",checkId,(err)=>{
                        if(err){
                          deletionErrors = true;
                        }
                        checksDeleted++;
                        if(checksDeleted === checksToDelete){
                          if(!deletionErrors){
                            callback(200);
                          }else{
                            callback(500,{"Error":"Errors trying to delete user check"});
                          }
                        }
                      });
                    });
                  }else{
                    callback(200);
                  }
                }else{
                  callback(500,{"Error":"Could not delete the specified user"})
                }
              });
            }else{
              callback(400,{"Error": "Could not found the specified user"});
            }
          });
      
        }else{
          callback(403,{"Error":"Invalid token"})
        }
      });    
   }else{
     callback(400,{"Error": "Missing required field"});
   }
};

// Tokens
handlers.tokens = (data, callback) =>{
  const acceptableMethods = ["post","get","put","delete"];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  }else{
    callback(405);
  }
}

handlers._tokens = {};
// Required data: phone, password
handlers._tokens.post = (data, callback) =>{
  console.log("en POST Tokens handler")
   //phone valid
   const phone = typeof(data.payload.phone) === "string" && data.payload.phone.length === 10
   ? data.payload.phone.trim()
   : false;

  const password = typeof(data.payload.password) === "string" && data.payload.password.trim().length > 0
    ? data.payload.password.trim() 
    : false;

    if(phone && password){
      
      _data.read("users", phone,(err,userData)=>{
        console.log("aver")
        console.log(err);
        console.log(userData);
        if(!err && userData){
          //Hash the send password and compare the stored password
          const hashedPassword = helpers.hash(password);
          if(hashedPassword === userData.hashedPassword){
            // if valid create a new token
            let tokenId = helpers.createRandomString(20);
            //Yo usaria esta funcion en vez de crear un helper
            //const salt = randomBytes(8).toString("hex");
            //console.log(salt);

            const expires = Date.now() + 1000 *60 * 60;
            const tokenObject = {
              phone,
              "id": tokenId,
              expires
            }

            _data.create("tokens", tokenId, tokenObject, (error)=>{
              if(!error){
                callback(200,tokenObject)
              }else{
                callback(500,{"Error":"Could not create the new token"});
              }
            });

          }else{
            callback(400,{"Error": "Password does not match"});
          }
        }else{
          callback(400,{"Error":"Could not find the specified user"});
        }
      });

    }else{
      callback(400,{"Error":"Missing required fields"});
    }
};

// Required data: id
handlers._tokens.get = (data, callback) =>{
  console.log("dentro de GET Tokens");

  const id = typeof(data.queryStringObject.id) === "string" && data.queryStringObject.id.trim().length === 20
  ? data.queryStringObject.id.trim() 
  : false;

  if(id){
    _data.read("tokens",id,(err,tokenData)=>{
      
      if(!err && tokenData){
        callback(200,tokenData);
      }else{
        callback(404);
      }
    });
  }else{
    callback(400,{"Error":"Missing required error"});
  }
};

//Required fields
handlers._tokens.put = (data, callback) =>{
  console.log("dentro de PUT Tokens");

  const id = typeof(data.payload.id) === "string" && data.payload.id.trim().length === 20
  ? data.payload.id.trim() 
  : false;

  const extend = typeof(data.payload.extend) === "boolean" && data.payload.extend === true
  ? true
  : false;

  if(id && extend){
    _data.read("tokens",id,(err,tokenData)=>{

      if(!err && tokenData){
        if(tokenData.expires > Date.now()){
          tokenData.expires = Date.now() * 1000 * 60 * 60;
          _data.update("tokens",id,tokenData,(err)=>{
            if(!err){
              callback(200,{"token":tokenData});
            }else{
              callback(500,{"Error":"Error cuold not update the token expiration"});
            }
          });

        }else{
          callback(400,{"Error":"The token already expires"})
        }
      }else{
        callback(400,{"Error":"Spicied toekn does noy exist"})
      }
    })

  }else{
    callback(400, {"Error": "Missing required field"});
  }

};

handlers._tokens.delete = (data, callback) =>{

  console.log("EN DELETE Token");
  const id = typeof(data.queryStringObject.id) === "string" && data.queryStringObject.id.length === 20
  ? data.queryStringObject.id.trim()
  : false;
  
  if(id){
   
   _data.read("tokens",id,(err,data)=>{
     if(!err && data){
       _data.delete("tokens",id, (err)=>{
         if(!err){
           callback(200);
         }else{
           callback(500,{"Error":"Could not delete the specified token"})
         }
       });
     }else{
       callback(400,{"Error": "Could not found the specified token"});
     }
   });

  }else{
    callback(400,{"Error": "Missing required field"});
  }
}; 

handlers._tokens.verifyToken = (id,phone,callback)=>{
  console.log("VerifyToken");
  console.log(id);
  console.log(phone)
  _data.read("tokens",id,(err,tokenData)=>{
    console.log("trae los datos");
    console.log(tokenData)
    if(!err && tokenData){
      if(tokenData.phone === phone && tokenData.expires > Date.now()){
        callback(true);
      }else{
        callback(false);
      }
    }else{
      callback(false);
    }
  })
}


handlers.checks = (data, callback) =>{
  const acceptableMethods = ["post","get","put","delete"];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  }else{
    callback(405);
  }
}

// Checks
handlers._checks = {};

//POST
handlers._checks.post = (data, callback)=>{
  console.log("EN POST Checks");
  const protocol = typeof(data.payload.protocol) === "string" && ["http","https"].indexOf(data.payload.protocol) > -1
  ? data.payload.protocol
  : false;
  
  const url = typeof(data.payload.url) === "string" && data.payload.url.trim().length > 0
  ? data.payload.url.trim()
  : false;
  
  const method = typeof(data.payload.method) === "string" && ["post","get","put","delete"].indexOf(data.payload.method) > -1
  ? data.payload.method
  : false;

  const successCodes = typeof(data.payload.successCodes) === "object" && data.payload.successCodes instanceof Array
  && data.payload.successCodes.length > 0
  ? data.payload.successCodes
  : false;
  
  const timeoutSeconds = typeof(data.payload.timeoutSeconds) === "number" && data.payload.timeoutSeconds % 1 === 0
  && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5
  ? data.payload.timeoutSeconds
  : false;

  if(protocol && url && method && successCodes && timeoutSeconds) {

    const token = typeof(data.headers.token) === "string" ? data.headers.token : false;
    
    _data.read("tokens",token,(err,tokenData)=>{

      if(!err && tokenData){
        const userPhone = tokenData.phone;
        
        _data.read("users",userPhone,(err,userData)=>{
       
          if(!err && userData){
            console.log("aca llega")
            const userChecks = typeof(userData.checks) === "object" && userData.checks instanceof Array
            ? userData.checks 
            : [];

            //Verify the max checks, up to 5.
            if(userChecks.length < config.maxChecks){
              
              const checkId = helpers.createRandomString(20);
              const checkObject = {
                "id": checkId,
                userPhone,
                protocol,
                url,
                method,
                successCodes,
                timeoutSeconds,
              };

              _data.create("checks",checkId,checkObject,(err)=>{
                if(!err){
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  _data.update("users",userPhone,userData,(err)=>{
                    if(!err){
                      callback(200,checkObject);
                    }else{
                      callback(500,{"Error":"Could not update the user with the new check"});
                    }
                  })
                }else{
                  callback(500,{"Error":"Could not create check"})
                }
              });

            }else{
              callback(400,{"Error":`The user has the max checks (up to ${config.maxChecks}`})
            }

          }else{
            callback(403);
          }
        });

      }else{
        callback(403);
      }
    });

  } else {
    callback(400, {"Error": "Missing required inputs"});
  }
};


handlers._checks.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        console.log("This is check data",checkData);
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){
            // Return check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};


handlers._checks.put = (data, callback)=>{
  console.log("EN PUT CHECKS");

  const id = typeof(data.payload.id) === "string" && data.payload.id.length === 20
  ? data.payload.id.trim()
  : false;

  const protocol = typeof(data.payload.protocol) === "string" && ["http","https"].indexOf(data.payload.protocol) > -1
  ? data.payload.protocol
  : false;
  
  const url = typeof(data.payload.url) === "string" && data.payload.url.trim().length > 0
  ? data.payload.url.trim()
  : false;
  
  const method = typeof(data.payload.method) === "string" && ["post","get","put","delete"].indexOf(data.payload.method) > -1
  ? data.payload.method
  : false;

  const successCodes = typeof(data.payload.successCodes) === "object" && data.payload.successCodes instanceof Array
  && data.payload.successCodes.length > 0
  ? data.payload.successCodes
  : false;
  
  const timeoutSeconds = typeof(data.payload.timeoutSeconds) === "number" && data.payload.timeoutSeconds % 1 === 0
  && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5
  ? data.payload.timeoutSeconds
  : false;

  if(id){
    if(protocol || url || method || successCodes || timeoutSeconds) {


    _data.read("checks",id,(err,checkData)=>{
      if(!err && checkData){

        console.log(data.headers)
        //Get the token from the headers
        const token = typeof(data.headers.token) === "string" ?
          data.headers.token : false;

            //verify the token
        handlers._tokens.verifyToken(token,checkData.userPhone,(tokenValid)=>{
          
          if(tokenValid){
            
            if(protocol) checkData.protocol = protocol;
            if(url) checkData.url = url;
            if(method) checkData.method = method;
            if(successCodes) checkData.successCodes = successCodes;
            if(timeoutSeconds) checkData.timeoutSeconds = timeoutSeconds;

            _data.update("checks",id,checkData,(err)=>{
              if(!err){
                callback(200);
              }else{
                callback(500,{"Error":"Error trying to update"})
              }
            });
          }else{
            callback(403,{"Error":"Invalid token"})
          }
        });

      }else{
        callback(404)
      }
    });

    }else{
      callback(400,{"Error":"missing fields to update"});
    }

  }else{
    callback(400, {"Error": "Missing required field"});
  }
};

handlers._checks.delete = (data, callback) => {
 
  console.log("ON DELETE CHECKS");
  const id = typeof(data.queryStringObject.id) === "string" && data.queryStringObject.id.length === 20
  ? data.queryStringObject.id.trim()
  : false;

  if(id){
   
    _data.read("checks",id,(err,checkData)=>{
      if(!err && checkData){
        //Get the token from the headers
        const token = typeof(data.headers.token) === "string" ?
        data.headers.token : false;
        //verify the token
        handlers._tokens.verifyToken(token,checkData.userPhone,(tokenValid)=>{
          
          if(tokenValid){

            //Delete the check data

            _data.delete("checks",id,(err)=>{
              if(!err){

                _data.read("users",checkData.userPhone,(err,userData)=>{
                  if(!err && userData){

                    const userChecks = typeof(userData.checks) === "object" && userData.checks instanceof Array
                    ? userData.checks 
                    : [];
                    const checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      
                      userChecks.splice(checkPosition,1);
                      
                      _data.update("users",checkData.userPhone,userData,(err)=>{
                        if(!err){
                          callback(200)
                        }else{
                          callback(500,{"Error":"Could not update user data"})
                        }
                      });

                    }else{
                      callback(500,{"Error":"Could not find the check"})
                    }
                  }else{
                    callback(400,{"Error": "Could not found the specified user"});
                  }
                });
            
              }else{
                callback(500,{"Error":"Could not delete checks"})
              }
            });

            
          }else{
            callback(403,{"Error":"Invalid token"})
          }
        });


      }else{
        callback(400,{"Error":"Id not exists"})
      }
    });
        
  }else{
    callback(400,{"Error": "Missing required field"});
  }
};

// Not found handler
handlers.notFound = (data, callback) =>{
  callback(404);
}

handlers.ping = (data, callback) =>{
  callback(200);
};


module.exports = handlers;