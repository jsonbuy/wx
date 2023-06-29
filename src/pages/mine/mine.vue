<template>
  <view class="content">
    <scroll-view class="nav" scroll-y>
      <view class="listView" v-for="item in list"  :class="{'active' : item._id == listId}">
          {{ item.dep_ment }}
      </view>
    </scroll-view>
      <view class="listCon">
        <view>111</view>
      </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RequestApi } from '@/public/request'
const list = ref<any[]>([])
const listId = ref<string>('af2b6af462e1780b000b7ac649eef401')
onMounted(() => {
  let getMenu = uni.getStorageSync('Menubutton')
  console.log(getMenu)
  mine()
})
async function mine(){
  const res:any = await RequestApi.MinePage()
  list.value = res.data.data
}
</script>
<style>
page{height:100%}
.content{
  height: 100%;
  display: flex;
}
.content .nav{
  width: 30%;
  height: 100%;
  font-size: 13px;
  background-color: #f5f7f8;
}
.listView{
  padding: 12px 10px;
}
.active{
  background-color: #fff;
}
.listCon{
  flex: 1;
}
</style>
