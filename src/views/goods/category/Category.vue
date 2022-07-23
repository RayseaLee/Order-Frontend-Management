<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 14:42:15
 * @FilePath: \vue-order-control\src\views\goods\category\Category.vue
 * @LastEditTime: 2022-04-12 14:23:02
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="handleAdd">添加分类</el-button>
        </el-col>   
      </el-row> 
      <!-- 角色列表区域 -->
      <el-table :data="goodsCateList">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="tag-container">
              <el-tag class='el-tag' v-for="item in scope.row.goods" :key="item.id">
                {{item.name}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-dialog :dialog-visible="addDialogVisible" @close="addDialogVisible = false" @confirm='handleAddConfirm'/>
      <edit-dialog :dialog-visible="editDialogVisible" @close="editDialogVisible = false" :form="editForm" @confirm='handleEditConfirm'/>
    </el-card>
  </div>
</template>
<script>
import {getGoodsCateList} from 'api/category'
import AddDialog from './childComps/AddDialog.vue'
import EditDialog from './childComps/EditDialog.vue'
export default {
  components: {
    AddDialog,
    EditDialog
  },
  data() {
    return {
      goodsCateList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        id: '',
        name: ''
      }
    }
  },
  created() {
    this.getGoodsCateList()
  },
  methods: {
    getGoodsCateList() {
      getGoodsCateList().then(res => {
        this.goodsCateList = res.data.data
      })
    },
    handleAdd() {
      this.addDialogVisible = true
    },
    handleEdit(row) {
      this.editForm.name = row.name
      this.editForm.id = row.id
      this.editDialogVisible = true
    },
    handleDelete() {
      
    },
    handleAddConfirm() {
      this.addDialogVisible = false
      this.getGoodsCateList()
    },
    handleEditConfirm() {
      this.editDialogVisible = false
      this.getGoodsCateList()
    }
  },
}
</script>

<style lang="less" scope>
.tag-container {
  .el-tag {
    cursor: pointer;
    font-size: 16px;
    margin: 5px 10px;
    height: 40px; 
    line-height: 38px
  }
  .el-tag:hover {
    box-shadow: 0px 0px 5px #409EFF;
    transition: .3s
  }
  .el-tag:active {
    box-shadow: 0px 0px 1px #409EFF;
  }
}
</style>