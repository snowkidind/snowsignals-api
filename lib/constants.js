// not so constant...

let authServer = '';
let apiServer = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  authServer = 'http://localhost:3000';
  apiServer = 'http://localhost:2000';
} else {
  authServer = 'http://108.61.163.213:3000';
  apiServer = 'http://108.61.163.213:2000';
}


module.exports = {
  AUTHORIZATION_SERVER: authServer,
  API_SERVER: apiServer
};
