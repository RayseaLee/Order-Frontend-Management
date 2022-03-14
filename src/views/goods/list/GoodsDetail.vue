<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 14:57:35
 * @FilePath: \vue\vue-order-control\src\views\goods\list\GoodsDetail.vue
 * @LastEditTime: 2022-03-04 15:28:56
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <el-card>
      <div class="buttons">
        <el-button type="primary" @click="saveClick">保存</el-button>
        <el-button @click="backClick">返回</el-button>
      </div>
      <el-alert title="编辑菜品信息" type="info" style='margin-bottom: 5px' center show-icon :closable="false"> </el-alert>
      <el-form style="margin-top: 70px" ref="editFormRef" :model="editForm" :rules="formRules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="菜品名称" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="菜品分类" prop="category_name">
              <el-select @change="handleChanged" v-model="editForm.category_id" placeholder="请选择">
                <el-option
                  v-for="item in cateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
             <el-form-item label="原价" prop="original_price">
              <el-input type="number" v-model="editForm.original_price" min=0 @input="handleInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="折扣优惠" prop="discount_amount">
              <el-input type="number" v-model="editForm.discount_amount" min=0 @input="handleInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际价格">
              <el-input type="number" v-model="editForm.real_price" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="原材料">
              <el-input v-model="editForm.raw_materials"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="介绍">
              <el-input v-model="editForm.introduction"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item  label="菜品图片">
          <upload-pic :form-info="editForm" :file-list="fileList"></upload-pic>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getGoodsById, updateGoods } from 'api/goods'
import { GoodsMixin } from 'mixins'
import UploadPic from './childComps/UploadPic.vue'

export default {
  components: {
    UploadPic
  },
  mixins: [GoodsMixin],
  data () {
    return {
      id: 0,
      editForm: {},
      editFormRules: [],
      fileList: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getGoodsById()
  },
  methods: {
    getGoodsById() {
      getGoodsById(this.id).then(res => {
        console.log(res)
        this.editForm = res.data.data
        if(res.data.data.Parameters.length != 0)  {
          res.data.data.Parameters.forEach(item => {
            this.parameterIDs.push(item.id)
          })
        }
        this.editForm.goodsPics.forEach((item, index) => {
          this.$set(this.fileList, index, {'url': item.pic_url})
        })
      })
    },
    backClick() {
      this.$router.push('/goods')
    },
    handleInput() {
      this.editForm.real_price = this.editForm.original_price - this.editForm.discount_amount
    },
    saveClick() {
      this.$refs.editFormRef.validate(valid => {
        if(!valid) return
        updateGoods({
          ...this.editForm,
          parameterList: this.parameterIDs
        }).then(res => {
          console.log(res)
          if (res.data.meta.status != 200) {
            this.$message.error(res.data.meta.msg)
          } else {
            this.$message.success(res.data.meta.msg)
            this.$router.push('/goods')
          }
        })
      })
    }
  },
}
</script>
<style lang="less" scoped>
.el-card {
  position: relative;
}
.buttons {
  height: 40px;
  position: absolute;
  right: 20px;
  top: 70px;
}
.el-select {
  width: 100%;
}
</style>
