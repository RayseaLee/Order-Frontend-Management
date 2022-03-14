<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-23 10:22:20
 * @FilePath: \VScode\vue\vue-order-control\src\views\store\childComps\StoreInfo.vue
 * @LastEditTime: 2022-01-11 14:01:40
 * @LastEditors: RayseaLee
-->
<template>
  <el-card class='store-info' shadow="hover">
    <div slot="header" class="clearfix">
      <span>店铺信息</span>
      <el-button v-show='isActive' style="float: right; padding: 3px 0 3px 5px" type="text" @click='cancelEditClick'>撤销编辑</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click='editClick'>{{text}}</el-button>
    </div>
    <div class='card-body'>
      <img v-show='!isActive' class='card-body-logo' :src="storeInfo.logo" alt="店铺logo">
      <el-tooltip effect="dark" content="点击修改店铺头像" placement="top-start">
        <img @click="updateLogo" v-show='isActive' class='card-body-logo edit-logo' :src="inputInfo.logo">
      </el-tooltip>
      <div class='card-body-info' v-show='!isActive'>
        <div class='card-body-info-name'>{{storeInfo.name}}</div>
        <div><i class='el-icon-phone-outline'></i>{{storeInfo.phone}}</div>
        <div><i class='el-icon-location-outline'></i>{{fullAddress}}</div>
        <div><i class='el-icon-time'></i>{{storeInfo.start_time}}-{{storeInfo.end_time}}</div>
      </div>
      <div class='card-body-info-input' v-show='isActive'>
        <!-- 店名 -->
        <div class='card-body-info-name'>
          <el-input v-model="inputInfo.name"></el-input>
        </div>
        <!-- 电话 -->
        <div>
          <el-input prefix-icon='el-icon-phone-outline' v-model="inputInfo.phone"></el-input>
        </div>
        <!-- 地址选择 -->
        <div class='address-input'>
          <el-cascader
            style="width: 320px"
            :options="address1"
            :props="{ expandTrigger: 'hover', label: 'label', value: 'value'}"
            v-model="selectedKeys"
            @change="handleChanged"
            clearable>
          </el-cascader>
          <el-input prefix-icon='el-icon-location-information' placeholder='详细地址' v-model='inputInfo.address'></el-input>
        </div>
        <!-- 日期选择 -->
        <div>
          <el-time-picker
            is-range
            arrow-control
            format
            v-model="dailyTime"
            @change='handleTimeChange'
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </div>
      </div>
    </div>
    <edit-logo-dialog :dialog-visible='dialogVisible' :img-url='inputInfo.logo' @close='handleDialogClose' @confirm='handleDialogConfirm'></edit-logo-dialog>
  </el-card>
</template>

<script>
import cityData from 'common/cityData'
import EditLogoDialog from './EditLogoDialog'
import _ from 'lodash'
import {formatDate} from 'common/utils'
export default {
  components: {
    EditLogoDialog
  },
  props: {
    storeInfo: {
      type: Object
    }
  },
  data () {
    return {
      oldLogo: this.storeInfo.logo,
      dialogVisible: false,
      isActive: false,
      // 编辑时的信息
      inputInfo: {
        name: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        address: '',
        start_time: '',
        end_time: '',
      },
      // 省市区
      address1: cityData,
      // 已选的省市区
      selectedKeys: [],
      // 营业时间段
      dailyTime:[]
    }
  },
  methods: {
    editClick() {
      this.isActive = !this.isActive
      if(this.isActive) {
        this.inputInfo = _.cloneDeep(this.storeInfo)
        this.selectedKeys = [
          this.storeInfo.province,
          this.storeInfo.city,
          this.storeInfo.county
        ]
        const startTime = this.storeInfo.start_time.split(':')
        const endTime = this.storeInfo.end_time.split(':')
        this.dailyTime = [new Date(2021, 12, 23, startTime[0], startTime[1]), new Date(2021, 12, 23, endTime[0], endTime[1])]
      } else {
        this.$emit('update', this.inputInfo)
      }
    },
    cancelEditClick() {
      this.isActive = !this.isActive
      this.$message('已取消')
    },
    handleChanged() {
      console.log(this.selectedKeys)
      this.inputInfo.province = this.selectedKeys[0]
      this.inputInfo.city = this.selectedKeys[1]
      this.inputInfo.county = this.selectedKeys[2]
    },
    handleTimeChange(time) {
      this.inputInfo.start_time = formatDate(time[0], 'hh:mm:ss')
      this.inputInfo.end_time = formatDate(time[1], 'hh:mm:ss')
    },
    updateLogo() {
      this.dialogVisible = true
    },
    handleDialogClose() {
      this.dialogVisible = false
    },
    handleDialogConfirm(payload) {
      this.dialogVisible = false
      this.inputInfo.logo = payload.url
      this.inputInfo.temp_path = payload.temp_path
    }
  },
  computed: {
    fullAddress() {
      return this.storeInfo.province + this.storeInfo.city + this.storeInfo.county + this.storeInfo.address
    },
    text() {
      return this.isActive ? '保存' : '编辑'
    }
  }
}
</script>
<style lang="less" scoped>
.store-info {
  height: 300px;
  .card-body {
    height: 200px;
    display: flex;
    align-items: center;
    .card-body-logo {
      height: 150px;
      border-radius: 50%;
    }
    .edit-logo {
      cursor: pointer;
    }
    .card-body-info {
      height: 150px;
      margin-left: 20px;
      div {
        margin-top: 5px;
        i {
          margin-right: 1px;
        }
      }
      .card-body-info-name {
        margin-bottom: 40px;
        font-size: 25px;
        font-weight:bold
      }
    }
    .card-body-info-input{
      height: 150px;
      margin-left: 20px;
      div {
        margin-bottom: 5px;
      }
      .address-input{
        display: flex;
      }
    }
  }
}
</style>
