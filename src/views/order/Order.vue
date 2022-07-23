<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-27 17:04:25
 * @FilePath: \vue-order-control\src\views\order\Order.vue
 * @LastEditTime: 2022-04-12 15:10:18
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-card>
      <span>订单状态：</span>
      <el-select v-model="queryInfo.status" @change="selectChange" @clear="queryInfo.status = ''" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <order-table @query="handleQuery" @pageChange="handleChange" :queryInfo="queryInfo" :ordersInfo="orders" :total="total"></order-table>
    </el-card>
  </div>
</template>

<script> 
import OrderTable from './childComps/OrderTable.vue'
import {getOrderInfo} from 'api/order'
export default {
  components: {
    OrderTable
  },
  data () {
    return {
      orders: [],
      total: 0,
      queryInfo: {
        status: "",
        pageSize: 5,
        pageNum: 1
      },
      options: [
        {
          value: '进行中',
          label: '新订单'
        },
        {
          value: '待支付',
          label: '待支付'
        },
        {
          value: '已完成',
          label: '已完成'
        },
        {
          value: '已取消',
          label: '已取消'
        }
      ],
      expandRowKeys: [],
      orderId: 0
    }
  },
  created() {
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo() {
      getOrderInfo(this.queryInfo).then(res => {
        this.orders = res.data.data.orders
        this.total = res.data.data.total
      })
    },
    handleChange(queryInfo) {
      this.queryInfo = queryInfo
      this.getOrderInfo()
    },
    selectChange() {
      this.queryInfo.pageNum = 1
      this.getOrderInfo()
    },
    handleQuery() {
      this.getOrderInfo()
    }
  },
}
</script>
<style lang="less" scoped>

</style>
