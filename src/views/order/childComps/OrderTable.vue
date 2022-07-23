<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-03-30 14:53:55
 * @FilePath: \vue-order-control\src\views\order\childComps\OrderTable.vue
 * @LastEditTime: 2022-04-18 15:36:15
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-table :data="ordersInfo" row-key="id" :expand-row-keys="expandRowKeys">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <goods-item :goodsInfo="item" v-for="(item, index) in scope.row.goodsInfo" :key="index"></goods-item>
        </template>
      </el-table-column>
      <!-- <el-table-column label="订单信息" align='center'> -->
        <el-table-column label="订单编号" prop="order_id" width="180"></el-table-column>
        <el-table-column label="订单状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag :type="tagList[scope.row.status]">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="150" align="center"></el-table-column>
        <el-table-column label="订单金额" prop="total_price" align="center"></el-table-column>
        <el-table-column label="优惠金额" prop="discount_price" align="center"></el-table-column>
        <el-table-column label="成交金额" prop="deal_price" align="center"></el-table-column>
        <el-table-column label="餐桌" prop="table_name" align="center"></el-table-column>
        <el-table-column label="用餐人数" prop="meals_number" align="center"></el-table-column>
        <el-table-column label="下单时间" prop="order_time" width='160' align="center"></el-table-column>
        <el-table-column label="完成时间" prop="finish_time" width='160' align="center"></el-table-column>
      <!-- </el-table-column> -->
      <!-- <el-table-column label="用户信息" align='center'> -->
        <el-table-column label="用户昵称" prop="wx_user.nickname" align="center"></el-table-column>
        <el-table-column label="用户头像" prop="wx_user.avatar" align="center">
          <template slot-scope="scope" width='100'>
            <el-avatar :src='scope.row.wx_user.avatar' :size='50'></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="wx_gender" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.wx_user.gender == 0 ? '男' : '女'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.status == '进行中'"  class="item" effect="dark" content="完成订单" placement="top">
              <el-button type="success" size="small" icon="el-icon-check" circle @click="handleComplete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      <!-- </el-table-column> -->
    </el-table>
    <pagination :queryInfo="queryInfo" :total="total" @change="handleChange"></pagination>
  </div>
</template>
<script>
import GoodsItem from './GoodsItem.vue'
import Pagination from 'components/pagination/Pagination.vue'
import {updateOrderStatus} from 'api/order'

export default {
  components: {
    GoodsItem,
    Pagination
  },
  props: {
    ordersInfo: {
      type: Array,
      default() {
        return []
      }
    },
    queryInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // expandRowKeys: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    total: Number
  },
  data () {
    return {
      tagList: {
        '进行中': '',
        '待支付': 'warning',
        '已完成': 'success',
        '已取消': 'info'
      },
      expandRowKeys: []
    }
  },
  created() {
    this.$bus.$on('orderItemClick', orderInfo => {
      this.$emit('query')
      localStorage.setItem('orderId', orderInfo.id)
    })
  },
  destroyed() {
    this.expandRowKeys = []
    localStorage.removeItem('orderId')
  },
  methods: {
    handleChange() {
      this.$emit('pageChange', this.queryInfo)
    },
    handleComplete(data) {
      this.$confirm('菜品是否已经全部上齐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateOrderStatus({
          id: data.id,
          status: '已完成',
          finish_time: new Date(),
          table_id: data.table_id
        }).then(res => {
          console.log(res)
          const {status, msg} = res.data.meta
          if (status != 200) return this.$message.error(msg)
          this.$message.success('修改成功')
          this.$emit('query')
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  },
  watch: {
    ordersInfo: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if(localStorage.getItem('orderId')) {
          this.expandRowKeys.push(localStorage.getItem('orderId'))
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>

</style>
