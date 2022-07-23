<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-18 15:39:51
 * @FilePath: \vue-order-control\src\views\order\childComps\ReplyDialog.vue
 * @LastEditTime: 2022-04-18 16:06:19
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @close='close' @confirm='confirm'>
      <el-form :model="formData" ref='formRef' :rules="formRules">
        <el-form-item prop="reply">
          <el-input type="textarea" v-model="formData.reply"></el-input>
        </el-form-item>
      </el-form>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from 'components/mydialog/MyDialog'
import {replyEvaluation} from 'api/order'
export default {
  components: {
    MyDialog
  },
  props: {
    dialogVisible: Boolean,
    evaluationId: Number
  },
  data () {
    return {
      title: '商家回复',
      width: '500px',
      formData: {
        reply: ''
      },
      formRules: {
        reply: [{required: true, message: '商家回复不能为空', trigger: 'blur'}],
      }
    }
  },
  methods: {
    close() {
      this.$refs.formRef.resetFields()
      this.$emit('close')
    },
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        replyEvaluation({
          id: this.evaluationId,
          reply: this.formData.reply,
          reply_time: new Date()
        }).then(res => {
          const {status, msg} = res.data.meta
          if(status !== 200) return this.$message.error(msg)
          this.$message.success('回复成功')
          this.$emit('confirm')
        })
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
