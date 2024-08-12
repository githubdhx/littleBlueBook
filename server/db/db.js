/**
 * 
 * @param {*} success 数据库连接成功的回调函数
 * @param {*} error  数据库连接失败的回调函数
 */
module.exports = function( success, error){
//判断error为其设置默认值
if(typeof error!== 'function'){
    error = () => {
        console.log('数据库连接失败！');
    }
}
//导入mongodb模块

const mongoose = require('mongoose');
//导入配置文件
const {DBHOST,DBPORT,DBNAME} = require('../config/config');
//设置mongoose的全局配置
//连接mongodb数据库
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

// 设置回调

// 设置成功的回调函数
mongoose.connection.once('open', ()=>{
    success();
})


// 设置失败的回调函数
mongoose.connection.on('error', ()=>{
    error();
})

// 设置连接关闭的回调函数
mongoose.connection.on('close', ()=>{
    console.log('数据库连接关闭！');
})
}