/*
** Primary file for the API
**
*/
//Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const fs = require("fs");
const handlers = require("./handlers");
const helpers = require("./helpers");
const util = require("util");
const debug = util.debuglog("server");


const server = {};

server.httpServer = http.createServer(function(req, res){
  server.unifiedServer(req, res);
});

server.httpsServerOptions = {
  "key": fs.readFileSync("./https/key.pem"),
  "cert": fs.readFileSync("./https/cert.pem")
};

server.httpsServer = https.createServer(server.httpsServerOptions,function(req, res){
  server.unifiedServer(req, res);
});

server.unifiedServer = function(req, res){
    // Get the url and parse it
    const parsedUrl = url.parse(req.url,true);
  
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\+$/g,'');
    var queryStringObject = parsedUrl.query;

    //debug(parsedUrl);
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
  
      const choseHandler = typeof(server.router[trimmedPath]) !== "undefined"? server.router[trimmedPath] : handlers.notFound;

      // Construct the data object to send to the handler
      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        "payload": helpers.parseJsonToObject(buffer)
      }
      debug("method",method);
      debug("payloda");
      debug(helpers.parseJsonToObject(buffer))
      debug("hanlder");
      debug(trimmedPath);
      debug(server.router);
      // Route the request to the handler specified in the router
      choseHandler(data, (statusCode, payload)=>{
        // Use the status code called back by the handler, or default
        statusCode = typeof(statusCode) === "number" ? statusCode: 200;
        // Use the payload called back by the handler, or default
        payload = typeof(payload) === "object"? payload: {};
        debug("/**************")
        debug(statusCode);
        debug(payload);
        
        debug("***********")

        //Convert the payload to a string
        const payloadString = JSON.stringify(payload);
        // Return the response
        res.setHeader("Content-Type","application/json");
        res.writeHead(statusCode);
        res.end(payloadString);
        if(statusCode === 200){

          debug("\x1b[32m%s\x1b[0m","return that", statusCode, payloadString);
        }else{
          debug("\x1b[31m%s\x1b[0m","return that", statusCode, payloadString);
        }
      });
  
    })  
};

// Define a request router
server.router = {
  "ping": handlers.ping,
  "users": handlers.users,
  "tokens": handlers.tokens,
  "checks": handlers.checks,
};


server.init = ()=>{

  // Start the server, and have it listen on port 
  server.httpServer.listen(config.httpPort, function(){
    console.log("\x1b[36m%s\x1b[0m",`The HTTP server is listening on port ${config.httpPort} now in "${config.envName}`)
  });

  // Start the server, and have it listen on port 
  server.httpsServer.listen(config.httpsPort, function(){
    console.log("\x1b[36m%s\x1b[0m",`The HTTP server is listening on port ${config.httpsPort} now in "${config.envName}`)
  });

};

module.exports = server;