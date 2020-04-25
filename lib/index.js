const axios = require('axios');

const file = require('fs');
const token = require('./token.js');
const k = require('./constants.js');

const api = function SnowSignals(){

  let default_options = {
    authorizationServer: k.AUTHORIZATION_SERVER,
    apiServer: k.API_SERVER
  };

  SnowSignals.options = default_options;

  return {

    setOption: function (key, value) {
      SnowSignals.options[key] = value;
    },

    getOption: function (key) {
      return SnowSignals.options[key];
    },

    getOptions: function () {
      return SnowSignals.options;
    },

    options: function (opt, callback = false) {
      if (typeof opt === 'string') { // Pass json config filename
        SnowSignals.options = JSON.parse(file.readFileSync(opt));
      } else SnowSignals.options = opt;
      if (typeof SnowSignals.options.refreshToken === 'undefined') SnowSignals.options.refreshToken = null;
      else if (callback) callback();
      return this;
    },

    authenticate:function(){
      return new Promise(async (resolve, reject) => {
        try {
          // first authenticate (gets new tokens and sets headers proper)
          const result = await token.authenticate(SnowSignals.options);
          if (result) {
            console.log("SnowSignals.authenticate");
            resolve(result);
          }
        } catch {
          reject('Unable to extract a token');
        }
      });
    },

    endSession: function(){
      token.endSession();
    },

    // Returns information on api calls
    help:function(){

    },

    // Return the amount of SNOW stored in account
    accountBalance:function(){

    },

    // add dai to an account (needs lots of work)
    addDai:function(){

    },

    lastPrice: function(from, to){
      return new Promise ( async(resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated){

            // do something with the api
            let resp = "A green light: " + from + ' ' + to;
            resolve(resp)

          }
        } catch (error) {
          reject(error);
        }
      });
    },

    hello: function (){
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + 'api/hello';
            axios.get(url)
              .then((res) => {
                resolve(res.data);
              })
              .catch((error) => {
                reject(error)
              })
          }
        } catch(error) {
          reject(error);
        }
      });
    },

    test: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + 'api/test';
            axios.get(url)
              .then((res) => {
                resolve(res.data);
              })
              .catch((error) => {
                reject(error)
              })
          }
        } catch (error){
          reject(error);
        }
      });
    },

    analysis: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + 'api/analysis';
            axios.post(url, options)
              .then((res) => {
                resolve(res.data);
              })
              .catch((error) => {
                reject(error)
              })
          }
        } catch (error) {
          reject(error);
        }
      });
    },

    caveman: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + 'api/caveman';
            axios.get(url, options)
              .then((res) => {
                resolve(res.data);
              })
              .catch((error) => {
                reject(error)
              })
          }
        } catch (error) {
          reject(error);
        }
      });
    }

  }
};

module.exports = api;
