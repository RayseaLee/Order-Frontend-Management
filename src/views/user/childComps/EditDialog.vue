<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:39:05
 * @FilePath: \vue\vue-order-control\src\views\user\childComps\EditDialog.vue
 * @LastEditTime: 2021-12-17 17:40:21
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible="isShow"
      @close="close"
      width="30%">
      <el-form 
        :model="editForm" 
        :rules="editFormRules" 
        status-icon ref="editFormRef" 
        label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop=email>
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机" prop=mobile>
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { username, email } from 'common/check.js' 
import { editUserInfo } from 'api/user'

export default {
  props: {
    editDialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    editForm: {
      type: Object,
      default() {
        return {
          username: '',
          email: ''
        }
      }
    },
    id: {
      type: Number,
    }
  },
  data() {
    return {
      editFormRules: {
        username,
        email
      }
    }
  },
  methods: {
    close() {
      // 关闭重置表单状态
      this.$refs.editFormRef.resetFields()
      // 发送关闭事件
      this.$emit('close')
    },
    // 修改用户信息
    updateUser() {
      this.$refs.editFormRef.validate(valid => {
        if(!valid) return
        // 发起网络请求
        editUserInfo(this.id, this.editForm.email).then(res => {
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
  computed: {
    isShow() {
      return this.editDialogVisible
    }
  }
}
</script>
<style lang="less" scoped>
</style>
