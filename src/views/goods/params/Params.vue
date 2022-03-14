<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 15:40:08
 * @FilePath: \vue\vue-order-control\src\views\goods\params\Params.vue
 * @LastEditTime: 2022-03-04 14:43:01
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="handleAdd">添加参数</el-button>
        </el-col>
      </el-row> 
      <!-- 角色列表区域 -->
      <el-table :data="paramsList">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag 
              class='el-tag' 
              closable 
              v-for="item in !scope.row.list ? [] : scope.row.list.split(',')" 
              :key="item.id"
              @close='handleTagClose(scope.row, item)'
            >
              {{item}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-show="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)">
            </el-input>
            <el-button v-show="!scope.row.inputVisible" class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="参数名称" prop="name"></el-table-column>
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
import {getAllParams, deleteParamById, updateParam} from 'api/params'
import AddDialog from './childComps/AddDialog.vue'
import EditDialog from './childComps/EditDialog.vue'
export default {
  components: {
    AddDialog,
    EditDialog
  },
  data() {
    return {
      paramsList: [],
      inputVisible: false,
      inputValue: '',
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        id: '',
        name: '',
        list: ''
      }
    }
  },
  created() {
    this.getAllParams()
  },
  methods: {
    getAllParams() {
      getAllParams().then(res => {
        res.data.data.forEach(item => {
          item.inputVisible = false
          item.inputValue = ''
        });
        console.log(res)
        this.paramsList = res.data.data
      })
    },
    // 添加参数
    handleAdd() {
      this.addDialogVisible = true
    },
    // 修改参数
    handleEdit(row) {
      this.editForm.name = row.name
      this.editForm.list = row.list
      this.editForm.id = row.id
      this.editDialogVisible = true
    },
    // 删除参数
    handleDelete(id) {
      this.$confirm('确认删除该参数？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteParamById(id).then(res => {
          const {status, msg} = res.data.meta
          if(status != 204) return this.$message.error('删除失败')
          this.$message.success('删除成功')
          this.getAllParams()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 删除参数选项
    handleTagClose(row, item) {
      const list = row.list.split(',').filter(n => {
        return n != item
      }).join(',')
      console.log(list)
      updateParam({...row, list}).then(res => {
        const {status, msg} = res.data.meta
        if (status != 200) {
          return this.$message.error(msg)
        } else {
          this.$message.success('删除成功')
          row.list = list
        }
      })
    },
    // 添加对话框确认回调
    handleAddConfirm() {
      this.addDialogVisible = false
      this.getAllParams()
    },
    // 编辑对话框确认回调
    handleEditConfirm() {
      this.editDialogVisible = false
      this.getAllParams()
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    },
    handleInputConfirm(row) {
      // 如果为空字符串 清空空字符串
      if(row.inputValue.trim().length === 0) {
        row.inputValue = ""
        row.inputVisible = false
        return
      }
      // 如果参数已存在，直接返回
      if(row.list != null && row.list.split(',').includes(row.inputValue.trim())) {
        this.$message.warning("'" + row.inputValue.trim() + "' 参数项已存在!")
        row.inputValue = ""
        return 
      }
      const list = row.list ? row.list + ',' + row.inputValue.trim() : row.inputValue.trim()
      row.inputValue = ""
      row.inputVisible = false
      // 编辑提交参数信息
      updateParam({...row, list}).then(res => {
        if (res.data.meta.status !== 200) {
          this.$message.error("修改参数项失败!")
        } else {
          this.$message.success("修改参数项成功!")
          row.list = list
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.el-tag {
  cursor: pointer;
  font-size: 14px;
  margin: 5px 10px;
}
.el-tag:hover {
  box-shadow: 0px 0px 5px #409EFF;
  transition: .3s
}
.el-tag:active {
  box-shadow: 0px 0px 1px #409EFF;
}
.button-new-tag {
  box-sizing: content-box;
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
}
</style>
