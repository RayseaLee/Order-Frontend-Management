/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-15 15:41:59
 * @FilePath: \vue\vue-order-control\src\common\check.js
 * @LastEditTime: 2021-12-17 14:06:46
 * @LastEditors: RayseaLee
 */
//验证邮箱的规则
let checkEmail = (rule, value, cb) => {
  const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (regEmail.test(value)) {
    return cb()
  }
  //返回一个错误提示
  cb(new Error('请输入正确的邮箱地址'))
}

//验证手机号码的规则
let checkMobile = (rule, value, cb) => {
  const regMobile = /^1[34578]\d{9}$/
  if (regMobile.test(value)) {
    return cb()
  }
  //返回一个错误提示
  cb(new Error('请输入正确的手机号'))
}

// 用户名检测规则
const username = [
  {required: true, message: '请输入用户名', trigger: 'blur'},
  {min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur'}
]
// 密码检测规则
const password = [
  {required: true, message: '请输入密码', trigger: 'blur'},
  {min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'}
]
// 邮箱检测规则
const email = [
  {required: true, message: '请输入邮箱地址', trigger: 'blur'},
  {validator: checkEmail, trigger: ['blur', 'change']}
]
// 手机号检测规则
const mobile = [
  {required: true, message: '请输入手机号', trigger: 'blur'},
  {validator: checkMobile, trigger: ['blur', 'change']}
]
// 角色名称检测规则
const roleName = [
  {required: true, message: '请输入角色名称', trigger: 'blur'},
  {min: 2, max: 10, message: '长度在2-10个字符之间', trigger: 'blur'}
]
// 角色描述检测规则
const roleDesc = [{required: true, message: '请输入角色描述', trigger: 'blur'},]
// 分类名称检测规则
const cat_name = [{required: true, message: '请输入分类名称', trigger: 'blur'},]
// 参数名称检测规则
const attr_name = [{required: true, message: '请输入参数名称', trigger: 'blur'}]
// 商品名称
const goods_name = [{required: true, message: '请输入商品名称', trigger: 'blur'}]
// 商品价格
const goods_price = [{required: true, message: '请输入商品价格', trigger: 'blur'}]
// 商品数量
const goods_number = [{required: true, message: '请输入商品数量', trigger: 'blur'}]
// 商品重量
const goods_weight = [{required: true, message: '请输入商品重量', trigger: 'blur'}]
// 商品分类
const goods_cat = [{required: true, message: '请选择商品分类', trigger: 'blur'}]
export {
  username,
  password,
  email,
  mobile,
  roleName,
  roleDesc,
  cat_name,
  attr_name,
  goods_name,
  goods_price,
  goods_number,
  goods_weight,
  goods_cat
}