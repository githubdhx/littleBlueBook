<template class="page_head">
	<view class="nav" :style="'padding-top:' + status + 'px;'">
		
		<img src="../../static/xhs.png" alt="" class="bar_img"/>
		<input type="text" :placeholder= "icon" class="iconfont" @focus="change_search()"/>
		<!-- <text class="iconfont">&#xe64d;</text> -->
	</view>
	<view :style="'padding-top:' + (status + 30) + 'px;'"></view>
	
</template>

<script setup>
	
	import {onLoad} from '@dcloudio/uni-app'
	import { onBeforeMount} from 'vue'
	import {ref, defineEmits} from 'vue'
	
	// import {store} from '@/store/index.js'
	onBeforeMount(()=>{
		setNavSize()
	})
	//状态栏高度
	let status = ref(0)
	let icon = ref(' 搜索你感兴趣的东西...')
	// \ue64d 
	const emits = defineEmits(["change_search"])
	const change_search = () =>{
		// icon.value = 'hhhhh';
		// console.log(icon.value)
		
		emits('change_search')
	}
	
	//计算状态栏高度
	const setNavSize = () =>{
		const status_bar = uni.getSystemInfoSync()
		status.value = status_bar.statusBarHeight + 10;
	}
	//样式
	onLoad(() => {})
</script>

<style lang="scss" scoped>

	.nav{
		position: fixed;
		width: 100%;
		height: 30px;
		background-color: #fff;
		top: 0;
		margin-bottom: 6rpx;
		left: 0;
		overflow: hidden;
		// z-index: 999;
		
		.bar_img{
			position: absolute;
			bottom: 6rpx;
			left: 0;
			width: 100rpx;
			padding-left: 15rpx;
			height: 30px;
		}
		input{
			position: absolute;
			bottom: 6rpx;
			left: 130rpx;
			// right: -200rpx;
			width: 430rpx;
			height: 30px;
			background-color: #F3F3F1;
			border-radius: 15px;
			padding-left: 20px;
			box-sizing: border-box;
			// ::before{
				
			// 	// position: absolute;
			// 	// left: 10px;
			// 	// top: 8px;
			// 	font-family: 'iconfont';
			// 	content: '\e64d';
				
			// }
		}
		input::before{
			position: absolute;
			color: #999;
			
			left: 12rpx;
			top: 16rpx;
			font-family: 'iconfont';
			content: '\e64d';
		}
		
		
	}
</style>