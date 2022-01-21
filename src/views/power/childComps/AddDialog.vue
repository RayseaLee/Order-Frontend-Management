<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:38:38
 * @FilePath: \vue\vue-order-control\src\views\power\childComps\AddDialog.vue
 * @LastEditTime: 2021-12-20 10:43:40
 * @LastEditors: RayseaLee
-->
<template>
  <!-- 添加对话框 -->
  <div>
    <my-dialog
      :title="title"
      :width="width"
      :dialogVisible="addDialogVisible"
      @close="close"
      @confirm="confirm">
      <el-form 
        :model="addForm" 
        :rules="addFormRules" 
        status-icon 
        ref="addFormRef" 
        label-width="80px">
        <el-form-item label="角色名称" prop=roleName>
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop=roleDesc>
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import { roleName, roleDesc } from 'common/check.js'
import { addRolesInfo } from 'api/rights.js'
import  MyDialog  from 'components/mydialog/MyDialog.vue'
export default {
  components: {
    MyDialog
  },
  props: {
    addDialogVisible: false
  },
  data () {
    return {
      title: '添加角色',
      width: '40%',
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName,
        roleDesc
      }
    }
  },
  methods: {
    // 取消
    close() {
      this.$refs.addFormRef.resetFields()
      this.$emit('close')
    },
    // 确认
    confirm() {
      this.$refs.addFormRef.validate(valid => {
        if(!valid) return
        // 发起网络请求
        addRolesInfo(this.addForm).then(res => {
          if(res.data.meta.status !== 201) {
            this.$message.error('添加用户失败')
          } else {
            this.$message.success('添加用户成功')
            this.$emit('close', res.data.meta.status)
          }
        })
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
