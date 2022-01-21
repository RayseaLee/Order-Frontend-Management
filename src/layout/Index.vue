<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 10:19:23
 * @FilePath: \vue\vue-order-control\src\layout\Index.vue
 * @LastEditTime: 2021-12-29 15:13:46
 * @LastEditors: RayseaLee
-->
<template>
  <el-container class="home_container">
    <!-- 首部 -->
    <el-header>
      <header-bar @toggleCollapse="toggleCollapse"/>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <aside-nav-bar :menu-list="menuList" :is-collapse="isCollapse"/>
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <bread-crumb v-show='isShow'></bread-crumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BreadCrumb from '../components/breadcrumb/BreadCrumb.vue'
import AsideNavBar from './AsideNavBar'
import HeaderBar from './HeaderBar'
import { getMenuList } from '../api/home'
export default {
  components: {
    AsideNavBar,
    HeaderBar,
    BreadCrumb
  },
  data() {
    return {
      menuList: [],
      isCollapse: false,
      isShow: false,
      active: null
    }
  },
  created() {
    if(this.$route.path != '/home' && JSON.stringify(this.$route.meta) != '{}') {
      this.isShow = true
    }
    // 获取所有的菜单
    getMenuList().then(res => {
      if(res.data.meta.status !== 200) {
        this.$message.error(res.data.meta.msg)
        return this.$router.push('/login')
      }
      this.menuList = res.data.data
    })
  },
  methods: {
    toggleCollapse(isCollapse) {
      this.isCollapse = isCollapse 
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/home' || JSON.stringify(to.meta) == '{}') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  padding: 0px 20px 0px 10px;
}

.el-aside {
  background-color: #333744;
  transition: 500ms;
}

.el-main {
  background-color: #eaedf1;
}

</style>
