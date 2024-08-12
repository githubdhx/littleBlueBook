import request from '@/API/request'; // 引入封装好的request


//查询列表导航栏
function getList(data) {
  return request({
    url: '/main/list',
    method: 'GET',
    data: data 
  })
}
//根据列表导航栏显示商品
function getListGoods(data){
	return request({
		url: '/main/list/goods',
		method: 'POST',
		data: data
	})
}
// // 移除购物车
// function deleteCart(data, data2){
// 	return request({
// 		url:`/userProduct/${data}/${data2}`,
// 		method: 'DELETE'
// 	})
// }

export default{
	getList,
	getListGoods
	// getCart,
	// addCart,
	// modifyCart,
	// deleteCart
}
