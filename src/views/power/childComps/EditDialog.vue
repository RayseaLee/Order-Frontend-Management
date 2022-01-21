<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:38:38
 * @FilePath: \vue\vue-order-control\src\views\power\childComps\EditDialog.vue
 * @LastEditTime: 2021-12-17 17:39:00
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <my-dialog
      :title="title"
      :width="width"
      :dialogVisible="editDialogVisible"
      @close="close"
      @confirm="confirm">
      <el-form 
        :model="editForm" 
        :rules="editFormRules" 
        status-icon ref="editFormRef" 
        label-width="80px">
        <el-form-item label="角色名称" prop=roleName>
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop=roleDesc>
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import { roleName, roleDesc } from 'common/check.js' 
import { editRolesInfo } from 'api/rights.js'
import  MyDialog  from 'components/mydialog/MyDialog.vue'


export default {
  components: {
    MyDialog
  },
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false,
    },
    editForm: Object,
    id: Number
  },
  data () {
    return {
      title: '修改角色信息',
      width: '50%',
      editFormRules: {
        roleName,
        roleDesc,
      }
    }
  },
  methods: {
    close() {
      this.$refs.editFormRef.resetFields()
      this.$emit('close')
    },
    confirm() {
      this.$refs.editFormRef.validate(valid => {
        if(!valid) return
        // 发起网络请求
        editRolesInfo(this.id, this.editForm.roleName, this.editForm.roleDesc).then(res => {
          if(res.data.meta.status !== 200) {
            return this.$message.error('修改用户信息失败')
          } 
          this.$message.success('修改用户信息成功')
          // 成功后关闭
          this.$emit('close', res.data.meta.status)
        })
      })
    }
  },
}
</script>
