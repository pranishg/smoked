const wls = require("wlsjs");
wls.api.setOptions({ url: 'wss://whaleshares.io/ws' });
wls.api.getAccounts(['ederaleng'], (err, response)=>{
    console.log(err, response[0]);
});