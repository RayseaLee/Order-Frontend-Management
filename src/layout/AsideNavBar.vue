<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 10:22:14
 * @FilePath: \vue\vue-order-control\src\layout\AsideNavBar.vue
 * @LastEditTime: 2021-12-28 15:15:40
 * @LastEditors: RayseaLee
-->
<template>
  <el-menu
    :unique-opened="true"
    :collapse="isCollapse"
    :collapse-transition="false"
    :router='true'
    :default-active="activePath"
    background-color="#333744"
    class="el-menu"
    text-color="#fff">

    <!-- 一级菜单 -->
    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
      <template slot="title">
        <!-- 图标 -->
        <i :class="iconObj[item.id]"></i>
        <!-- 文本 -->
        <span>{{ item.name }}</span>
      </template>

      <!-- 二级菜单 -->
      <el-menu-item
        :index="'/' + item_child.path"
        v-for="item_child in item.children"
        :key="item_child.id"
        @click="changeNav('/' + item_child.path)">
        <template slot="title">
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{ item_child.name }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  components: {},
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      },
    },
    isCollapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  data() {
    return {
      iconObj: {
        1: 'iconfont icon-user',
        2: 'iconfont icon-tijikongjian',
        4: 'iconfont icon-shangpin',
        5: 'iconfont icon-danju',
        3: 'iconfont icon-baobiao',
      },
      activePath: null
    }
  },
  created() {
    this.activePath = this.$route.path
  },
  methods: {
    changeNav(activePath) {
      this.activePath = activePath
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      if (to.path == '/home') {
        this.activePath = null
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.iconfont {
  margin-right: 10px;
}
</style>
