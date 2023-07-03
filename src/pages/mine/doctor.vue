<template>
    <view class="title">深圳市第一人民医院1</view>
    <view class="docBox">
        <view class="docList"></view>
    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { RequestApi } from '@/public/request';
import { ref } from 'vue';
import { onMounted } from 'vue';
const docId = ref<string>('')
let menu_top = ref<string>('')
let menu_height = ref<string>('')
onMounted(() => {
  let getMenu = uni.getStorageSync('Menubutton')
  menu_top.value = getMenu.top + 'px'
  menu_height.value = getMenu.height + 'px'
})
onLoad((options:any) =>{
	docId.value = options.id;
})
onMounted(() => {
    getDoctor()
})
async function getDoctor(){
    let res:any = await RequestApi.GetAlldlist(docId.value)
    console.log(res)
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
</style>