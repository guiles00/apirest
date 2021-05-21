/*
** Primary file for the API
**
*/
//Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./lib/config");
const fs = require("fs");
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");

const httpServer = http.createServer(function(req, res){
  unifiedServer(req, res);
});

const httpsServerOptions = {
"key": fs.readFileSync("./https/key.pem"),
"cert": fs.readFileSync("./https/cert.pem")
};

const httpsServer = https.createServer(httpsServerOptions,function(req, res){
  unifiedServer(req, res);
});

// Start the server, and have it listen on port 
httpServer.listen(config.httpPort, function(){
  console.log(`The HTTP server is listening on port ${config.httpPort} now in "${config.envName}`)
});

// Start the server, and have it listen on port 
httpsServer.listen(config.httpsPort, function(){
  console.log(`The HTTP server is listening on port ${config.httpsPort} now in "${config.envName}`)
});

const unifiedServer = function(req, res){
    // Get the url and parse it
    const parsedUrl = url.parse(req.url,true);
  
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\+$/g,'');
    var queryStringObject = parsedUrl.query;

    //console.log(parsedUrl);
    // Get the HTTP method
    const method = req.method.toLowerCase();
  
    // Get the headers as an object
    const headers = req.headers;
  
    // Get the payload, if any
    const decoder = new StringDecoder("utf-8");
    let buffer = "";
  
    req.on("data", (data)=>{
      buffer += decoder.write(data);
    });
  
    req.on("end", ()=>{
      buffer += decoder.end();
      
      // Choose the handler this request should go to. If one 
      // is not found use the not found handler
  
      const choseHandler = typeof(router[trimmedPath]) !== "undefined"? router[trimmedPath] : handlers.notFound;

      // Construct the data object to send to the handler
      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        "payload": helpers.parseJsonToObject(buffer)
      }
      console.log("method",method);
      console.log("payloda");
      console.log(helpers.parseJsonToObject(buffer))
      console.log("hanlder");
      console.log(trimmedPath);
      console.log(router);
      // Route the request to the handler specified in the router
      choseHandler(data, (statusCode, payload)=>{
        // Use the status code called back by the handler, or default
        statusCode = typeof(statusCode) === "number" ? statusCode: 200;
        // Use the payload called back by the handler, or default
        payload = typeof(payload) === "object"? payload: {};
        console.log("/**************")
        console.log(statusCode);
        console.log(payload);
        
        console.log("***********")

        //Convert the payload to a string
        const payloadString = JSON.stringify(payload);
        // Return the response
        res.setHeader("Content-Type","application/json");
        res.writeHead(statusCode);
        res.end(payloadString);
  
        console.log("return that", statusCode, payloadString);
      });
  
    })  
};

// Define a request router
const router = {
  "ping": handlers.ping,
  "users": handlers.users,
  "tokens": handlers.tokens,
  "checks": handlers.checks,
};


/*For testing*/

// const _data = require("./lib/data");

// _data.read("users","1234567890",(err,data)=>{
//   if(!err){

//   }else{
//     console.log(err);

//   }
// })
