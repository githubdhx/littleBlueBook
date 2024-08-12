// 引入mongoose模块
let mongoose = require('mongoose');
// 定义列表模型
let ListSchema = new mongoose.Schema({
    id: Number,
    name: String,
});
// 编译模型
let ListModel = mongoose.model('List', ListSchema);

module.exports = ListModel;