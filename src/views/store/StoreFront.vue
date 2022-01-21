<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-21 10:26:59
 * @FilePath: \VScode\vue\vue-order-control\src\views\store\StoreFront.vue
 * @LastEditTime: 2022-01-11 10:41:36
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="16">
          <store-info :store-info='storeInfo' @update='handleStoreInfoUpdate'></store-info>
        </el-col>
        <el-col :span="8">
          <store-notice :notice='storeInfo.notice' @update='handleStoreInfoUpdate'></store-notice>
        </el-col>
      </el-row>
      <store-discount></store-discount>
    </el-card>
  </div>
</template>

<script>
import { getStoreInfo, updateStoreInfo } from 'api/store' 
import StoreInfo from './childComps/StoreInfo.vue'
import StoreNotice from './childComps/StoreNotice.vue'
import EditLogoDialog from './childComps/EditLogoDialog'
import StoreDiscount from './childComps/StoreDiscount.vue'
export default {
  components: {
    StoreInfo,
    StoreNotice,
    EditLogoDialog,
    StoreDiscount
  },
  data () {
    return {
      activeName: 'info',
      activeNames: '1',
      storeInfo: {},
      dialogVisible: false,
    }
  },
  async created() {
    const res = await getStoreInfo()
    console.log(res)
    this.storeInfo = res.data.data
  },
  methods: {
    handleStoreInfoUpdate(storeInfo) {
      console.log(storeInfo)
      this.storeInfo.logo = storeInfo.logo
      let data = storeInfo
      if(this.storeInfo.temp_path) {
        data = {
          temp_path: this.storeInfo.temp_path,
          ...storeInfo
        }
      }
      updateStoreInfo(data).then(res => {
        const {status, msg} = res.data.meta
        if(status != 200) return this.$message.error(msg)
        this.$message.success(msg)
        this.storeInfo = res.data.data
      })
    }
  },
}
</script>
<style lang="less" scoped>

</style>
