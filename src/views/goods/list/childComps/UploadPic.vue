<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 16:01:22
 * @FilePath: \vue\vue-order-control\src\views\goods\list\childComps\UploadPic.vue
 * @LastEditTime: 2022-03-27 16:59:48
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
      :file-list="fileList"
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
  computed: {
    // _fileList() {
    //   const arr = []
    //   this.fileList.forEach(item => {
    //     arr.push({
    //       name: item.pic_id,
    //       url: item.pic_url
    //     })
    //   })
    //   return arr
    // }
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
      console.log(file, fileList);
      // 添加商品时的 file
      if (file.response) {
        // 要移除图片的url
        const tempPath = file.response.data.tmp_path
        // 获取对应图片所在的下标
        const index = this.formInfo.goodsPics.findIndex(item => item.pic_url === tempPath)
        // 移除图片数组中对应的图片
        this.formInfo.goodsPics.splice(index, 1)
      } 
      // 编辑修改商品时的 file
      else {
        console.log(file);
        console.log(this.formInfo.goodsPics);
        // 要移除图片的url
        const url = file.url
        // 获取对应图片所在的下标
        const index = this.formInfo.goodsPics.findIndex(item => item.pic_url === url)
        // 移除图片数组中对应的图片
        this.formInfo.goodsPics.splice(index, 1)
      }
    },
    // 预览图片操作
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>
<style lang="less" scoped>
.btn {
  margin-top: 10px;
}
</style>
