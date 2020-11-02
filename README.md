snowsignals-api

see also 
http://snowsignals.com:3333/apidocs 

[latest unstable version](https://github.com/snowkidind/snowsignals-api)
https://github.com/snowkidind/snowsignals-api

**snowsignals-api** is a nodeJS library of functions with which to call upon the Snowsignals API.

To initialize the api with your refresh token: 

```
const SnowSignals = require('snowsignals-api');

const snowSignals = new SnowSignals().options({
  refreshToken: process.env.SNOWSIGNALS_TOKEN
});

```

connect to the api and get a basic analysis:

```  
  const options = {

    f: 'eth',
    t: 'btc',
    e: 'coinbase',
    i: 'd',
    emaslowemaw: 40,
    
  };

  snowSignals.analysis(options)
    .then((response) => {
        // do something with the response...
    })
    .catch(error => {
      console.log(error);
    })
```
