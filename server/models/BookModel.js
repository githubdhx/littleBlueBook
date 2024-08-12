// 引入mongoose模块
let mongoose = require('mongoose');
// 定义图书模型
let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    publishDate: Date
});
// 编译模型
let BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;