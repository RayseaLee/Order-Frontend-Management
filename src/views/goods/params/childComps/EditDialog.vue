<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 16:58:31
 * @FilePath: \VScode\vue\vue-order-control\src\views\goods\params\childComps\EditDialog.vue
 * @LastEditTime: 2022-01-12 10:15:42
 * @LastEditors: RayseaLee
-->
<template>
  <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @close='close' @confirm='confirm'>
     <el-form :model="form" ref='formRef' :rules="formRules" >
      <el-form-item label="参数名称" label-width="80px" prop=name>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "components/mydialog/MyDialog.vue"
import { updateParam } from 'api/params'
import { ParamDialogMixin } from '../../../../mixins'

export default {
  mixins: [ParamDialogMixin],
  components: {
    MyDialog
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    form: {
      type: Object
    }
  },
  data () {
    return {
      title: '修改参数名',
    }
  },
  methods: {
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        updateParam(this.form).then(res => {
          const {status, msg} = res.data.meta
          if (status != 200) {
            return this.$message.error(msg)
          } else {
            this.$message.success('修改成功')
            this.$emit('confirm')
          }
        })
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
