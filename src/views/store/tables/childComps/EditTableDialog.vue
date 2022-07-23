<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-13 11:42:40
 * @FilePath: \vue-order-control\src\views\store\tables\childComps\editTableDialog.vue
 * @LastEditTime: 2022-04-18 15:52:17
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @close='close' @confirm='confirm'>
      <el-form :model="tableItemInfo" ref='tableItemInfoRef' :rules="formRules" >
        <el-form-item label="桌台名称" label-width="80px" prop="name">
          <el-input type='text' v-model="tableItemInfo.name"  :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="桌台状态" label-width="80px">
          <el-select v-model="tableItemInfo.occupy" placeholder="请选择" :disabled="occupyIsDisabled">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="桌台容量" label-width="80px">
          <el-input type='number' v-model="tableItemInfo.contain" min="1" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="用餐人数" label-width="80px">
          <el-input type='number' v-model="tableItemInfo.contain" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="tableItemInfo.complete != null" label="上菜进度" label-width="80px">
          <el-select v-model="tableItemInfo.complete" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from 'components/mydialog/MyDialog.vue'
import {updateTableInfo} from 'api/store'
export default {
  components: {
    MyDialog
  },
  props: {
    tableItemInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: Boolean
  },
  data () {
    return {
      title: '更改桌台信息',
      width: '400px',
      formRules: {
         name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
      },
      options1: [
        {
          label: '空闲',
          value: false
        },
        {
          label: '占用',
          value: true
        }
      ],
      options2: [
        {
          label: '进行中',
          value: false
        },
        {
          label: '已完成',
          value: true
        }
      ]
    }
  },
  computed: {
    isDisabled() {
      return this.tableItemInfo.occupy == '占用' || this.tableItemInfo.occupy== true
    },
    occupyIsDisabled() {
      if (this.tableItemInfo.complete == null) {
        return false
      } else {
        return !this.tableItemInfo.complete
      }
    }
  },
  methods: {
    close() {
      this.$refs.tableItemInfoRef.resetFields()
      this.$emit('close')
    },
    confirm() {
      this.$refs.tableItemInfoRef.validate(valid => {
        if(!valid) return
        updateTableInfo(this.tableItemInfo).then(res => {
          const {msg, status} = res.data.meta
          if(status != 200) return this.$message.error(msg)
          this.$message.success('修改成功')
          this.$emit('confirm')
        })
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
