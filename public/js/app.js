    steem.api.setOptions({ url: 'wss://rpc.smoke.io' });
    var block=null
    DynamicProperties()
    function blockesgene1(){
        steem.api.getBlock(block, (err, result)=>{
            if(err) console.log(err)

                document.getElementById("witness_block").innerHTML=result.witness
                document.getElementById("transaction_block").innerHTML=result. transaction_ids.length
                if(result.transaction_ids.length>0){
                var vote=0,
                    comment=0,
                    transacion=0,
                    custom=0,
                    varia12gt=null
                for (var i=0; i<=result.transaction_ids.length-1; i++) {
                    if(result.transactions[i].operations[0][0]=="vote"){
                        vote++
                        varia12gt=varia12gt==null ? `<div class="alert alert-success" role="alert">
                        ${result.transactions[i].operations[0][1].voter} <b> smoked </b> ${result.transactions[i].operations[0][1].author} in the post <a href="http://smoke.io/@${result.transactions[i].operations[0][1].author}/${result.transactions[i].operations[0][1].permlink}">${(result.transactions[i].operations[0][1].permlink).substring(0,25)}</a> (${(result.transactions[i].operations[0][1].weight)/100}%)
                    </div></ br>` : varia12gt+`<div class="alert alert-success" role="alert">
                        ${result.transactions[i].operations[0][1].voter} <b> reward</b> <a href="https://whaleshares.io/@${result.transactions[i].operations[0][1].author}/${result.transactions[i].operations[0][1].permlink}">${result.transactions[i].operations[0][1].author}</a> in the post ${(result.transactions[i].operations[0][1].permlink).substring(0,25)} ${(result.transactions[i].operations[0][1].weight)/100}%
                    </div></ br>`
                    }
                    if(result.transactions[i].operations[0][0]=="comment"){
                        comment++
                        var posiblidis=(result.transactions[i].operations[0][1].parent_author=='' ? ' resmoked to ' : ' authored a post ')
                        var posibilidad23=result.transactions[i].operations[0][1].parent_author=='' ? result.transactions[i].operations[0][1].parent_author : null
                        varia12gt=varia12gt==null ? `<div class="alert alert-success" role="alert">
                        ${result.transactions[i].operations[0][1].author} <b>${posiblidis}</b> ${posibilidad23} with link <br>${result.transactions[i].operations[0][1].permlink}
                    </div> </ br>` : varia12gt+`<div class="alert alert-success" role="alert">
                            ${result.transactions[i].operations[0][1].author}<b>${posiblidis}</b>${posibilidad23} with link <br>${result.transactions[i].operations[0][1].permlink}
                        </div> </ br>`
                    }
                    if(result.transactions[i].operations[0][0]=="transfer"){transacion++}
                    if(result.transactions[i].operations[0][0]=="custom_json"){
                        custom++
                        varia12gt=varia12gt==null ? `<div class="alert alert-success" role="alert">
                        ${result.transactions[i].operations[0][1].ederaleng}<b>${posiblidis}</b>${posibilidad23} with link <br>${result.transactions[i].operations[0][1].permlink}
                    </div> </br>` : varia12gt+`<div class="alert alert-success" role="alert">
                            ${result.transactions[i].operations[0][1].ederaleng}<b>${posiblidis}</b>${posibilidad23} with link <br>${result.transactions[i].operations[0][1].permlink}
                        </div> </br>`
                    }
                    var dat1block3=document.getElementById("transaccion_block").innerHTML

                    
                }
                document.getElementById("votes_block").innerHTML=vote
                document.getElementById("comment_block").innerHTML=comment
                document.getElementById("traslate_block").innerHTML=transacion
                document.getElementById("custom").innerHTML=custom
                document.getElementById("transaccion_block").innerHTML=varia12gt
            }
        });
    }
    function DynamicProperties(){
        steem.api.getDynamicGlobalProperties((err,result)=>{
            if(err) console.log(err)

            block=parseInt(result.head_block_number)
            blockesgene1()
            document.getElementById("head_block_number").innerHTML=result.head_block_number
            document.getElementById("head_block_id").innerHTML=result.head_block_id
            document.getElementById("time").innerHTML=result.time
            document.getElementById("current_witness").innerHTML=result.current_witness
            document.getElementById("current_supply").innerHTML=result.current_supply
            document.getElementById("total_vesting_fund_steem").innerHTML=result.total_vesting_fund_steem
            document.getElementById("total_vesting_shares").innerHTML=result.total_vesting_shares
            document.getElementById("total_reward_fund_steem").innerHTML=result.total_reward_fund_steem
            document.getElementById("total_reward_shares2").innerHTML=result.total_reward_shares2
            document.getElementById("pending_rewarded_vesting_shares").innerHTML=result.pending_rewarded_vesting_shares
            document.getElementById("pending_rewarded_vesting_steem").innerHTML=result.pending_rewarded_vesting_steem
            document.getElementById("maximum_block_size").innerHTML=result.maximum_block_size
            document.getElementById("current_aslot").innerHTML=result.current_aslot
            document.getElementById("recent_slots_filled").innerHTML=result.recent_slots_filled
            document.getElementById("participation_count").innerHTML=result.participation_count
            document.getElementById("last_irreversible_block_num").innerHTML=result.last_irreversible_block_num
            document.getElementById("vote_power_reserve_rate").innerHTML=result.vote_power_reserve_rate
            document.getElementById("current_reserve_ratio").innerHTML=result.current_reserve_ratio
            document.getElementById("average_block_size").innerHTML=result.average_block_size
            document.getElementById("max_virtual_bandwidth").innerHTML=result.max_virtual_bandwidth
            setTimeout(()=>{ 
                DynamicProperties()
            },2000)
        })

        
    }