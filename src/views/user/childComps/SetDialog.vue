<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:39:05
 * @FilePath: \vue\vue-order-control\src\views\user\childComps\SetDialog.vue
 * @LastEditTime: 2021-12-23 15:11:50
 * @LastEditors: RayseaLee
 -->
<template>
<div>
  <my-dialog
    :title="title" 
    :width="width"
    :dialogVisible="setDialogVisible"
    @close="close"
    @confirm="confirm">
    <div>
      <p>当前的用户：{{userInfo.username}}</p>
      <p>当前的角色：{{userInfo.roleName}}</p>
      <p>分配新角色：
        <el-select v-model="selectRoleId" clearable placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
    </div>
  </my-dialog>
</div>
  
</template>

<script>
import MyDialog from 'components/mydialog/MyDialog.vue'
import { assignRoles } from 'api/user'
export default {
  components: {
    MyDialog
  },
  props: {
    setDialogVisible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    rolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      title: '分配角色',
      width: '30%',
      selectRoleId: ''
    }
  },
  methods: {
    close() {
      this.$emit("close")
      this.selectRoleId = ''
    },
    confirm() {
      if (!this.selectRoleId) {
        return this.$message.error("请选择要分配的角色！")
      }
      assignRoles(this.userInfo.id, this.selectRoleId).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error("设置角色失败")
        } else {
          this.$message.success("设置角色成功")
          this.$emit("close", res.data.meta.status)
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>

