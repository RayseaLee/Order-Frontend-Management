<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:39:05
 * @FilePath: \vue\vue-order-control\src\views\user\childComps\AddDialog.vue
 * @LastEditTime: 2021-12-17 14:05:57
 * @LastEditors: RayseaLee
-->
<template>
  <!-- 对话框 -->
  <div>
    <el-dialog
      title="添加用户"
      :visible="isShow"
      @close="close"
      width="40%">
      <el-form 
        :model="addForm" 
        :rules="addFormRules" 
        status-icon 
        ref="addFormRef" 
        label-width="80px"
        >
        <el-form-item label="用户名" prop=username>
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop=password>
          <el-input show-password v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop=checkPassword>
          <el-input show-password v-model="addForm.checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop=email>
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUserInfo, usernameIsExist } from '../../../api/user'
import { username, password, email } from 'common/check.js' 
export default {
  components: {},
  props: {
    addDialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (this.addForm.checkPassword !== '') {
        this.$refs.addFormRef.validateField('checkPassword')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.addForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateUsername = async (rule, value, callback) => {
      const res = await usernameIsExist(value)
      if (res.data.meta.status !== 200) {
        callback(new Error('用户名已存在!'))
      } else {
        callback()
      }
    }
    return {
      addForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
      },
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名的长度在2-10个字符之间', trigger: 'blur'},
          {validator: validateUsername, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'},
          {min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'}
        ],
        email,
        checkPassword: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    isShow() {
      return this.addDialogVisible
    }
  },
  methods: {
    //关闭对话框
    close() {
      this.$refs.addFormRef.resetFields()
      this.$emit('close')
    },

    // 点击按钮,添加用户
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if(!valid) return
        // 发起网络请求
        addUserInfo(this.addForm).then(res => {
          if(res.data.meta.status !== 201) {
            this.$message.error(res.data.meta.msg)
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
