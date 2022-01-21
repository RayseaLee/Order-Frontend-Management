<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-17 14:38:38
 * @FilePath: \vue\vue-order-control\src\views\power\childComps\SetDialog.vue
 * @LastEditTime: 2021-12-20 10:42:44
 * @LastEditors: RayseaLee
-->
<template>
  <!-- 设置权限对话框 -->
  <div>
    <my-dialog
      :title="title"
      :width="width"
      :dialogVisible="setDialogVisible"
      @close="close"
      @confirm="confirm">
      <el-tree 
        :data="rightsList" 
        :props="treeProps" 
        show-checkbox 
        node-key="id" 
        ref="treeRef"
        default-expand-all
        :default-checked-keys="defKeys"/>
    </my-dialog>
  </div>
</template>

<script>
import {allotRights} from 'api/rights.js'
import  MyDialog  from 'components/mydialog/MyDialog.vue'
export default {
  components: {
    MyDialog
  },
  props: {
    roleId: '',
    setDialogVisible: false,
    rightsList: {
      type: Array,
      default() {
        return []
      }
    },
    defKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      title: '分配权限',
      width: '30%',
      treeProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      allotRights(this.roleId, idStr).then(res => {
        if(res.data.meta.status !== 200)
            return this.$message.error('分配权限失败!')
        this.$message.success('分配权限成功!')    
        this.$emit('close', res.data.meta.status)
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
