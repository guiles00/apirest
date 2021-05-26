/*
@TODO: revisar todos los promisify y usar una funcion nueva para no modificarla globalmente
@TODO:Tambien podes probar de hacer un IFFE
*/ 
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
  
      let chosenHandler = typeof(server.router[trimmedPath]) !== "undefined"? server.router[trimmedPath] : handlers.notFound;

      //If the request iswithin the public directory, use the public handler
      chosenHandler = trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;
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
      chosenHandler(data, (statusCode, payload, contentType)=>{
        
        // If ContentType not specified, defult json
        contentType = typeof(contentType) === "string" ? contentType : "json";

        // Use the status code called back by the handler, or default
        statusCode = typeof(statusCode) === "number" ? statusCode: 200;
        //Return the response-parts that are content-specific
        
        let payloadString = "";
        if(contentType === "json"){
          // Use the payload called back by the handler, or default
          payload = typeof(payload) === "object"? payload: {};     
          res.setHeader("Content-Type","application/json");
          //Convert the payload to a string
          payloadString = JSON.stringify(payload);
          
        }
        if(contentType === "html"){
          payloadString = typeof(payload) === "string" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","text/html");
        }
        if(contentType === "favicon"){
          payloadString = typeof(payload) !== "undefined" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","image/x-icon");
        }
        if(contentType === "css"){
          payloadString = typeof(payload) !== "undefined" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","text/css");
        }
        if(contentType === "png"){
          payloadString = typeof(payload) !== "undefined" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","image/png");
        }
        if(contentType === "jpg"){
          payloadString = typeof(payload) !== "undefined" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","image/jpg");
        }
        if(contentType === "plain"){
          payloadString = typeof(payload) !== "undefined" ? payload : "<html>OK</html>";
          res.setHeader("Content-Type","text/plain");
        }

        // Return the response-parts that are commong to all content-types
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
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted":handlers.sessionDeleted,
  "checks/all": handlers.checksList,
  "checks/create": handlers.checksCreate,
  "checks/edit": handlers.checksEdit,
  "ping": handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/checks": handlers.checks,
  "favicon.ico": handlers.favicon,
  "public": handlers.public
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