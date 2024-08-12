<template>
	<view class="input-search-wrapper">
		<view class="input-wrapper">
			<text class="iconfont icon-search">&#xe64d;</text>
			<input class="input-search" :placeholder="placeholder" v-model.value="inputSearchValue" 
			@input="searchInput" @focus="isshowsearch()" @blur="noshowsearch()"/>	
			<view class="btn-search" v-show="isshow" @click="btnSearch()">搜索</view>
		</view>
	</view>
	
	
	<title-content v-show="isshowtitle" :datas ="sendInputSearchValue"></title-content>
	
	<view class="search-history" v-show="!isshowtitle">
		<text>搜索历史</text>
		<view v-for="(item,index) in searchHistory" :key="index" class="search-history-show" @click="quickHistorySearch(item)">	
			{{item}}
		</view>
	</view>
	
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
	import {ref,reactive} from 'vue'
	// import {store} from '@/store/index.js'
	//
	// const showSearchIcon = ref(false)
	const inputSearchValue = ref('')
	const sendInputSearchValue = ref('')
	const placeholder = ref('请输入搜索内容')
	//搜索框的显示和隐藏
	const isshow = ref(true)
	//组件的显示和隐藏
	const isshowtitle = ref(false)
	//搜索内容是否与搜索历史相同
	const isSame = ref(false)
	const searchHistory = reactive(['头像','穿搭','家常菜','文案','数码','旅游','健身'])
	
	const isshowsearch = () => {
		isshow.value = !isshow.value
	}
	const noshowsearch = () => {
		isshow.value = !isshow.value
		
	}
	const searchInput = (event) => {
		console.log(event.target.value)
	// console.log(event.target.value.length)
		if(event.target.value.length == 0){
			isshowtitle.value = false
		}
	}
	   //      const searchIcon = () => {
	   //          inputSearchValue.value = '';
				// showSearchIcon.value = false;
	   //      }
	const btnSearch = () => {
		console.log(inputSearchValue.value,"qqqqqqqqqqq")
		// console.log(inputSearchValue.value.length)
		// console.log(isshowtitle.value)
		if(inputSearchValue.value.length > 0){	
			isshowtitle.value = true
		}
		isSame.value = false
	
		searchHistory.forEach((item)=>{
			// console.log(item)
			// console.log(item == inputSearchValue.value)
			if(item == inputSearchValue.value){
				isSame.value = true
			}
			// console.log("qqqqq"+isSame.value)
		})
		console.log("22222"+isSame.value)
		// console.log(isSame.value)
		if(!isSame.value){
			if(searchHistory.length < 8){
				
				searchHistory.unshift(inputSearchValue.value)
			}else{
				searchHistory.pop()
				searchHistory.unshift(inputSearchValue.value)
			}
		}
		// console.log(searchHistory)
		// console.log(inputSearchValue.value)
		sendInputSearchValue.value = inputSearchValue.value
	}
	
	//快捷历史记录点击搜索
	const quickHistorySearch = (e) => {
		// console.log(e)
		inputSearchValue.value = e
		btnSearch()
	}
	onLoad(() => {
		noshowsearch()
	})
</script>

<style lang="scss" scoped>
	.input-search-wrapper{
		
		width: 100%;
		height: 64rpx;
		overflow: hidden;
	}
	.input-wrapper{
		position: fixed;
		width: 90%;
		height: 64rpx;
		
		// margin: 0 auto;
		margin-left: 5%;
		margin-top: 10rpx;
			
		.icon-search{
			position: absolute;
			top: 20rpx;
			left: 4%;
		}
		.input-search{
			padding-left: 10%;
			height: 64rpx;
			border-radius: 32rpx;
			caret-color: black;
			color: #CDCEC5;
			background-color: #F5F5F3;
			
		}
		.btn-search{
			position: absolute;
			top: 15rpx;
			right: 6%;
			font-size: 28rpx;
			color: #CDCEC5;
			z-index: 2;
		}
	}
	.search-history{
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		text{
			font-size: 28rpx;
			font-weight: 600;
		}
		.search-history-show{
			font-size: 24rpx;
			margin-top: 20rpx;
			margin-left: 20rpx;
			display: inline-block;
			width: 100rpx;
			height: 40rpx;
			background-color: #F5F5F3;
			border-radius: 20rpx;
			text-align: center;
			line-height: 40rpx;
		}
	}
</style>