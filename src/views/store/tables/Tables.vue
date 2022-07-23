<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-12 17:46:44
 * @FilePath: \vue-order-control\src\views\store\tables\Tables.vue
 * @LastEditTime: 2022-05-23 21:12:02
 * @LastEditors: RayseaLee
-->
<template>
  <div class='table-container'>
    <div class='table-item' v-for="(item, index) in tableInfo" :key="index">
      <div class='table-item-opr' :class="{'is-occupy-opr': item.occupy}" @click="handleClick(item)"><i class="el-icon-edit"></i></div>
      <div class='table-item-left' :class="{'is-occupy': item.occupy}">{{item.name}}</div>
      <div class='table-item-middle'>
        <div>
          桌台状态：{{item.occupy ? '占用' : '空闲'}}
        </div>
        <div>桌台容量：{{item.contain}}人</div>
        <div v-if="item.orders.length !== 0">用餐人数：{{item.orders[0].meals_number}}人</div>
        <div v-if="item.complete != null">
          上菜进度：{{item.complete ? '已完成' : '进行中'}}
        </div>
      </div>
    </div>
    <edit-table-dialog :dialog-visible='dialogVisible' :tableItemInfo="tableItemInfo" @close="handleClose" @confirm="handleConfirm"></edit-table-dialog>
  </div>
</template>

<script>
import {getTableInfo} from 'api/store'
import EditTableDialog from './childComps/EditTableDialog'
export default {
  components: {
    EditTableDialog
  },
  data () {
    return {
      tableInfo: [],
      dialogVisible: false,
      tableItemInfo: {}
    }
  },
  created() {
    // this.$bus.$on('orderItemClick', orderInfo => {
    //   this.tableInfo.forEach
    //   localStorage.setItem('orderId', orderInfo.table_id)
    // })
    this.getTableInfo()
  },
  methods: {
    getTableInfo() {
      getTableInfo().then(res => {
        console.log(res)
        const {status} = res.data.meta
        if(status == 200) {
          this.tableInfo = res.data.data
        }
        console.log(this.tableInfo[0].orders.length);
      })
    },
    handleClick(item) {
      this.dialogVisible = true
      this.tableItemInfo = item
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.getTableInfo()
      this.dialogVisible = false
    }
  },
}
</script>
<style lang="less" scoped>
.table-container {
  height: calc(100% - 28px);
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  padding: 15px 0 15px 15px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: auto;
  color: #303133;
  transition: .3s;
  .table-item {
    width: 24%;
    height: 200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    transition: .3s;
    .table-item-opr {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      cursor: pointer;
      color: #409eff;
    }
    .table-item-opr:active {
      color: #abd4fe;
    }
    .table-item-left {
      width: 90px;
      height: 90px;
      line-height: 90px;
      border-radius: 50%;
      border: 10px solid #409eff;
      color: #409eff;
      font-weight: bold;
      text-align: center;
    }
    .table-item-middle {
      height: 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 14px;
    }
  }
  .table-item:hover {
    box-shadow: 0 2px 16px 0 rgb(0 0 0 / 20%);
  }
  .is-occupy {
    border: 10px solid #ff6a6a !important;
    color: #ff6a6a !important;
  }
  .is-occupy-opr {
    color: #ff6a6a !important;
    // cursor: not-allowed !important;
  }
}
</style>
