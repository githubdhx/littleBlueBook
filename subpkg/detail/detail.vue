<template>
	<!-- 轮播图 -->
	<view class="uni-margin-wrap">
		<swiper indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item  v-for="(item,index) in itemsdetail.image_url" :key="index">
				<image :src="item" mode="widthFix" class="swiper-item"></image>
			</swiper-item>
			
		</swiper>
	</view>
	<!-- 轮播图结束 -->
	<view class="content">
		<view class="title">
			<image :src="itemsdetail.user_image" mode=""></image>
			<view class="theContent">{{itemsdetail.user_name}}</view>
		</view>
		<view class="name">{{itemsdetail.name}}</view>
		<view class="theContent">{{itemsdetail.created_at}}</view>
		
		<view class="theContent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemsdetail.content}}</view>
	</view>
	
	
	
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {ref,reactive} from 'vue'
	import { useUserStore } from '@/stores/titledetail'
	// import  mainApi  from '@/API/main_page/index.js'
	const user_store = useUserStore() 
	const show = ref(true);
	//传过来的数据
	let itemsdetail = ref({})
	// const duixiang = reactive({
	// 	name:"",
	// 	image_url:""
	// })
	
	onLoad(() => {
		// console.log(user_store.detail_title)
		itemsdetail.value = user_store.detail_title
		
		// let userInfo = JSON.parse(decodeURIComponent(options.info))
		
		// console.log(userInfo)
		// itemsdetail.value = userInfo
		// const pages = getCurrentPages();
		// // console.log(pages)
		// const prevPage = pages[pages.length - 1];
		// const eventChannel = prevPage.getOpenerEventChannel();
		
		// eventChannel.emit('acceptDataFromOpenedPage', { data: 'data from detail page' })
		// // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		// eventChannel.on('acceptDataFromOpenedPage', function(data) {
		// 	console.log(data.data)
		// })
		
		// mainApi.getMainPage().then(res => {
		// 	console.log(res.data,"res.data")
		// }).catch(err =>{
		// 	console.log(err,"err")
		// })
		
		
		// console.log(itemsdetail.value,"传过来的对象")
		// console.log(itemsdetail.value.image_url,"传过来的对象里面的数组")
		// console.log(itemsdetail.value.name)
		// console.log(duixiang)
		// mainApi.getMainPage().then(res => {
		// 	console.log(res.data,"res.data")
		// }).catch(err =>{
		// 	console.log(err,"err")
		// })
	})
</script>

<style lang="scss" scoped>
	.uni-margin-wrap {
		width: 100%;
		
		// margin: 0 30rpx;
	}
	swiper{
		height: 220px;
	}
	.swiper-item {
		width: 100%;
		// height: 100%;
	}
	.swiper-item {
		// width: 100%;
		// height: 100%;
		object-fit:cover;
		background-size: contain;
		background-position: center;
	}
	.content{
		
		height: 100%;
		margin-top: 52rpx;
		margin-left: 21px;
		margin-right: 21px;
		.name{
			font-size: 22px;
			font-weight: bold;
			margin-top: 20px;
		}
		.theContent{
			font-size: 14px;
			margin-top: 10px;
		}
		
		.title{
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			image{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				
			}
			.theContent{
				margin-left: 21px;
				font-size: 18px;
			}
		}
	}
</style>