<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 09:50:00
 * @FilePath: \vue\vue-order-control\src\views\store\childComps\AddCouponDialog.vue
 * @LastEditTime: 2021-12-28 16:19:52
 * @LastEditors: RayseaLee
-->
<template>
  <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @close='close' @confirm='confirm'>
     <el-form :model="form" ref='formRef' :rules="formRules" >
      <el-form-item label="满" label-width="40px" prop=full>
        <el-input type='number' v-model="form.full"></el-input>
      </el-form-item>
      <el-form-item label="减" label-width="40px" prop=subtract>
        <el-input type='number' v-model="form.subtract"></el-input>
      </el-form-item>
    </el-form>
  </my-dialog>
</template>

<script>
import MyDialog from "components/mydialog/MyDialog.vue"
import { createCoupon } from 'api/coupon'
import {CouponDialogMixin} from '../../../mixins'
export default {
  mixins: [CouponDialogMixin],
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
      title: '添加优惠券',
      form: {
        full: '',
        subtract: ''
      },
    }
  },
  methods: {
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        createCoupon({
          full: this.form.full - 0,
          subtract: this.form.subtract - 0
        }).then(res => {
          console.log(res);
          const {status, msg} = res.data.meta
          if (status != 201) {
            return this.$message.error(msg)
          } else {
            this.$message.success(msg)
            this.$emit('confirm', res.data.data)
          }
        })
      })
      
    }
  },
}
</script>
<style lang="less" scoped>

</style>
