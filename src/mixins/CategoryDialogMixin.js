/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-31 14:09:04
 * @FilePath: \VScode\vue\vue-order-control\src\mixins\CategoryDialogMixin.js
 * @LastEditTime: 2022-01-05 09:02:28
 * @LastEditors: RayseaLee
 */
import { categoryIsExist } from 'api/category'
export default {
  data() {
    const validateName = async (rule, value, callback) => {
      const res = await categoryIsExist(value)
      if (res.data.meta.status != 200) {
        callback(new Error('分类名已存在'))
      } else {
        callback()
      }
    }
    return {
      width: '400px',
      formRules: {
        name: [
          {required: true, message: '分类名不能为空', trigger: 'blur'},
          {validator: validateName, trigger: 'blur'}
        ],
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