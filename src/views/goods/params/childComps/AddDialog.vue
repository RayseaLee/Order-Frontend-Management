<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-11 16:58:21
 * @FilePath: \VScode\vue\vue-order-control\src\views\goods\params\childComps\AddDialog.vue
 * @LastEditTime: 2022-01-12 09:48:17
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
import { createParam } from 'api/params'
import { ParamDialogMixin } from '../../../../mixins'
export default {
  mixins: [ParamDialogMixin],
  components: {
    MyDialog
  },
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '添加参数',
      form: {
        name: ''
      },
    }
  },
  methods: {
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        createParam(this.form).then(res => {
          const {status, msg} = res.data.meta
          if (status != 201) {
            return this.$message.error(msg)
          } else {
            this.$message.success('添加成功')
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