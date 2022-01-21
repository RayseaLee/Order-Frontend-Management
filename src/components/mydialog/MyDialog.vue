<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:46:36
 * @FilePath: \VScode\vue\vue-order-control\src\components\mydialog\MyDialog.vue
 * @LastEditTime: 2022-01-11 14:06:11
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      :width="width"
      @close="close"
      @open="open">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    width: {
      type: String,
      default() {
        return ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    },
    open() {
      this.$emit('open')
    }
  },
}
</script>
<style lang="less" scoped>

</style>
