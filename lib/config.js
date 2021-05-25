const environments = {};

// Staging (default)
environments.staging = {
  "httpPort": 3000,
  "httpsPort": 3001,
  "envName": "staging",
  "hashingSecret": "thisIsASecret",
  "maxChecks":5,
  "twilio": {
    "accountSid": "ACde5ac1c2113a30cecb1228d980f04957",
    "authToken": "4ff98ddf372406b1584bfb9269ccc85b",
    "fromPhone": "+13013272668"
  },
  "templateGlobals": {
    "appName":"UptimeChecker",
    "companyName":"Guiles Inc.",
    "yearCreated":"2021",
    "baseUrl":"http://localhost:3000"
  }
};

environments.production = {
  "httPort": 5000,
  "httpsPort":5001,
  "envName": "production",
  "hashingSecret": "thisIsASecret",
  "maxChecks":5,
  "twilio": {
    "accountSid": "ACde5ac1c2113a30cecb1228d980f04957",
    "authToken": "4ff98ddf372406b1584bfb9269ccc85b",
    "fromPhone": "+13013272668"
  },
  "templateGlobals": {
    "appName":"UptimeChecker",
    "companyName":"Guiles Inc.",
    "yearCreated":"2021",
    "baseUrl":"http://localhost:3000"
  }
};

const currentEnvironment = typeof(process.env.NODE_ENV) === "string" 
  ? process.env.NODE_ENV.toLowerCase()
  : "";

  // Check that the current enviroment is one of the above
  const enviromentToexport = typeof(environments[currentEnvironment]) === "object"
    ? environments[currentEnvironment]
    : environments.staging;
  
module.exports = enviromentToexport;