<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:37:23
 * @FilePath: \VScode\vue\vue-order-control\src\views\power\Role.vue
 * @LastEditTime: 2021-12-30 16:24:58
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="openAddDialog()">添加角色</el-button>
        </el-col>   
      </el-row> 
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, index1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag @close="removeRightById(scope.row, item1.id)" closable>{{item1.name}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row :class="[index2 === 0 ? '' : 'bdtop', 'vcenter' ]" v-for="(item2, index2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" @close="removeRightById(scope.row, item2.id)" closable>{{item2.name}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" @close="removeRightById(scope.row, item3.id)" closable>{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="openEditDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRolesById(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="getRightsList(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <add-dialog 
        :add-dialog-visible="addDialogVisible" 
        @close="close"/>
      <edit-dialog 
        :edit-dialog-visible="editDialogVisible" 
        @close="close" 
        :id="id" 
        :edit-form="editForm"/>
      <set-dialog 
        :set-dialog-visible="setDialogVisible" 
        @close="close" 
        :role-id="roleId"
        :rights-list="rightsList" 
        :def-keys="defKeys"/>
    </el-card>
  </div>
</template>

<script>
import AddDialog from './childComps/AddDialog.vue'
import EditDialog from './childComps/EditDialog.vue'
import SetDialog from './childComps/SetDialog.vue'
import { getRolesList, removeRightById, getRolesById, removeRolesById, getRightsList } from 'api/rights.js'

export default {
  components: {
    AddDialog,
    EditDialog,
    SetDialog
  },
  data () {
    return {
      rolesList: [],  //角色列表
      addDialogVisible: false,
      editDialogVisible: false,
      setDialogVisible: false,
      id: 0,
      editForm: {    //待编辑信息
        roleName: '',
        roleDesc: ''
      },
      rightsList: [], //权限列表
      defKeys: [],    //被选中的权限
      roleId: ''      //当前被分配权限的角色Id
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表以及对应的权限
    getRolesList() {
      getRolesList().then(res => {
        this.rolesList = res.data.data
      })
    },
    // 根据角色Id和权限Id删除对应角色的权限
    removeRightById(role, rightId) {
        this.$confirm('将要删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRightById(role.id, rightId).then(res => {
          if(res.data.meta.status !== 204)
            return this.$message.error('删除失败!')
          role.children = res.data.data
          this.$message.success('删除成功!')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 打开添加角色的对话框 
    openAddDialog() {
      this.addDialogVisible = true
    },
    // 打开编辑提交对话框
    openEditDialog(id) {
      this.id = id
      getRolesById(id).then(res => {
        this.editForm = res.data.data
        this.editDialogVisible = true
      })
    },
    // 关闭对话框
    close(status) {
      if(status === 201 || status === 200) {
        this.getRolesList()
      }
      this.defKeys = []
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.setDialogVisible = false
    },
    // 删除一个角色
    removeRolesById(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRolesById(id).then(res => {
          console.log(res);
          if(res.data.meta.status !== 204)
            return this.$message.error('删除失败!')
          this.getRolesList()
          this.$message.success('删除成功!')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 获取权限列表
    getRightsList(role) {
      getRightsList('tree').then(res => {
        if(res.data.meta.status !== 200)
            return this.$message.error('获取权限失败!')
        this.roleId = role.id
        this.rightsList = res.data.data
        // 递归获取第三级节点的Id
        this.getThirdKeys(role, this.defKeys)
        this.setDialogVisible = true
      })
    },
    // 获取第三级节点的Id
    getThirdKeys(node, array) {
      if(node.children.length == 0) {
        return array.push(node.id)
      }
      node.children.forEach(item => {
        this.getThirdKeys(item, array)
      })
    }
  },
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 8px
}
.bdtop {
  border-top: solid 1px #eee;
}
.bdbottom {
  border-bottom: solid 1px #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>