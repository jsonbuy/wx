<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  let getMenu = uni.getStorageSync('Menubutton')
  if(!getMenu){
    let res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('Menubutton',res)
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
