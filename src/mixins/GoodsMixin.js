/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-28 13:54:44
 * @FilePath: \vue\vue-order-control\src\mixins\GoodsMixin.js
 * @LastEditTime: 2022-03-04 15:25:52
 * @LastEditors: RayseaLee
 */
import {getCateList} from 'api/category'
import {getAllParams} from 'api/params'                                                    
export default {
  data() {
    const validatePrice = (rule, value, callback) => {
      if (this.addForm) {
        if ((value - this.addForm.original_price) > 0) {
          callback(new Error('折扣金额不能大于原价!'))
        } else {
          callback()
        }
      } else {
        if ((value - this.editForm.original_price) > 0) {
          callback(new Error('折扣金额不能大于原价!'))
        } else {
          callback()
        }
      }
      
    }
    return {
      cateList: [],
      parameterIDs: [],
      paramsList: [],
      formRules: {
        name: [{required: true, message: '请输入菜品名称', trigger: 'blur'}],
        original_price: [{required: true, message: '请输入价格', trigger: 'blur'}],
        discount_amount: [
          {required: true, message: '请输入价格', trigger: 'blur'},
          {validator: validatePrice, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    // 获取分类信息
    this.getCateList()
    // 获取参数信息
    this.getAllParams()
  },
  methods: {
    // 获取商品分类信息
    getCateList() {
      // Network request
      getCateList().then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg)
        } else {
          this.cateList = res.data.data
        }
      })
    },
    // 获取参数信息
    getAllParams() {
      getAllParams().then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg)
        } else {
          this.paramsList = res.data.data
        }
      })
    },
    // 菜品分类选择框改变回调
    handleChanged() {
    },
    // 菜品参数改变回调
    handleParamsChange() {
      console.log(this.parameterIDs)
    },
  }
}