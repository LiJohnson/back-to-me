var express = require('express');
var router = express.Router();
var album = require('../icloud-share-album');

/* GET home page. */
router.get('/', function(req, res, next) {
  //album('B0Z5qXGF1iS2iW').then( data=>{});
  res.render('index', { title:"2017-07-16" });
});

router.all('/album/:album',function( req , res , next ){
  album(req.params.album).then( data=>{
    res.json(data);
  });
});

module.exports = router;
