<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:36:03
 * @FilePath: \vue\vue-order-control\src\views\user\User.vue
 * @LastEditTime: 2021-12-17 17:38:42
 * @LastEditors: RayseaLee
-->
<template>
  <div class="user-list">
    <!-- 面包屑导航区域 -->
    <!-- <bread-crumb>
      <span slot="first">用户管理</span>
      <span slot="second">用户列表</span>
    </bread-crumb> -->

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" type="info" plain icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="openAddDialog()">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email" width='250px'></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="创建日期" prop="createdAt"></el-table-column>
        <el-table-column label="更新日期" prop="updatedAt"></el-table-column>
        <el-table-column label="状态" width='80px'>
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.status" 
              @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable=false>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="openEditDialog(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top"  :enterable=false>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>

            <!-- 分配角色按钮 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable=false>
              <el-button type="warning" icon="el-icon-setting" size="mini"  @click="openSetDialog(scope.row)"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <pagination :query-info="queryInfo" :total="total" @change="handleChange" :page-sizes="pageSizes"></pagination>

      <!-- 添加用户对话框 -->
      <add-dialog :add-dialog-visible="addDialogVisible" @close="close"></add-dialog>
      <!-- 修改用户对话框 -->
      <edit-dialog :edit-dialog-visible="editDialogVisible" :id="id" :edit-form="editForm" @close="close"></edit-dialog>
      <!-- 分配权限 -->
      <set-dialog :set-dialog-visible="setDialogVisible" :user-info="userInfo" :roles-list="rolesList"  @close="close"></set-dialog>
    </el-card>
  </div>
</template>

<script>
// import BreadCrumb from 'components/common/breadcrumb/BreadCrumb.vue'
import Pagination from 'components/pagination/Pagination.vue'
import { getUserList, updateUserState, getUserById, deleteUserById } from '../../api/user'
import { getRolesList } from '../../api/rights.js'
import AddDialog from './childComps/AddDialog.vue'
import EditDialog from './childComps/EditDialog.vue'
import SetDialog from './childComps/SetDialog.vue' 

export default {
  components: {
    AddDialog,
    EditDialog,
    SetDialog,
    // BreadCrumb,
    Pagination
  },
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pageNum: 1,
        // 每页的数据量
        pageSize: 4
      },
      pageSizes: [1, 2, 4, 8],
      userlist: [],
      total: 0,
      id: 0,
      editForm: {
        username: '',
        email: '',
      },
      userInfo: {},
      rolesList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      setDialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  mounted() {
    this.$on('change', this.userStateChanged)
  },
  methods: {
    // 获取用户列表
    getUserList() {
      getUserList(this.queryInfo).then(res => {
        if(res.data.meta.status === 401) {
          this.$message.error(res.data.meta.msg)
          return this.$router.push('/login')
        }
        this.userlist = res.data.data.users
        this.total = res.data.data.total
      })
    },
    // 分页组件改变
    handleChange() {
      this.getUserList()
    },
    // 用户状态改变
    userStateChanged(userinfo) {
      console.log(userinfo);
      updateUserState(userinfo.id, userinfo.status).then(res => {
        if(res.data.meta.status !== 200) {
          userinfo.status = !userinfo.status
          return this.$message.error('更新用户状态失败！')
        }
        this.$message.success({
          message: '更新用户状态成功！',
          duration: 1000
        })
        this.getUserList()
      })
    },
    // 关闭对话框
    close(status) {
      if(status === 201 || status === 200) {
        this.getUserList()
      }
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.setDialogVisible = false
    },
    // 打开添加信息的对话框
    openAddDialog() {
      this.addDialogVisible = true
    },
    // 打开修改信息的对话框,并传入id值
    openEditDialog(id) {
      this.id = id
      getUserById(id).then(res => {
        console.log(res);
        this.editForm = res.data.data
        this.editDialogVisible = true
      })
    },
    // 根据Id删除用户信息
    removeUserById(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserById(id).then(res => {
          if(res.data.meta.status !== 204)
            return this.$message.error('删除失败!')
          this.getUserList()
          this.$message.success('删除成功!')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    openSetDialog(row) {
      this.setDialogVisible = true
      this.userInfo = row
      getRolesList().then(res => {
        this.rolesList = res.data.data
      })
    }
  },
}
</script>
<style lang="less" scoped>
.item {
  margin: 4px;
}
</style>
