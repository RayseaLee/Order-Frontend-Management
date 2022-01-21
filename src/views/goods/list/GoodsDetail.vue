<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-29 14:57:35
 * @FilePath: \vue\vue-order-control\src\views\goods\list\GoodsDetail.vue
 * @LastEditTime: 2021-12-29 16:20:20
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <el-card>
      <el-button @click='backClick'>返回</el-button>
    </el-card>
  </div>
</template>

<script>
import { getGoodsById } from 'api/goods'
export default {
  components: {},
  data () {
    return {
      id: 0,
      goodInfo: {}
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
        this.goodInfo = res.data.data
      })
    },
    backClick() {
      this.$router.push('/goods')
    }
  },
}
</script>
<style lang="less" scoped>

</style>
