var express = require('express');
var router = express.Router();
var album = require('../icloud-share-album');

/* GET home page. */
router.get('/', function(req, res, next) {
  //album('B0Z5qXGF1iS2iW').then( data=>{});
  res.render('index', { title:"2017-07-16",music:req.query.music });
});

router.post('/album/:album',function( req , res , next ){
  album(req.params.album).then( data=>{
    res.json(data);
  });
});

router.get(['/album/:album/:music','/album/:album'],function( req , res , next ){
	if(req.params.music && !/http|\/\//.test(req.params.music)){
  		req.params.music = `/${req.params.music}`
  	}
  	res.render('index', { title:"2017-07-16",album:req.params.album,music:req.params.music });
});

module.exports = router;
