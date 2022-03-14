<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-01-21 14:24:50
 * @FilePath: \vue\vue-order-control\src\views\store\swipers\Swipers.vue
 * @LastEditTime: 2022-03-05 15:18:52
 * @LastEditors: RayseaLee
-->
<template>
  <div class=''>
    <el-card class='goods-card'>
      <el-row :gutter="20">
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addSwiper">添加轮播图</el-button>
        </el-col>
      </el-row>
      <el-table class='goods-table' :data="swiperList">
        <el-table-column label="编号" prop="id" fixed width='100'></el-table-column>
        <el-table-column label="轮播图">
          <template slot-scope="scope">
            <img :src="scope.row.pic_url" alt="" style="width: 90%">
            <!-- <el-avatar :src='scope.row.goodsPics.length > 0 ? scope.row.goodsPics[0].pic_url : null' :size='50'>
            </el-avatar> -->
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.status" 
              @change="swiperStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="createdAt" width='160'></el-table-column>
        <el-table-column label="更新日期" prop="updatedAt" width='160'></el-table-column>
        <el-table-column label="操作" width="150px" fixed='right'>
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable=false>
              <el-button type="primary" icon="el-icon-edit" size="small" @click="handleEditClick(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top"  :enterable=false>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteSwiperById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <pagination :query-info="queryInfo" :total="total" @change="handleChange" :page-sizes="pageSizes"></pagination>
    </el-card>
    <add-swiper :dialogVisible="dialogVisible" @close='handleClose' @confirm='handleConfirm'></add-swiper>
  </div>
</template>

<script>
import Pagination from 'components/pagination/Pagination.vue'
import { getSwiperInfo, deleteSwiperById, createSwiper } from 'api/store'
import AddSwiper from './childComps/AddSwiper.vue'
export default {
  components: {
    Pagination,
    AddSwiper
  },
  data () {
    return {
      dialogVisible: false,
      swiperList: [],
      total: 0,
      queryInfo: {
        // 当前的页数
        pageNum: 1,
        // 每页的数据量
        pageSize: 5
      },
      pageSizes: [5, 10, 15, 20],
    }
  },
  created() {
    this.getSwiperInfo()
  },
  methods: {
    addSwiper() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm({url, temp_path}) {
      this.dialogVisible = false
      console.log(url, temp_path)
      createSwiper({url, temp_path}).then(res => {
        console.log(res)
        const {status, msg} = res.data.meta
        if(status != 201) return this.$message.error(msg)
        this.$message.success('添加成功')
        this.getSwiperInfo()
      })
      
    },
    swiperStateChanged() {

    },
    getSwiperInfo() {
      getSwiperInfo(this.queryInfo).then(res => {
        console.log(res)
        this.swiperList = res.data.data.swipers
        this.total = res.data.data.total
      })
    },
    handleEditClick() {

    },
    deleteSwiperById(id){
      this.$confirm('确认删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSwiperById(id).then(res => {
          console.log(res)
          const {status, msg} = res.data.meta
          if (status != 204) return this.$message.error(msg)
          this.$message.success('删除成功')
          this.getSwiperInfo()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleChange() {
      this.getSwiperInfo()
    }
  },
}
</script>
<style lang="less" scoped>

</style>
