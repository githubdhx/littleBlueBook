var express = require('express');
const ListModel = require('../models/ListModel');
const ListGoodModel = require('../models/ListGoodModel');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main/list',function(req,res){
	console.log(req.query,"这个是req")
	// let list = new ListModel({
	// 	id:2,
	// 	name:'没事',
	// });
	// list.save().then((result)=>{
	// 	console.log(result,"这个是result,列表保存成功");
	// }).catch(err =>{	
	// 	console.log(err,"这个是err,列表保存失败");
	// })
	
	ListModel.find().then(data=>{
		console.log(data,"这个是data")
		res.json(data)
	}).catch((error)=>{
		console.log('访问失败！')
		res.status(500).send(error);
	})
	
});

router.post('/login',function(req,res){
	console.log(req.body,"这个是传过来的post参数")
	res.json({code: 'this is a test'});
})

router.post('/main/list/goods',function(req,res){
	console.log(req.body,"这个是传过来的post参数")
	// {name: new RegExp(变量)}这种写法，可以把变量传过去
	// let list = new ListGoodModel({
	// 	name: '哈哈哈哈',
	// 	image_url:['../../static/QQ图片20240705110000.jpg','../../static/QQ图片20240705110000.jpg'],
	// 	user_image:'../../static/logo.png',
	// 	user_name:'用户名',
	// 	content:'文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
	// 	created_at: new Date(),
	// });
	// list.save().then((result)=>{
	// 	console.log(result,"这个是result,列表保存成功");
	// }).catch(err =>{	
	// 	console.log(err,"这个是err,列表保存失败");
	// })
	ListGoodModel.find({ name : new RegExp(req.body.keys)}).then(data=>{
		console.log(data,"这个是data")
		res.json(data)
	}).catch(error=>{
		console.log('访问失败！')
		res.status(500).send(error);
	})
});

module.exports = router;
