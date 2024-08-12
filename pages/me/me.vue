<template>
	<view class="my-header">
		<view class="my-image">
			<image :src=myvalue.image alt="" />
		</view>
		<view class="my-info" v-show="islogin">
			<view>{{myvalue.name}}</view>
			<view>小红书号 {{myvalue.id.substring(0,10)}}</view>
		</view>
		<view class="my-btn">
			<button type="warn" size="big" v-show = "!islogin" @click="inlogin()">点击登录</button>
		</view>
	</view>
	<list class="my-help">
		<cell class="my-help-cell">
			<view>隐私政策</view>
			<uni-icons type="right" size="20" color="#CFBABE"></uni-icons>
		</cell>
		<cell class="my-help-cell">
			<view>帮助与客服</view>
			<uni-icons type="right" size="20" color="#CFBABE"></uni-icons>
		</cell>
		<cell class="my-help-cell">
			<view>关于我们</view>
			<uni-icons type="right" size="20" color="#CFBABE"></uni-icons>
		</cell>
	</list>
	
	<view class="leave-login" @click="leaveLogin()" v-show="islogin">
		退出登录
	</view>
	

</template>

<script setup>
	import {onLoad, onShow} from '@dcloudio/uni-app'
	import {ref,reactive} from 'vue'
	import userLogin from '@/API/user_page/index.js'
	// import {store} from '@/store/index.js'
	
	const myvalue = reactive({
		name:'张三',
		id:'1234567890',
		image:'/static/myimage.png'
	})
	const islogin = ref(false)
	const localtoken = ref('')
	onShow(() => {
		localtoken.value = uni.getStorageSync('token')
		if(localtoken.value){
			islogin.value = true
		}
	})
	const inlogin = async () => {
		// var that = this;
		uni.showLoading({ // 展示加载框
			title: '加载中',
		});
		console.log("11111111111111111")
		uni.getUserProfile({ //获取到用户信息
			desc: '登录后可同步数据',
			success: async (obj) => {
				// console.log('obj', obj);
				// console.log(that)
				myvalue.name = obj.userInfo.nickName //用户名
				myvalue.image = obj.userInfo.avatarUrl //用户头像
				
				console.log('用户名', myvalue.name);
				console.log('用户头像', myvalue.image);
				// 调用 action ，请求登录接口
				uni.login({
					provider: 'weixin',
					success: (res) => {
						// console.log('res-login', res);
						//获取到code
						myvalue.id = res.code;
						// console.log('code', myvalue.id);
						//请求登录接口
						if (res.errMsg == 'login:ok') {
							console.log('登录成功')
							const params = reactive(
								{
									code: myvalue.id,
									nickname: myvalue.name,
									avatar: myvalue.image
								}
							)
							// console.log(11111111111)
							// console.log(params,"qwqwqwq")
							// console.log(11111111111)
							userLogin.getUser(params).then(res => {
								// console.log("res.code",res.statusCode)
								if (res.statusCode == 200) {
									
									uni.showToast({
										title: '登录成功',
										icon: 'success',
										mask: true,
									});
									//获取到token 存入缓存。通过有无token来判断是否登录
										
									console.log('登录接口',res)
									// console.log()
									uni.setStorageSync('localtoken', myvalue.id)
									uni.setStorageSync('localname', myvalue.name)
									uni.setStorageSync('localimage', myvalue.image)
									// that.myProfile()  //用户信息接口
									// that.getHistoryList()   //足迹接口
									
									islogin.value = true
									// console.log("是否改变",islogin.value)
								}else{
									console.log("错误")
								}
							}), function(err) {
								uni.showToast({
									icon: 'none',
									title: err.msg
								})
								console.log("登录失败")
							}
						}
					},
					
				});
			},
			fail: () => {
				uni.showToast({
					title: '授权已取消',
					icon: 'error',
					mask: true,
				});
			},
			complete: () => {
				// 隐藏loading
				uni.hideLoading();
			},
		});
		console.log('登录')
		// islogin.value = true
		// uni.login({
			
		// 	provider: 'weixin',
		// 	success: (res) => {
		// 		console.log(res)
		// 		// 获取用户信息
		// 		uni.getUserInfo({
		// 			provider: 'weixin',
		// 			success: (res) => {
		// 				console.log(res)
		// 			}
		// 		})
		// 		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		// 	}
			
		// })
		
	}
	const leaveLogin = () => {
		uni.showModal({
			title: '确定要退出登录吗？',
			success: function(res) {
				if (res.confirm) {
					uni.removeStorageSync('localtoken')
					uni.removeStorageSync('localname')
					uni.removeStorageSync('localimage')
					myvalue.image = '/static/myimage.png'
					islogin.value = false
				} else if (res.cancel) {
						console.log('用户点击取消');
				}
			}
		});

		console.log('退出登录')
		
	}
	// const state = reactive({})
	
	onLoad(() => {
		console.log(uni.getStorageSync('localtoken'),"token");
		if(uni.getStorageSync('localtoken')){
			islogin.value = true		
			myvalue.image = uni.getStorageSync('localimage')
			myvalue.name = uni.getStorageSync('localname')
			myvalue.id = uni.getStorageSync('localtoken')
		}
	})
</script>

<style lang="scss" scoped>
	.my-header {
		display: flex;
		// flex-direction: row;
		// justify-content: center;
		// flex-wrap: wrap;
		// width: 100%;
		// height: 100%;	
		background-color: #F8F8F8;
		align-items: center;
		margin: 40rpx;
		border-radius: 40rpx;
		.my-image {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			margin: 30rpx 10rpx;
			// margin-left: 40rpx;
			// padding: 0 10rpx;
			image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.my-info {
			// margin-top: 20px;
			// width: 100rpx;
			// margin-left: 7rpx;
			:last-child{
				font-size: 25rpx;
				color: #CFBABE;
			}
			view {
				margin: 5px 0;
				
			}
		}
		.my-btn {
			// margin-top: 20px;
			margin: 30rpx 0 30rpx 260rpx;
			
			
			
			button {
				width: 200rpx;
				height: 40px;
				font-size: 30rpx;
				background-color: #F8F8F8;
				color: #EE4254;
				border-radius: 40rpx;	
				border: 2px solid #CFBABE;
			}
		}
	}
	.my-help {
		display: inline-block;
		width: 90%;
		margin-left: 5%;
		background-color: #F8F8F8;
		border-radius: 40rpx;
		.my-help-cell {
			display: flex;
			height: 100%;
			justify-content: space-between;
			align-items: center;
			// margin: 20rpx 0;
			// margin-bottom: 30rpx;
			padding: 20rpx 20rpx;
			font-size: 33rpx;
			// color: #CFBABE;
			border-bottom: 1px solid #CFBABE;
		}
		.my-help-cell:last-child {
			// margin-top: 0;
			border-bottom: none;
		}
	}
	.leave-login {
		width: 90%;
		margin-left: 5%;
		margin-top: 30rpx;
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: #F8F8F8;
		border-radius: 40rpx;
		font-size: 33rpx;
		color: #EE4254;
	}
</style>