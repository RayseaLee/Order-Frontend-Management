/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-12 09:46:36
 * @FilePath: \VScode\vue\vue-order-control\src\mixins\ParamDialogMixin.js
 * @LastEditTime: 2022-01-12 09:48:50
 * @LastEditors: RayseaLee
 */
export default {
  data() {
    // const validateName = async (rule, value, callback) => {
    //   const res = await categoryIsExist(value)
    //   if (res.data.meta.status != 200) {
    //     callback(new Error('分类名已存在'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      width: '400px',
      formRules: {
        name: [
          {required: true, message: '参数名不能为空', trigger: 'blur'},
          // {validator: validateName, trigger: 'blur'}
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