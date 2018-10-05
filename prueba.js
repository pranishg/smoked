const wls = require("wlsjs");
wls.api.setOptions({ url: 'https://rpc.smoke.io' });
wls.api.getAccounts(['ederaleng'], (err, response)=>{
    console.log(response)
})