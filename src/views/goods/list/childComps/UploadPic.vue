<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 16:01:22
 * @FilePath: \VScode\vue\vue-order-control\src\views\goods\list\childComps\UploadPic.vue
 * @LastEditTime: 2022-01-17 17:16:10
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-upload
      :action="uploadURL"
      :headers="headersObj"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      list-type="picture-card">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {API_HOST} from 'config'
export default {
  props: {
    formInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 图片文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      // 上传图片的URL
      uploadURL: API_HOST + "upload",
      // 首部字段
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 预览图片的URL
      dialogImageUrl: '',
      // 是否显示弹框
      dialogVisible: false,
    }
  },
  methods: {
    // 图片上传成功操作
    handleSuccess(response, file, fileList) {
      // 选择图片将临时路劲存入图片数组
      console.log(response.data.temp_path)
      this.formInfo.goodsPics.push({
        pic_url: response.data.temp_path
      })
      console.log(this.formInfo.goodsPics)
    },
    // 移除图片操作
    handleRemove(file, fileList) {
      // 添加商品时的 file
      if (file.response) {
        // 要移除图片的url
        const tempPath = file.response.data.tmp_path
        // 获取对应图片所在的下标
        const index = this.formInfo.pics.findIndex(item => item.pic === tempPath)
        // 移除图片数组中对应的图片
        this.formInfo.pics.splice(index, 1)
      } 
      // 编辑修改商品时的 file
      else {
        // 要移除图片的url
        const url = file.url
        // 获取对应图片所在的下标
        const index = this.formInfo.pics.findIndex(item => item.pics_big_url === url)
        // 移除图片数组中对应的图片
        this.formInfo.pics.splice(index, 1)
      }
    },
    // 预览图片操作
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 点击按钮操作
    btnClick() {
      // 深拷贝商品信息
      const form = _.cloneDeep(this.formInfo)
      // 将商品分类数组转换为字符串
      form.goods_cat = form.goods_cat.join(",")
      // 提交修改操作
      if (this.btnTitle == "提交修改") {
        // 在商品信息中解构出需要的参数
        const {goods_id: id, goods_name, goods_price, goods_number, goods_weight, pics, goods_introduce, attrs, goods_cat} = form
        // 网络请求：提交修改商品
        editGoodsInfo(this.formInfo.goods_id, {goods_id: id, goods_name, goods_price, goods_number, goods_weight, pics, goods_introduce, attrs, goods_cat}).then(res => {
          if (res.data.meta.status !== 200) {
            this.$message.error(res.data.meta.msg)
          } else {
            this.$message.success("修改成功！")
            this.$router.push('/goods')
          }
        })
      } else { // 添加商品操作
        // 格式化商品动态参数
        form.attrs = this.formInfo.attrs
        // 网络请求：添加商品
        addGoodsInfo(form).then(res => {
          if (res.data.meta.status != 201) {
            this.$message.error(res.data.meta.msg)
          } else {
            this.$message.success(res.data.meta.msg)
            this.$router.push('/goods')
          }
        })
      }
    }
  },
}
</script>
<style lang="less" scoped>
.btn {
  margin-top: 10px;
}
</style>
