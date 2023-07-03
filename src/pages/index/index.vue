<template>
  <view class="title">深圳市第一人民医院</view>
  <view class="topImg">
    <image mode="aspectFill" src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/nav-yiyu.png"></image>
  </view>
  <view class="nav_list">
    <view class="list" v-for="item in nav_data" :key="item.title">
      <image :src="item.image"></image>
      <view>{{ item.title }}</view>
    </view>
  </view>
  <view class="nav_pic">
    <view class="list" v-for="item in reserve" :key="item.title" :listtitle="item.title">
      <view class="titles">{{ item.title }}</view>
      <view>{{ item.describe }}</view>
      <image mode="widthFix" :src="item.image"></image>
    </view>
  </view>
  <view class="titleBox">
    <view class="title1">热门挂号</view>
    <view class="more">查看更多></view>
  </view>
  <view class="guahao">
    <view class="guahaoList" @tap="toPage(item.title)" v-for="item in popular" :style="{'background-color': item.background}">
      <view>{{ item.title }}</view>
      <image mode="heightFix" :src="item.image"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RequestApi } from '@/public/request'
let menu_top = ref<string>('')
let menu_height = ref<string>('')
let nav_data = ref<any[]>([])
let reserve = ref<any[]>([])
let popular = ref<any[]>([])

onMounted(() => {
  let getMenu = uni.getStorageSync('Menubutton')
  menu_top.value = getMenu.top + 'px'
  menu_height.value = getMenu.height + 'px'
  pageData()
})

function toPage(title:string){
  uni.switchTab({
    url:'/pages/mine/mine?title=' + title
  })
}

async function pageData(){
  const res:any = await RequestApi.HomePage()
  res.data.data.map((el:any) => {
    if( el._id === '26da8e4962e654100418ae5410c04e81'){
      nav_data.value = el.vaccine
    }else if(el._id === '26da8e4962e654100418ae552a59c536'){
      reserve.value = el.reserve
    }else if(el._id === '26da8e4962e654100418ae56795eae0d'){
      popular.value = el.popular
    }
  })
}

</script>

<style scoped>
.title{
  position: fixed;
  color: #ffffff;
  left: 15px;
  top: v-bind('menu_top');
  line-height: v-bind('menu_height');
}
.nav_list{
  display: flex;
  padding: 10px 0;
}
.nav_list .list{
  width: 25%;
  text-align: center;
  font-size: 12px;
}
.nav_list .list view{
  width: 100%
}
.topImg image{width: 100%;}
.nav_list view image{
  width: 25px;
  height: 25px;
}
.nav_pic{
  display: flex;
  justify-content:space-around;
}
.nav_pic .list{
  width: 38%;
  height: 70px;
  position: relative;
  color: #ffffff;
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 10px;
}
.nav_pic .list:first-child{
  background:linear-gradient(to right, rgb(218, 241, 246), rgb(117, 117, 254))
}
.nav_pic .list .titles{
  color:rgb(164, 145, 5);
  font-size: 18px;
  margin-bottom: 5px;
}
.nav_pic .list:first-child .titles{
  color:rgb(24, 81, 173)
}
.nav_pic .list:last-child{
  background:linear-gradient(to right,  rgb(242, 245, 183),rgb(224, 193, 19))
}
.nav_pic .list image{
  width: 40%;
  position: absolute;
  right: 5px;
  bottom: 0px;
}
.titleBox{
  padding: 10px;
  font-size: 14px;
  position: relative;
}
.titleBox .title1{
  font-size: 16px;
}
.titleBox .more{
  position: absolute;
  right: 10px;
  top:12px;
}
.guahao{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
}
.guahao .guahaoList{
  width: 24%;
  height: 28px;
  line-height: 28px;
  margin-bottom: 12px;
  font-size: 12px;
  padding: 10px;
  position: relative;
  border-radius: 5px;
}
.guahao .guahaoList image{
  height: 20px;
  position: absolute;
  right: 5px;
  top: 15px;
}
</style>
