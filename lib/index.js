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
            console.log(url);
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

    plasma: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/api/plasma';
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

    getPlasmaBalance: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const url = k.API_SERVER + '/plasma/balances';
          axios.get(url, {params: options})
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              reject(error)
            })

        } catch (error) {
          reject(error);
        }
      });
    },



    // Crypto Caveman Subscription Methods

    cavemanSubscribe: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/caveman';
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

    unsubscribe: function (id) {
      return new Promise(async (resolve, reject) => {
        try {
          const options = {subscribe: false, id: id}; // these are required fields
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/unsubscribe';
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

// TODO refactor to read getCavemanSubscriptions()
    getSubscriptions: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/subscriptions';
            axios.post(url)
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



    // Plasma Ethereum side Subscription Methods

    plasmaSubscribe: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/plasma';
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

    unsubscribePlasma: function (id) {
      return new Promise(async (resolve, reject) => {
        try {
          const options = {subscribe: false, id: id}; // these are required fields
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/unsubscribePlasma';
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

    getPlasmaSubscriptions: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/plasmaSubscriptions';
            axios.post(url)
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


    // Plasma Chain side Subscription Methods

    plasmaChainWhaleSubscribe: function (options) {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/plasmachainwhale';
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

    getPlasmaChainWhaleSubscriptions: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/getplasmachainwhalesubscriptions';
            axios.post(url)
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

    unsubscribePlasmaChainWhale: function (id) {
      return new Promise(async (resolve, reject) => {
        try {
          const options = {subscribe: false, id: id}; // these are required fields
          const authenticated = await token.authenticate(SnowSignals.options);
          if (authenticated) {
            const url = k.API_SERVER + '/subscribe/unsubscribePlasmaChainWhale';
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


    // plasma whale utility

    plasmaWhaleThresholds: function () {
      return new Promise(async (resolve, reject) => {
        try {
          const url = k.API_SERVER + '/plasma/thresholds';
          axios.get(url)
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              reject(error)
            })
        } catch (error) {
          reject(error);
        }
      });
    },
  }
};

module.exports = api;
