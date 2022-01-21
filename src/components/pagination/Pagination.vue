<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:44:07
 * @FilePath: \vue\vue-order-control\src\components\pagination\Pagination.vue
 * @LastEditTime: 2021-12-16 11:35:13
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="pageSizes"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>

<script>

export default {
  props: {
    queryInfo: {
      type: Object,
      default() {
        return {
          query: '',
          pageNum: 1,
          pageSize: 8
        }
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default() {
        return [6, 8, 10, 15, 20]
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 每页的数据量改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.$emit("change")
    },
    // 当前的页码变化
    handleCurrentChange(newNum) {
      this.queryInfo.pageNum = newNum
      this.$emit("change")
    },
  },
}
</script>
<style lang="less" scoped>

</style>
