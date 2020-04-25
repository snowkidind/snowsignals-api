const axios = require('axios');
const jwtDecode = require('jwt-decode');
const k = require('./constants.js');

// the purpose of this is to ensure there is a valid access token.
// if there is no token, or if it is expired, use the provided refresh token to poll the AS for one

let accessToken;

module.exports = {

  // if there is no token, or if it is expired, use the provided refresh token to poll the AS for one
  authenticate: async function(options){

    try {
      return new Promise(async (resolve, reject) => {
        if (!accessToken || !tokenIsValid()) {

          console.log('newtoken')

          axios.defaults.headers.common['Authorization'] = options.refreshToken;
          const url = k.AUTHORIZATION_SERVER + 'token/newAccessFromRefresh';

          await axios.post(url)
            .then((res) => {
              accessToken = res.data;
              axios.defaults.headers.common['Authorization'] = accessToken.token;
              resolve(true);
            })
            .catch((error) => {
              accessToken = null;
              axios.defaults.headers.common['Authorization'] = null;
              reject(error)
            })

        } else {
          axios.defaults.headers.common['Authorization'] = accessToken.token;
          resolve(true);
        }

      });
    } catch (error) {
      accessToken = null;
      axios.defaults.headers.common['Authorization'] = null;
      reject(error);
    }
  },

  endSession: function(){
    accessToken = null;
  }
};

function tokenIsValid(){

  const token = jwtDecode(accessToken.token);
  const now = new Date().getTime();
  if (now > token.exp){
    return false;
  }
  return true;

}
