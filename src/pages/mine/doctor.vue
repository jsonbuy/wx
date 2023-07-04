<template>
    <view class="docBox">
        <view class="docList" v-for="item in docList">
          <view class="images">
            <image mode="widthFix" :src="item.avatar"></image>
          </view>
          <view class="text">
            <view class="name">{{ item.name }} {{ item.post }}</view>
            <view>{{ item.good_at }}</view>
          </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { RequestApi } from '@/public/request';
import { ref } from 'vue';
import { onMounted } from 'vue';
const docId = ref<string>('')
const docList = ref<any[]>([])

onLoad((options:any) =>{
	docId.value = options.id;
})
onMounted(() => {
    getDoctor()
})
async function getDoctor(){
    let res:any = await RequestApi.GetAlldlist(docId.value)
    docList.value = res.data.data
}
</script>
<style scoped>
.docBox{padding: 10px;}
.docList{display: flex;}
.images{
  width: 80px;
  height: 100px;
  overflow: hidden;
  margin-right: 10px;
}
.images image{
  width: 100%;
}
.docList .text{
  flex: 1;
  font-size: 12px;
}
.text .name{
  margin-bottom: 10px;
  font-size: 14px;
}
</style>