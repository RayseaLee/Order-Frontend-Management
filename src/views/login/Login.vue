<template>
  <div class='login_container'>
    <h2 class="title">{{title}}</h2>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.jpeg" alt="头像">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username" 
            prefix-icon="el-icon-user" 
            placeholder="用户名">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="密码">
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/login'
import {encrypt} from '../../common/encrypt'
export default {
  components: {},
  data () {
    return {
      title: '小程序订单管理系统',
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
      console.log(this.$refs.loginFormRef);
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if(!valid) return
        else {
          getUserInfo({
            username: this.loginForm.username, 
            password: this.loginForm.password
          }).then(res => {
            const {status, msg} = res.data.meta
            console.log(res);
            if (status !== 200) {
              this.$message.error(msg)
            } else {
              this.$message.success(msg)
              // 登陆成功，将用户信息存入session
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
              // 1. 将登陆成功之后的 token 保存到客户端的 sessionStorage 中
              //    1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
              //    1.2 token 只应在当前网页打开期间生效，所以将 token 保存在 sessionStorage 中
              sessionStorage.setItem('token', res.data.data.token)
              this.$router.push('/index')
            }
          })
        }
      })
    },
  },
  mounted() {
    //this.login = debounce(this.login_db, 500)
    // this.$on('click', this.login)
  }
}
</script>
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
    overflow: hidden;

    .title {
      margin: 0;
      margin-top: 80px;
      text-align: center;
      color: #fff;
    }

    .login_box {
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 3px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .avatar_box {
        width: 120px;
        height: 120px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        background-color: #fff;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }

      .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;

        .btns {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
