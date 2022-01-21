<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-23 15:00:29
 * @FilePath: \VScode\vue\vue-order-control\src\views\store\childComps\EditLogoDialog.vue
 * @LastEditTime: 2022-01-17 14:18:12
 * @LastEditors: RayseaLee
-->
<template>
  <my-dialog :dialog-visible="dialogVisible" :title="title" :width="width" @open='open' @close='close' @confirm='confirm'>
    <div class="logo-cropper">
      <div class="logo-cropper-left">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :fixed="option.fixed"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          @real-time="realTime"
          @img-load="imgLoad"
          :high="option.high"
        ></vueCropper>
      </div>
      <div class="logo-cropper-right">
        <div
          :style="{
            maxWidth: 200 + 'px',
            maxHeight: 200 + 'px',
            width: previews.w + 'px',
            height: previews.h + 'px',
            overflow: 'hidden',
            margin: '5px',
            borderRadius: '50%',
          }"
        >
          <div :style="previews.div">
            <img :src="previews.url" :style="previews.img" alt="头像预览" />
          </div>
        </div>
        <p>头像预览</p>
      </div>
    </div>
    <div class="logo-cropper-bottom">
        <label class="btn" for="uploads">上传图片</label>
        <input
          type="file"
          id="uploads"
          style="position: absolute; clip: rect(0 0 0 0)"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadImg($event, 1)"
        />
        <button @click="refreshCrop" class="btn">重置</button>
      </div>
  </my-dialog>
</template>

<script>
import myDialog from "components/mydialog/MyDialog.vue"
import { VueCropper } from "vue-cropper"
import { uploadStoreLogo } from 'api/store'
export default {
  components: {
    myDialog,
    VueCropper,
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    imgUrl: {
      type: String,
    },
  },
  data() {
    return {
      title: "上传店铺头像",
      width: "800px",
      previews: {},
      option: {
        // 是否开启截图框宽高固定比例
        fixed: true,
        // 裁剪图片的地址
        img: '',
        // 裁剪生成图片的质量
        outputSize: 1,
        // 是否输出原图比例的截图
        full: false,
        // 裁剪生成图片的格式
        outputType: "png",
        // 上传图片是否可以移动
        canMove: true,
        // 固定截图框大小
        fixedBox: false,
        // 上传图片按照原始比例渲染
        original: false,
        // 截图框能否拖动
        canMoveBox: true,
        // 是否默认生成截图框
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        // 默认生成截图框宽度
        autoCropWidth: 200,
        // 默认生成截图框高度
        autoCropHeight: 200,
        // 截图框是否被限制在图片里面
        centerBox: false,
        // 是否按照设备的dpr 输出等比例图片
        high: false,
        max: 99999,
      },
    };
  },
  mounted() {
    console.log(this.imgUrl)
    console.log(this.option.img)
  },
  methods: {
    imgLoad(status) {
      if(status == 'error') this.$message.error('加载失败')
    },
    // 实时预览
    realTime(data) {
      this.previews = data
    }, 
    // 重置
    refreshCrop() {
      this.$refs.cropper.refresh()
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要you
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    open() {
      this.option.img = this.imgUrl
    },
    close() {
      this.option.img = this.imgUrl
      this.$emit('close')
    },
    async confirm() {
      this.$refs.cropper.getCropBlob(data => {
        // do something
        let param = new FormData()
        param.append('file', data, 'logo.png')
        uploadStoreLogo(param).then(res => {
          const {url, temp_path} = res.data.data
          const {status, msg} = res.data.meta
          if(status != 201) {
            return this.$message.error(msg)
          }
          this.$emit('confirm', {url, temp_path})
        })
      })
    }
  }
};
</script>
<style lang="less" scoped>
.logo-cropper {
  display: flex;
  height: 350px;
  justify-content: space-between;
  .logo-cropper-left {
    width: 70%;
    height: 300px;
  }
  .logo-cropper-right {
    height: 300px;
    text-align: center;
  }
}
.logo-cropper-bottom {
  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:0px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }
  .btn:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
  }
  .btn:active {
    background-color: #409EFF;
    border-color: #409EFF;
  }
}
</style>
