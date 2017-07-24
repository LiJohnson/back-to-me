/**
 * by lcs@lcs.io
 * 2017-07-16
 */

(function(){
    'use strict';
    const album = window.album || 'B0Z5qXGF1iS2iW';

    fetch(`/album/${album}`,{method:'POST'}).then(req=>req.json()).then(data=>{
        const host = (function(locations){
            for( let host in locations ){
                return `${locations[host].scheme}://${locations[host].hosts[0]}`
            }
        })(data.webasseturls.locations);

        showTitle(data.webstream.photos.map(photo=>photo.dateCreated.match(/\d{4}-\d\d-\d\d/)[0]).sort())
        return {
            host:host,
            photos:data.webstream.photos
                .map(photo=>photo['derivatives']['2049']['checksum'])
                .map(checksum=>data.webasseturls.items[checksum])
        };
    }).then(data=>{
        carousel(data.photos.map( item=>`${data.host}${item.url_path}` ));
        data.dateCreated
    });

    const showTitle = function(dateList){
        let $title = $('.title').html( `${dateList[0]}_${dateList[dateList.length-1]}`);
        setTimeout(function() {
            $title.fadeOut();
        }, 5000);
    };

    const carousel = function( photos ){
        //photos = photos.filter((a,i)=>i<3);
        let index = 0;
        let speed = 3 * 1000;
        let $img = $('img.photo');
        let $pre = $('img.preload');
        $img.filter('.in').prop('src',photos[index]);
        index = (index+1) % photos.length;
        $img.filter(':not(.in)').prop('src',photos[index]);
        setInterval(()=>{
            $img.filter(':not(.in)').prop('src',$pre.prop('src'));
            $img.toggleClass('in');
            index = (index+1) % photos.length;
            $pre.prop('src',photos[index]);
        },speed);
    };
})();

