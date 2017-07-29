/**
 * by lcs@lcs.io
 * 2017-07-16
 */

(function(){
    'use strict';
    const album = window.album || 'B0Z5qXGF1iS2iW';
    const audio = $('audio')[0];

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
        const photos = data.photos.map( item=>`${data.host}${item.url_path}` );

        if( !audio )return carousel(photos);
        if( !audio.play )return carousel(photos);

        const $playButton = $('.play-button').removeClass('hide');
        let canPlay = true;

        $('img.in').prop('src',photos[0]);

        $playButton.on('click',function(){
            if(!canPlay)return;
            clearInterval(timeId);
            if(audio.paused){
                audio.play().catch(()=>{canPlay=false;});
                carousel(photos);
                $playButton.removeClass('in');
            }else{
                audio.pause();
                $playButton.addClass('in');
            }
        });

    });

    const showTitle = function(dateList){
        let $title = $('.title').html( `${dateList[0]}_${dateList[dateList.length-1]}`);
        setTimeout(function() {
            $title.fadeOut();
        }, 5000);
    };

    let timeId = 0;
    let index = 0;
    const carousel = function( photos ){
        //photos = photos.filter((a,i)=>i<3);
        
        let speed = 3 * 1000;
        let $img = $('img.photo');
        let $pre = $('img.preload');
        $img.filter('.in').prop('src',photos[index]);
        index = (index+1) % photos.length;
        $img.filter(':not(.in)').prop('src',photos[index]);
        timeId = setInterval(()=>{
            $img.filter(':not(.in)').prop('src',$pre.prop('src'));
            $img.toggleClass('in');
            index = (index+1) % photos.length;
            $pre.prop('src',photos[index]);
        },speed);
    };



})();

