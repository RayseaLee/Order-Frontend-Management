<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-31 13:45:13
 * @FilePath: \VScode\vue\vue-order-control\src\views\goods\category\childComps\EditDialog.vue
 * @LastEditTime: 2021-12-31 16:45:17
 * @LastEditors: RayseaLee
-->
<template>
  <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @close='close' @confirm='confirm'>
     <el-form :model="form" ref='formRef' :rules="formRules" >
      <el-form-item label="分类名称" label-width="80px" prop=name>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "components/mydialog/MyDialog.vue"
import { updateCategory} from 'api/category'
import { CategoryDialogMixin } from '../../../../mixins'

export default {
  mixins: [CategoryDialogMixin],
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
      title: '修改分类名',
    }
  },
  methods: {
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        updateCategory(this.form).then(res => {
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
