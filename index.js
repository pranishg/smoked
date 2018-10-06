//dependencias
const express = require("express")
const app = express()
const morgan = require('morgan')
const path = require("path")
const favicon = require('serve-favicon');
const nocache = require('nocache')
const wls = require("wlsjs");
wls.api.setOptions({ url: 'https://rpc.smoke.io' });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('.html', require('ejs').__express);


//middelwares
app.use(morgan('dev'));
app.use(nocache())
app.disable('view cache');
app.use(favicon(path.join(__dirname,'views','favicon.ico')));




app.use(express.static(__dirname + '/public'));



//rutas de renderisado
app.get('/',(req,res)=>{
    res.status(200).render("index")
})
var data=[]
var last_trans
var datosU=[]
var manejoerrores=false
function cargarhistorial(usuario,start,callback){
    wls.api.getAccounts([usuario], (err, response)=>{
        if(err){
            manejoerrores=true
            if(callback)
                callback(err)
        }
        if(response)
            datosU.push(response[0])
    })
    wls.api.getAccountHistory(usuario, start , (start < 0) ? 10000 : Math.min(start, 10000), function(err, result) {
        if(err){
            manejoerrores=true
            if(callback)
                callback(err)
        }
        if(result){
        result.reverse();
        for(var i = 0; i < result.length; i++) {
            var trans = result[i];
            data.push(result[i]);
            // Save the ID of the last transaction that was processed.
            last_trans=trans[0];
        }
        if(last_trans > 0 && last_trans != start && datosU[0])
            cargarhistorial(usuario, last_trans, callback);
            else {
                if(callback)
                    callback(data,null,datosU)
            }
        }else{
            callback(null,err,null)
        }
    });
}
function confis(callback){
    wls.api.getDynamicGlobalProperties((err, result) => {
        if(err){
            manejoerrores=true
            if(callback)
                callback(err)
        }
        if(datosU[0] && result){
            var vestingShares=parseFloat(datosU[0].vesting_shares)
            if(vestingShares){
                var g=wls.formatter.vestToSteem(vestingShares, parseFloat(result.total_vesting_shares), parseFloat(result.total_vesting_fund_steem));
                if(callback)
                    callback(g)
            }
        }
    });
}


app.get('/:id',(req,res)=>{
    sp=null
    data=[]
    user=null
    datosU=[]
    var user=req.path,
        page=req.query.page
    if(user!="/@"){
        user.toLowerCase();
        cargarhistorial(user.substr(2,user.length),-1,(data,err,datau)=>{
            if(err)
                res.status(200).render("errores")
            else{
                confis((gsp)=>{
                    if(manejoerrores){
                        res.status(200).render("errores")
                    }
                    if(gsp){
                        var nPages=parseInt(data.length)/100,
                            pagef= page ? page*100 : 0,
                            pagef2=(parseInt(pagef)+101)>data.length ? data.length : parseInt(pagef)+101,
                            pagefinal= pagef && pagef2 ? data.slice(pagef,pagef2) : data.slice(0,101)

                        res.status(200).render('usernames',{
                            pageA:page ? page : null,
                            datos:pagefinal,
                            numPages:nPages,
                            u:user.substr(2,user.length),
                            datau:datau,
                            sp:gsp
                        })
                    }
                })
            }
        })
    }else{
        res.status(200).send("hubo algun error con el @")
    }
})
function buscarinfo(trxid,callback){
    wls.api.getTransaction(trxid, function(err, result) {
        if(err){
            manejoerrores=true
            if(callback)
                callback(err)
        }
        if(callback)
            callback(result)
    });
}
app.get('/trx/:id',(req,res)=>{
    console.log(req.path)
    var trxid=path.basename(req.path)
    buscarinfo(trxid,(datossend)=>{
        if(manejoerrores==true){
            res.status(200).render("errores")
        }
        else{
            //res.send(datossend)
            res.status(200).render('trx',{
                data:datossend
            })
         }
    })
})

app.listen(app.get('port'),()=>{
    console.log(`servidor corriendo en el puerto ${app.get('port')}`)
})
