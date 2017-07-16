var fetch = require('node-fetch');

module.exports = function( album ){
    var webstream = `https://p35-sharedstreams.icloud.com/${album}/sharedstreams/webstream`;
    var webasseturls = `https://p35-sharedstreams.icloud.com/${album}/sharedstreams/webasseturls`;

    return fetch( webstream ,{ method: 'POST', body: '{"streamCtag":null}' }).then(function(res) {
        return res.json();
    }).then(function(body) {
        //console.log(body);
        return fetch( webasseturls , {method:'POST',body:JSON.stringify({
            photoGuids:body.photos.map(item=>item.photoGuid)
        })}).then(res=>res.json()).then(urls=>{
            //console.log(urls);
            return {webstream:body,webasseturls:urls}
        })
    });
}