/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 11:40:33
 * @FilePath: \VScode\vue\vue-order-control\src\mixins\CouponDialogMixin.js
 * @LastEditTime: 2021-12-31 14:09:14
 * @LastEditors: RayseaLee
 */
export default {
  data() {
    const validateFull = (rule, value, callback) => {
      if((value-0) < 0) {
        callback(new Error('金额不能为负数'))
      } else {
        callback()
      }
    }
    const validateSubtract = (rule, value, callback) => {
      if((value-0) < 0) {
        callback(new Error('金额不能为负数'))
      } else if((value-0) > this.form.full-0) {
        callback(new Error('优惠金额不能大于总金额'))
      } else {
        callback()
      }
    }
    return {
      width: '400px',
      formRules: {
        full: [
          {required: true, message: '金额不能为空', trigger: 'blur'},
          {validator: validateFull, trigger: 'blur'}
        ],
        subtract: [
          {required: true, message: '金额不能为空', trigger: 'blur'},
          {validator: validateSubtract, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    close() {
      this.$refs.formRef.resetFields()
      this.$emit('close')
    },
  }
}