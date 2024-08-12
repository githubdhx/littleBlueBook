<template>
	<!-- 瀑布流列表 -->
	<view class="titleContent">
		<view class="titlesLeftList" >
			<view class="titlesItem" v-for="item in titlesLeftList" :key="item"  @click="goToDetail(item)">
				<image :src="item.image_url[0]" @load="onImageLoad" mode="widthFix"></image>
				<view class="titlesName">{{item.name}}</view>
				<view class="titlesPrice">
					<image  :src="item.user_image"  mode="widthFix"></image>
					<text>{{item.user_name}}</text>
				</view>
			</view>
		</view>
		<view class="titlesRightList">
			<view class="titlesItem" v-for="item in titlesRightList" :key="item" @click="goToDetail(item)">
				<image :src="item.image_url[0]" @load="onImageLoad" mode="widthFix"></image>
				<view class="titlesName">{{item.name}}</view>
				<view class="titlesPrice">
					<image  :src="item.user_image"  mode="widthFix"></image>
					<text>{{item.user_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// import {onLoad} from '@dcloudio/uni-app'
	import {ref,reactive,watch,defineProps,inject} from 'vue'
	import { useUserStore } from '@/stores/titledetail'
	import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, onUpdated} from "vue";
	import mainApi from '@/API/main_page/index.js'
	
	const userStore = useUserStore()
	// import {store} from '@/store/index.js'
	const titlesList = ref()
	const titlesListCount = ref(0)   //加载第i张图片
	// 左侧商品列表
	const titlesLeftList = reactive([])
	const titlesLeftListHeight = ref(0)
	// 右侧商品列表
	const titlesRightList = reactive([])
	const titlesRightListHeight = ref(0)
	// 向商品列表添加第一张图片
	const waterfallImage = function(){
		titlesLeftList.push(titlesList.value[0]);
		console.log("第一张")
		// goodsListCount++;
		// console.log("111111111111" + goodsList[0].name);
	}
	// 图片绑定事件，通过比较左右列表高度，实现瀑布流展示
	const onImageLoad = function(e){
		console.log("继续加载")
		let divWidth = 320;			//显示的单栏宽度
		let oImgW = e.detail.width; //图片原始宽度
		let oImgH = e.detail.height; //图片原始高度
		let rImgH = divWidth*oImgH/oImgW;	//根据宽高比计算当前载入的图片的高度
		if(rImgH > 600){
			rImgH = 600;       //限制图片最高600rpx
		}
		console.log(titlesListCount.value)
		if(titlesListCount.value == 0){
			titlesLeftListHeight.value += rImgH;
			titlesListCount.value++;
			titlesRightList.push(titlesList.value[titlesListCount.value]);
			console.log(titlesListCount.value,"第二张")
			
		}else{
			titlesListCount.value++;
				if(titlesLeftListHeight.value > titlesRightListHeight.value){
					titlesRightListHeight.value += rImgH;
				}else{
					titlesLeftListHeight.value += rImgH;
				}
			if(titlesListCount.value<titlesList.value.length){
				if(titlesLeftListHeight.value > titlesRightListHeight.value){
					titlesRightList.push(titlesList.value[titlesListCount.value]);
					console.log(titlesListCount.value,"放右边")
				}else{
					titlesLeftList.push(titlesList.value[titlesListCount.value]);
					console.log(titlesListCount.value,"放左边")
				}
			}
		}
	}
	
	//带数据跳转到下一页
	const goToDetail = function(item){
		console.log(item,"跳转之前的数据")
		userStore.setDetailTitle(item)
		// console.log(userStore.detail,"跳转之后的数据")
		uni.navigateTo({
			url:"/subpkg/detail/detail"
		})
	}
	
	const props = defineProps(["datas"])
	
	const getTitleList = function(key){
		console.log(key,"wwwwwwwww")
		mainApi.getListGoods(key).then(res=>{
			console.log(res,"商品列表")
			console.log(res.data,"res数据")
			titlesList.value = res.data
			console.log(titlesList.value,"list数据")
			// location.reload();
			
			// this.$nextTick(() => {
			// 	waterfallImage();
			// })
			// if(titlesList.value){
			// 	console.log("有数据");
			// 	titlesList.value = res.data;
			// 	// location.reload()
				// inject("reload");
				
			// 	waterfallImage();
			// }else{
			// 	console.log("没有数据")
			// 	titlesList.value = res.data;
			// 	waterfallImage();
			// }
			waterfallImage();
			

			// $forceUpdate();
			// location.reload()
		})
	}
	const keyWord = reactive(
		{
			keys: props.datas
		}
	)
	//传过来的关键字
	
	watch(props, (newprops) => {
	  console.log(`新数据 ${newprops.datas}`)
	  const newkeyWord = reactive(
	  	{
	  		keys: newprops.datas 
	  	}
	  )
	  console.log(newkeyWord,"关键字")
	  getTitleList(newkeyWord);
	  
	})
	// console.log(props,"关键字")
	//封装关键字
	// onUpdated(() => {
	// 	waterfallImage();
	// })
  
	
	
	onMounted(() => {
		// waterfallImage();
		getTitleList(keyWord);
		
	})
</script>

<style lang="scss" scoped>
	.titleContent{
		width: 100%;
		background: #FFF;
		display: flex;
		justify-content: space-around;
		.titlesLeftList{
			// margin:0 10rpx 0 40rpx;
			// width: 325rpx;
			width: 50%;
			
		}
		.titlesRightList{
			// margin:0 40rpx 0 10rpx;
			// width: 325rpx;
			width: 50%;
		}
	}
	
	.titlesItem{
		background: #FFF;
		// width:325rpx;
		// width: 100%;
		margin: 15rpx;
		// background-color: #2e2e2e;
		image{
			max-height: 600rpx;
			height: auto;
			// width:295rpx;
			width: 100%;
			// padding: 15rpx 15rpx 5rpx;
		}
		.titlesName{
			font-size: 28rpx;
			color: #2e2e2e;
			padding: 0 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display:-webkit-box;
			-webkit-line-clamp:2;
			-webkit-box-orient:vertical;
		}
		.titlesPrice{
			color: #ffac29;
			font-size: 24rpx;
			padding: 0 15rpx;
			image{
				width: 20rpx;
				height: 20rpx;
				padding: 0 5rpx;
				
			}
		}
	}
</style>