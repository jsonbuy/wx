<template>
  <view class="content">
    <scroll-view class="nav" scroll-y>
      <view class="listView" v-for="item in list" @click="getId(item._id)" data-id="item._id" :class="{'active' : item._id == listId}">
          {{ item.dep_ment }}
      </view>
    </scroll-view>
      <view class="listCon">
        <view class="listMine" @click="goToDoc(item.dep_id)" v-for="item in getListData" :key="item._Id">
        {{ item.dep_name }}
        </view>
      </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RequestApi } from '@/public/request'

const list = ref<any[]>([])
const getListData = ref<any[]>([])
const listId = ref<string>('')

onMounted(() => {
  let getMenu = uni.getStorageSync('Menubutton')
  mine()
})
function goToDoc(id:string):void{
  uni.navigateTo({
    url:'/pages/mine/doctor?id=' + id
  })
}
async function mine(){
  const res:any = await RequestApi.MinePage()
  list.value = res.data.data
  listId.value = list.value[0]._id
  getId(listId.value)
}
async function getId(id:string){
  const res:any = await RequestApi.GetReglist(id)
  listId.value = id
  getListData.value = res.data.data[0].dep_ment_list
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
.listMine{
  font-size: 12px;
  padding: 10px;
}
</style>
