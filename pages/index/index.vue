<template>
	<page-head class="page_head" @change_search="change_search"></page-head>
	<view class="page">
		<!-- 导航栏模块 -->
		<view class="guding">
			<view class="nav">
				<view class="nav-list" v-for="(item,index) in list" :key="index" @click="changeAct(item)">
					<!-- 激活样式名字是红色 判断act==index 和act==item.id都行 -->
					<a :class="[act==item.id?'name':'']" style="width: 65rpx;">
						{{item.name}}
					</a>
					<!-- 名字下面的横线 -->
					<view :class="[act==index?'line':'']"></view>
				</view>
			</view>
		</view>
		
		<!-- 导航栏模块结束 -->
		
		<!-- 内容模块 -->
			<title-content :datas = "lietKey"></title-content>
		<!-- 内容模块结束 -->
	</view>
	<!-- <text class="iconfont">&#xe64d;</text> -->

</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	
	import { ref ,reactive } from 'vue'
	// import {store} from '@/store/index.js'
	import mainApi from '@/API/main_page/index.js'
	const change_search = ()=>{
		// console.log(val)
		uni.navigateTo({
			url:'/subpkg/main_search/main_search'
		})
	}
	
	//导航栏开始
	const list = ref()
	//选择了哪一个导航栏编号
	const act = ref(0)
	const lietKey = ref("推荐")
	const changeAct = (item)=>{
		act.value = item.id;
		lietKey.value = item.name;
		console.log(lietKey.value,"传过去的数据")
		//根据选择的导航栏，重新获取对应的数据（更新goodsList数组）
		
	}
	//导航栏结束
	
	//瀑布流开始
	
	//瀑布流结束
	
	onLoad(() => {
		mainApi.getList().then(res => {
			console.log(res,"123445644")
			
			list.value = res.data
			console.log(list.value)
		}).catch(err =>{
			console.log(err)
		})
		
		
	})
	
</script>

<style lang="scss" scoped>
	//导航栏样式开始
	.guding{
		height: 66rpx;
		.nav {
			position:fixed;
			height: 66rpx;
			width: 100%;
			display: flex;
			align-items: center;
			// justify-content: space-around;
			background-color: #FFF;
			font-size: 30rpx;
			color: darkgrey;
			letter-spacing: 2.14rpx;
			overflow-x: scroll;
			overflow-y: hidden;
			//隐藏滚动条（？）
			::-webkit-scrollbar{
				display: none;
			}
			.nav-list {
				display: inline-block;
				margin: 0 26rpx;
	
				width: 80rpx;
				// height: 80%;
				// margin-top: 40rpx;
				opacity: .9;
				// view{
				// 	width: 65rpx;
				// }
				.name {
					color: black;
					// width: 65rpx;
				}
				.line {
					margin-top: 10rpx;
					width: 65rpx;
					height: 4rpx;
					background-color: red;
				}
			}			
		}
	}
	
	//导航栏样式结束
	
	//瀑布流样式开始
	
	//瀑布流样式结束
</style>