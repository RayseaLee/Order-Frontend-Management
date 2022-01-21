<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-23 10:41:34
 * @FilePath: \vue\vue-order-control\src\views\store\childComps\StoreNotice.vue
 * @LastEditTime: 2021-12-27 10:38:49
 * @LastEditors: RayseaLee
-->
<template>
  <el-card shadow="hover" class='store-notice'>
    <div slot="header" class="clearfix">
      <span>公告</span>
      <el-button v-show='isActive' style="float: right; padding: 3px 0 3px 5px" type="text" @click='cancelEditClick'>撤销编辑</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click='editClick'>{{text}}</el-button>
    </div>
    <div class='store-notice-content' v-show='!isActive'>{{notice}}</div>
    <el-input
      v-show='isActive'
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 8}"
      v-model="inputNotice">
    </el-input>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    notice: {
      type: String
    }
  },
  data () {
    return {
      isActive: false,
      inputNotice: ''
    }
  },
  methods: {
    editClick() {
      this.isActive = !this.isActive
      if(!this.isActive) {
        this.$emit('update', {notice: this.inputNotice})
        // updateStoreInfo({notice: this.inputNotice}).then(res => {
        //   console.log(res)
        //   if(res.data.meta.status != 200) {
        //     return this.$message.error(res.data.meta.msg)
        //   }
        //   this.inputNotice = res.data.data.notice
        //   this.$message.success('保存成功')
        // })
      }
    },
    cancelEditClick() {
      this.isActive = !this.isActive
    }
  },
  computed: {
    text() {
      return this.isActive ? '保存' : '编辑'
    }
  },
  watch: {
    notice(newVal, oldVal) {
      this.inputNotice = newVal
    }
  }
}
</script>
<style lang="less" scoped>
.store-notice {
  height: 300px;
  // 文本最多显示十行，超出部分用省略号表示
  .store-notice-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // 英文单词以及url过长也换行
    word-wrap: break-word;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
  }
}
</style>
