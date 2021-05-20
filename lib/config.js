const environments = {};

// Staging (default)
environments.staging = {
  "httpPort": 3000,
  "httpsPort": 3001,
  "envName": "staging",
  "hashingSecret": "thisIsASecret"
};

environments.production = {
  "httPort": 5000,
  "httpsPort":5001,
  "envName": "production",
  "hashingSecret": "thisIsASecret"
};

const currentEnvironment = typeof(process.env.NODE_ENV) === "string" 
  ? process.env.NODE_ENV.toLowerCase()
  : "";

  // Check that the current enviroment is one of the above
  const enviromentToexport = typeof(environments[currentEnvironment]) === "object"
    ? environments[currentEnvironment]
    : environments.staging;
  
module.exports = enviromentToexport;