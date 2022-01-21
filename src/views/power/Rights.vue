<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:37:10
 * @FilePath: \vue\vue-order-control\src\views\power\Rights.vue
 * @LastEditTime: 2021-12-17 17:40:55
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <!-- 面包屑导航区域 -->
    <!-- <bread-crumb>
      <span slot="first">权限管理</span>
      <span slot="second">权限列表</span>
    </bread-crumb> -->

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === 0" effect="dark">一级</el-tag>
            <el-tag v-else-if="scope.row.level === 1" type="success" effect="dark">二级</el-tag>
            <el-tag v-else type="warning" effect="dark">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import BreadCrumb from 'components/common/breadcrumb/BreadCrumb.vue'
import { getRightsList } from 'api/rights'
export default {
  components: {
    // BreadCrumb
  },
  data () {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      getRightsList('list').then(res => {
        this.rightsList = res.data.data
        console.log(res);
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>