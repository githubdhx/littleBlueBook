// 引入mongoose模块
let mongoose = require('mongoose');
// 定义列表详情模型
let ListGoodSchema = new mongoose.Schema({
    name:String,
	image_url:Array,
	user_image:String,
    user_name:String,
	content:String,
	created_at:Date
});
// 编译模型
let ListGoodModel = mongoose.model('ListGood', ListGoodSchema);

module.exports = ListGoodModel;