<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 15:15:26
 * @FilePath: \vue-order-control\src\components\breadcrumb\BreadCrumb.vue
 * @LastEditTime: 2022-05-13 15:21:43
 * @LastEditors: RayseaLee
-->
<template>
  <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in routes" :key='index'>
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {
  data() {
    return {
      routes: []
    }
  },
  created() {
    if(this.$route.matched.length > 1 && JSON.stringify(this.$route.meta) != '{}') {
      this.routes.splice(0, this.routes.length, ...this.$route.matched[1].meta.alias)
    }
  },
  watch: {
    $route(to, from) {
      if(JSON.stringify(this.$route.meta) != '{}') {
        this.routes.splice(0, this.routes.length, ...to.meta.alias)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
