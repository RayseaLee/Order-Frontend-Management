<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-30 17:49:33
 * @FilePath: \vue-order-control\src\views\order\childComps\GoodsItem.vue
 * @LastEditTime: 2022-04-12 14:17:25
 * @LastEditors: RayseaLee
-->
<template>
  <div class='goodsItem-container'>
    <img :src="goodsInfo.goodsPics[0].pic_url" alt="菜品图片">
    <div class="goods-name">{{goodsInfo.name}}</div>
    <div class="goods-params">{{goodsInfo.orderGoods.params}}</div>
    <div class="goods-price">￥{{goodsInfo.orderGoods.unit_price}}</div>
    <div class="goods-number">×{{goodsInfo.orderGoods.number}}</div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    goodsInfo: {
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
  },
}
</script>
<style lang="less" scoped>
.goodsItem-container {
  min-height: 100px;
  min-width: 300px;
  float: left;
  cursor: pointer;
  position: relative;
  border:  1px solid rgb(233, 233, 233);
  border-radius: 10px;
  box-shadow: 0 0 10px rgb(233, 233, 233);
  margin: 0 5px 10px 5px;
  img {
    height: 100px;
    width: 100px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
  }
  .goods-name {
    position: absolute;
    left: 110px;
    top: 5px;
    font-weight: bold;
  }
  .goods-params {
    position: absolute;
    left: 110px;
    top: 25px;
    font-size: 13px;
  }
  .goods-price {
    position: absolute;
    left: 110px;
    bottom: 10px;
  }
  .goods-number {
    position: absolute;
    right: 15px;
    bottom: 10px;
  }
}
.goodsItem-container:hover {
  box-shadow: 0 0 20px rgb(219, 219, 219);
  transition: .3s
}
</style>
