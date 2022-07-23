<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 10:19:23
 * @FilePath: \vue-order-control\src\layout\Index.vue
 * @LastEditTime: 2022-05-13 15:20:22
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
        <el-popover
          title="新增订单: "
          placement="top-start"
          width="400"
          trigger="hover"
          popper-class="popover">
          <div class="order-info-container">
            <order-item v-for="(item, index) in newOrderArr" :orderInfo="item" :key="index" @deleteNewOrder="handleDelete"></order-item>
            <el-empty v-if="newOrderArr.length == 0" description="暂无新增订单"></el-empty>
          </div>
          <!-- <el-button slot="reference">hover 激活</el-button> -->
          <div class="monitor-btn" slot="reference"><monitor-btn @addNewOrder="handleAdd" :newOrderNum="newOrderNum"></monitor-btn></div>
        </el-popover>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BreadCrumb from '../components/breadcrumb/BreadCrumb.vue'
import AsideNavBar from './AsideNavBar'
import HeaderBar from './HeaderBar'
import MonitorBtn from './MonitorBtn.vue'
import OrderItem from './OrderItem.vue'
import { getMenuList } from '../api/dashboard'
export default {
  components: {
    AsideNavBar,
    HeaderBar,
    BreadCrumb,
    MonitorBtn,
    OrderItem
  },
  data() {
    return {
      menuList: [],
      isCollapse: false,
      isShow: false,
      active: null,
      newOrderArr: [],
      newOrderNum: 0
    }
  },
  created() {
    if(this.$route.path != '/dashboard' && JSON.stringify(this.$route.meta) != '{}') {
      this.isShow = true
    }
    console.log(JSON.parse(sessionStorage.getItem('userInfo')).roleId)
    // 获取所有的菜单
    getMenuList({
      roleId: JSON.parse(sessionStorage.getItem('userInfo')).roleId
    }).then(res => {
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
    },
    handleAdd(data) {
      this.newOrderNum++
      this.newOrderArr.push(data)
    },
    handleDelete(id) {
      const arr = this.newOrderArr.filter(order => {
        return order.id != id
      })
      this.newOrderNum--
      this.newOrderArr = arr
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/dashboard' || JSON.stringify(to.meta) == '{}') {
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

.monitor-btn {
  position: fixed;
  right: 40px;
  bottom: 10px;
  z-index: 999;
}

.popover {
  height: 650px;
}

.order-info-container {
  min-height: 150px;
  max-height: 300px;
  padding: 10px;
  overflow: auto;
}

</style>
