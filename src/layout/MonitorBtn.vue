<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-30 15:53:34
 * @FilePath: \vue-order-control\src\layout\MonitorBtn.vue
 * @LastEditTime: 2022-04-24 16:05:06
 * @LastEditors: RayseaLee
-->
<template>
  <div class="circle">
    <div class="box"></div>
    <div class="box box-a"></div>
    <div class="box box-b"></div>
    <div class="box box-c"></div>
    <div class="text">{{newOrderNum}}</div>
  </div>
</template>

<script>
import {hostName} from '../config/'
export default {
  components: {},
  props: {
    newOrderNum: Number
  },
  data () {
    return {
    }
  },
  mounted() {
    const ws = new WebSocket(`ws://${hostName}:3000/orders/websockets`)
    ws.onopen = () => {
      console.log('WebSocket onopen')
    }
    ws.onmessage = e => {
      //接收消息并处理
      const data = JSON.parse(e.data)
      if(data.orderInfo) {
        this.$notify({
          title: '提示',
          message: '您有新的订单'
        });
        this.$emit('addNewOrder', data.orderInfo)
      }
    }
  },
  methods: {
  },
}
</script>
<style lang="less" scoped>
.circle{
  position: relative;
  height: 60px;
  line-height: 60px;
  width: 60px;
  cursor: pointer;
}
/*动效*/
@keyframes warn {
  0% {
      transform: scale(0.5);
      opacity: 0;
  }
  25% {
      transform: scale(0.5);
      opacity: 0.8;
  }
  // 50% {
  //     transform: scale(0.8);
  //     opacity: 0.6;
  // }
  // 75% {
  //     transform: scale(0.9);
  //     opacity: 0.3;
  // }
  100% {
      transform: scale(1);
      opacity: 0;
  }
}
.box {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgb(64, 158, 255, 0.5);
  border: 6px solid rgb(64, 158, 255, 0.5);
  border-radius: 50px;
  z-index: 1;
  opacity: 0;
  animation: warn 4s ease-out infinite;
}
.box-a{
  animation-delay:1s;
  /* -webkit-animation-delay:1s; Safari 和 Chrome */
}
.box-b{
  animation-delay:2s;
}
.box-c{
  animation-delay:3s;
}
.text {
  width: 100%;
  position: absolute;
  text-align: center;
  color: rgb(255, 255, 255);
  font-weight: bold;
  z-index: 99;
}
</style>
