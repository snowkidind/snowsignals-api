const axios = require('axios');
const token = require('./token.js');
const k = require('./constants.js');

const api = function SnowSignals(){

  SnowSignals.options = {
    a:'b'
  };

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
      SnowSignals.options = opt;
      if (typeof SnowSignals.options.refreshToken === 'undefined') {
        SnowSignals.options.refreshToken = null;
      }
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

    analysis: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/api/analysis';
            console.log(url)
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
            const url = k.API_SERVER + '/api/caveman';
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
    },

    divergence: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/api/divergence';
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
    }
  }
};

module.exports = api;
