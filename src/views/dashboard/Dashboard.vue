<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-07 15:24:36
 * @FilePath: \vue-order-control\src\views\dashboard\Dashboard.vue
 * @LastEditTime: 2022-05-13 17:43:59
 * @LastEditors: RayseaLee
-->
<template>
  <div class='dashboard'>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="dashboard-card" style="color: #2196f3">
          <span>总营业额(元):</span>
          <span>{{turnover}}</span> 
        </div>
      </el-col>
      <el-col :span="5">
        <div class="dashboard-card" style="color: #e91e63">
          <span>总订单数:</span>
          <span>{{orderInfo.length}}</span> 
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getTurnover, getOrderInfo} from 'api/dashboard'
export default {
  components: {},
  data () {
    return {
      title: '首页',
      turnover: 0,
      orderInfo: []
    }
  },
  created() {
    this.getDashboardInfo()
  },
  methods: {
    async getDashboardInfo() {
      const {data:turnover} = await getTurnover()
      this.turnover = turnover.data
      const {data:orderInfo} = await getOrderInfo()
      this.orderInfo = orderInfo.data
      console.log(this.turnover, this.orderInfo);
    }
  }
}
</script>
<style lang="less" scoped>
.dashboard-card {
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-evenly;
  font-weight: bold;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #2196f3;
  transition: .3s;
  cursor: pointer;
}
.dashboard-card:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.dashboard-card span:last-child {
  font-size: 25px
}
</style>
