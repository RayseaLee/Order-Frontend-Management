<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 15:56:55
 * @FilePath: \vue\vue-order-control\src\views\goods\list\AddGoods.vue
 * @LastEditTime: 2022-03-03 16:19:18
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <!-- 卡片视图区 -->
    <el-card>
      <el-button @click='backClick' style='margin-bottom: 5px'>返回</el-button>
      <!-- 提示 -->
      <el-alert title="添加菜品信息" type="info" style='margin-bottom: 5px' center show-icon :closable="false"> </el-alert>
      <!-- 步骤条 -->
      <el-steps :active="activeIndex - 0" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="菜品分类"></el-step>
        <el-step title="菜品参数"></el-step>
        <el-step title="菜品图片"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form ref="addFormRef" :model="addForm" :rules="formRules" label-position="top">
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeLeave">
          <el-tab-pane label="基本信息" name="0">
            <div>
              <el-form-item label="菜品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
              <el-form-item label="原价" prop="original_price">
                <el-input type="number" v-model="addForm.original_price" min=0 @input="handleInput"></el-input>
              </el-form-item>
              <el-form-item label="折扣优惠" prop="discount_amount">
                <el-input type="number" v-model="addForm.discount_amount" min=0 @input="handleInput"></el-input>
              </el-form-item>
              <el-form-item label="实际价格">
                <el-input type="number" v-model="addForm.real_price" disabled></el-input>
              </el-form-item>
              <el-form-item label="原材料">
                <el-input v-model="addForm.raw_materials"></el-input>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input v-model="addForm.introduction"></el-input>
              </el-form-item>
              <el-button type="primary" @click="nextStep">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜品分类" name="1">
            <div>
              <el-form-item label="菜品分类" prop="category_name">
                <el-select @change="handleChanged" v-model="addForm.category_id" placeholder="请选择">
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="nextStep">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜品参数" name="2">
            <div>
              <el-form-item label="菜品参数">
                <el-select multiple v-model="parameterIDs" @change="handleParamsChange" placeholder="请选择">
                  <template v-for="item in paramsList">
                    <el-tooltip class="item" :key="item.id" effect="light" :content="item.list" placement="right">
                      <el-option
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px; width: 100px; text-overflow: ellipsis; overflow: hidden">{{ item.list }}</span>
                      </el-option>
                    </el-tooltip>
                  </template>
                </el-select>
              </el-form-item>
              <el-button type="primary" @click="nextStep">下一步</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="菜品图片" name="3">
            <upload-pic :form-info="addForm"></upload-pic>
            <el-button type="primary" @click="addClick" style="margin-top: 22px">完成</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {createGoods} from 'api/goods'
import UploadPic from './childComps/UploadPic.vue'
import goodsParams from './childComps/GoodsParams.vue'
import {GoodsMixin} from 'mixins'

export default {
  components: {
    UploadPic,
    goodsParams
  },
  mixins: [GoodsMixin],
  data() {
    return {
      activeIndex: '0',
      // 待添加商品的信息
      addForm: {
        name: '',
        original_price: 0,
        discount_amount: 0,
        real_price: 0,
        category_id: "",
        goodsPics: [],
        raw_materials: '',
        introduction: '',
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
    beforeLeave(activeName, oldActiveName) {
      if (oldActiveName == 0 && (this.addForm.name === '' || this.addForm.original_price === '' || this.addForm.discount_amount === '')) {
        this.$refs.addFormRef.validate(valid => {
          if(!valid) return
        })
        return false
      } else if(oldActiveName == 1 && this.addForm.category_id === '' && activeName > oldActiveName) {
        this.$message.error('请选择菜品分类')
        return false
      }
    },
    // 价格改变回调
    handleInput() {
      this.addForm.real_price = this.addForm.original_price - this.addForm.discount_amount
    },
    handleParamsChange() {
      console.log(this.parameterIDs)
      console.log(this.paramsList)
    },
    // 返回上一级
    backClick() {
      this.$router.push('/goods')
    },
    // 下一步
    nextStep() {
      this.$refs.addFormRef.validate(valid => {
        if(!valid) return
        this.activeIndex = Number.parseInt(this.activeIndex) + 1 + ''
        console.log(this.addForm)
        console.log(this.cateList)
      })
    },
    // 完成按钮
    addClick() {
      if(this.addForm.goodsPics.length == 0) {
        return this.$message.error('请添加菜品图片')
      }
      createGoods({
        ...this.addForm,
        parameterList: this.parameterIDs
      }).then(res => {
        console.log(res)
        if (res.data.meta.status != 201) {
          this.$message.error(res.data.meta.msg)
        } else {
          this.$message.success(res.data.meta.msg)
          this.$router.push('/goods')
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
