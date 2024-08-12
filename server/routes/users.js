var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/users/login',function(req,res,next){
// 	console.log(req.body,"这个是传过来的post参数")
// 	res.json({code: 'this is a test'});
// })

module.exports = router;
