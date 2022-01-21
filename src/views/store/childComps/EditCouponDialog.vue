<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 11:35:02
 * @FilePath: \vue\vue-order-control\src\views\store\childComps\EditCouponDialog.vue
 * @LastEditTime: 2021-12-28 14:08:54
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
import { updateCouponById } from 'api/coupon'
import {CouponDialogMixin} from '../../../mixins'

export default {
  mixins: [CouponDialogMixin],
  components: {
    MyDialog
  },
  props: {
    form: {
      type: Object,
      default() {
        return {
          full: '',
          subtract: ''
        }
      }
    },
    id: {
      type: Number
    },
    dialogVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '更新优惠券',
    }
  },
  methods: {
    confirm() {
      this.$refs.formRef.validate(valid => {
        if(!valid) return
        updateCouponById(this.id, this.form).then(res => {
          const {status, msg} = res.data.meta
          if (status != 200) {
            return this.$message.error('更新失败')
          } else {
            this.$message.success(msg)
            this.$emit('confirm')
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
