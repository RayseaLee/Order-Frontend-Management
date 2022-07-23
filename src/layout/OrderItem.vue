<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-11 14:17:23
 * @FilePath: \vue-order-control\src\layout\OrderItem.vue
 * @LastEditTime: 2022-04-14 17:40:21
 * @LastEditors: RayseaLee
-->
<template>
  <div class='order-item-container' @click="handleClick">
    <div class='order-item-header'>
      <div>
        <div>订单编号：{{orderInfo.order_id}}</div>
        <div>下单时间：{{orderInfo.order_time | filterDate}}</div>
      </div>
      <div>{{orderInfo.status}}</div>
    </div>
    <div class='order-item-footer'>
      <div>共计<span>{{orderInfo.number}}</span>件菜品</div>
      <div>合计￥<span>{{orderInfo.deal_price}}</span></div>
    </div>
  </div>
</template>

<script>
import {formatTime} from '../common/utils'
export default {
  components: {},
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleClick() {
      this.$bus.$emit('orderItemClick', this.orderInfo)
      this.$emit('deleteNewOrder', this.orderInfo.id)
      if(this.$route.path != '/orders') {
        this.$router.push('/orders')
      }
      // this.$router.push({
      //   path: '/orders',
      //   query: {
      //     id: this.orderInfo.id
      //   }
      // })
    }
  },
  filters:{
    filterDate(val) {
      return formatTime(new Date(Date.parse(val)))
    }
  }
}
</script>
<style lang="less" scoped>
.order-item-container {
  width: 100%;
  height: 85px;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgb(206, 206, 206);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .order-item-header {
    display: flex;
    justify-content: space-between;
  }
  .order-item-footer {
    display: flex;
    justify-content: space-between;
  }
}
.order-item-container:hover {
  box-shadow: 0 0 10px rgb(177, 177, 177);
  transition: .3s
}
</style>
