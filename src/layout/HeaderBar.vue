<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-14 10:21:23
 * @FilePath: \vue\vue-order-control\src\layout\HeaderBar.vue
 * @LastEditTime: 2021-12-16 10:44:45
 * @LastEditors: RayseaLee
-->
<template>
  <div class="header">
      <div class="header-left">
        <img src="~assets/avatar.png" alt="">
        <transition name="right">
          <div class="el-icon-d-arrow-right" v-show="isCollapse" @click='toggleCollapse'></div>
        </transition>
        <transition name="title">
          <span class="title" v-show="!isCollapse">{{username}}</span>
        </transition>
        <transition name="left">
          <div class="el-icon-d-arrow-left" v-show="!isCollapse" @click='toggleCollapse'></div>
        </transition>
      </div>
      <div class="header-right">
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$message.success('退出成功')
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse 
      this.$emit('toggleCollapse', this.isCollapse)
    }
  },
  computed: {
    username() {
      return JSON.parse(sessionStorage.getItem('userInfo'))['username']
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .header-left {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 70%;
      border-radius: 50%;
    }
    .title {
      width: 135px;
      margin: 0 5px;
    }
    div {
      font-size: 25px;
      cursor: pointer;
      margin-top: 2px;
    }
    div:hover {
      color: rgb(110, 110, 110);
    }
  }
}

.title-leave-active,
.title-enter-active,
.left-leave-active,
.left-enter-active {
  transition: all .5s ease;
}
.title-enter, .title-leave-to,
.left-enter, .left-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}

</style>
