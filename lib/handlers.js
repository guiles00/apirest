/* Request handlers */

const _data = require("./data");

const helpers = require("./helpers");
// Define the handlers
const handlers = {};

handlers.ping = (data, callback) =>{
  callback(200);
};

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
  
  //phone valid
  const phone = typeof(data.queryStringObject.phone) === "string" && data.queryStringObject.phone.length === 10
  ? data.queryStringObject.phone.trim()
  : false;

  if(phone){
  
     _data.read("users",phone, (err,data) => {
      
      if(!err && data){
        delete data.hashedPassword;
      
        callback(200,data);
      }else{
        callback(404);
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
    
    _data.read("users",phone,(err,data)=>{
      if(!err && data){
        _data.delete("users",phone, (err)=>{
          if(!err){
            callback(200);
          }else{
            callback(500,{"Error":"Could not delete the specified user"})
          }
        });
      }else{
        callback(400,{"Error": "Could not found the specified user"});
      }
    });

   }else{
     callback(400,{"Error": "Missing required field"});
   }
};

// Not found handler
handlers.notFound = (data, callback) =>{
  console.log("entra a este handler?")
  callback(404);
}

module.exports = handlers;