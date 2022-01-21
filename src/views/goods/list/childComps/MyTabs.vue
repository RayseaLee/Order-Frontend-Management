<template>
  <el-tabs :tab-position="'left'" v-model="currentIndex" :before-leave="beforeLeave" @tab-click="tabClick">
    <el-tab-pane label="基本信息" name="0">
      <div>
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="original_price">
          <el-input type="number" v-model="formInfo.original_price"></el-input>
        </el-form-item>
        <el-form-item label="折扣优惠" prop="goods_price">
          <el-input type="number" v-model="formInfo.discount_amount"></el-input>
        </el-form-item>
        <el-form-item label="实际价格" prop="goods_price">
          <el-input type="number" v-model="formInfo.original_price" disabled></el-input>
        </el-form-item>
        <el-form-item label="原材料">
          <el-input v-model="formInfo.raw_materials"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="formInfo.introduction"></el-input>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="菜品分类" name="1">
      <div>
        <el-form-item label="菜品分类" prop="goods_cat">
          <el-cascader
            :options="cateList"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name'}"
            v-model="formInfo.category_name"
            @change="handleChanged"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </el-tab-pane>
    <el-tab-pane label="菜品参数" name="2">
      <goods-params :params-info="paramsInfo" @nextStep="nextStep"></goods-params>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="3">
      <upload-pic :form-info="formInfo" :file-list="fileList" @nextStep="nextStep" :btn-title="btnTitle"></upload-pic>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getParamsInfo } from 'network/goods.js'
import BaseInfo from './BaseInfo.vue'
import GoodsCategory from './GoodsCategory.vue'
import goodsParams from './GoodsParams.vue'
import UploadPic from './UploadPic.vue'
import {getCateList} from 'api/category'
export default {
  components: {
    BaseInfo,
    GoodsCategory,
    goodsParams,
    UploadPic
  },
  props: {
    // 表单信息
    formInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    // 活跃的 Tabs
    activeIndex: {
      type: String,
      default: '0'
    },
    // 按钮文本
    btnTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 当前的Tabs导航页
      currentIndex: this.activeIndex,
      // 菜品品参数信息
      paramsInfo: [],
      // 商品分类
      cateList: [],
      // 图片文件列表
      fileList: []
    }
  },
  methods: {
    // 获取商品动态参数
    getCateList() {
      getCateList().then(res => {
        this.categoryInfo = res.data.data
      })
    },
    // Tabs导航栏切换时的钩子
    beforeLeave(activeName, oldActiveName) {
      // 商品分类必须第三级分类
      // if(oldActiveName == 0) {
      //   this.$message.error("请先选择商品分类")
      //   // 否则不能切换 Tabs 导航栏
      //   return false
      // }
    },
    // 点击下一步按钮
    nextStep() {
      if (this.currentIndex == 0 && this.formInfo.name != "") {
        this.$message.error("请填写菜名")
      } else if (this.currentIndex == 0) {
        this.currentIndex = Number.parseInt(this.currentIndex) + 1 + ''
        this.getCateList()
      } else if (this.currentIndex == 1) {
        this.currentIndex = Number.parseInt(this.currentIndex) + 1 + ''
        this.getOnlyParamsInfo()
      }else {
        this.currentIndex = Number.parseInt(this.currentIndex) + 1 + ''
      }
      // 加载图片到动态绑定到 fileList
      if(this.btnTitle == "提交修改" && this.formInfo.pics.length != 0 && this.fileList.length == 0) {
        this.formInfo.pics.forEach((item, index) => {
          this.$set(this.fileList, index, {'url': item.pics_big_url})
        })
      }
      // Tabs 导航栏改变事件
      this.$emit("changeActive", this.currentIndex)
    },
    // Tabs切换
    tabClick() {
      if (this.currentIndex == 1) {
        this.getManyParamsInfo()
      } else if (this.currentIndex == 2) {
        this.getOnlyParamsInfo()
      } else if(this.currentIndex == 3) {
        if(this.btnTitle=="提交修改" && this.formInfo.pics.length != 0 && this.fileList.length == 0) {
          // 动态绑定商品的图片信息
          this.formInfo.pics.forEach((item, index) => {
            this.$set(this.fileList, index, {'url': item.pics_big_url})
          })
        }
      }
      // Tabs导航栏变化事件
      this.$emit("changeActive", this.currentIndex)
    },
  },
}
</script>
<style lang="less" scoped>

</style>
