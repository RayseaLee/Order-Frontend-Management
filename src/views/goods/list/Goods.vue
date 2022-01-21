<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 15:02:32
 * @FilePath: \VScode\vue\vue-order-control\src\views\goods\list\Goods.vue
 * @LastEditTime: 2022-01-18 12:01:19
 * @LastEditors: RayseaLee
-->
<template>
  <div class='goods'>
    <el-card class='goods-card'>
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getAllGoods">
            <el-button style="transition: .3s" slot="append" type="info" plain icon="el-icon-search" @click="getAllGoods"></el-button>
          </el-input>
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addGoods">添加菜品</el-button>
        </el-col>
      </el-row>
      <el-table class='goods-table' :data="goodsList">
        <el-table-column label="编号" prop="id" fixed width='100'></el-table-column>
        <el-table-column label="菜品图" fixed>
          <template slot-scope="scope" width='100'>
            <el-avatar :src='scope.row.goodsPics.length > 0 ? scope.row.goodsPics[0].pic_url : null' :size='50'>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="菜名" prop="name" width='150' fixed></el-table-column>
        <el-table-column label="原价" prop="original_price" width='100'></el-table-column>
        <el-table-column label="折扣优惠" prop="discount_amount" width='100'></el-table-column>
        <el-table-column label="实际价格" prop="real_price" width='100'></el-table-column>
        <el-table-column label="原材料" prop="raw_materials" width='200'></el-table-column>
        <el-table-column label="介绍" prop="introduction"  width='200'></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.status" 
              @change="userStateChanged(scope.row)">
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
              <el-button type="danger" icon="el-icon-delete" size="small" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <pagination :query-info="queryInfo" :total="total" @change="handleChange" :page-sizes="pageSizes"></pagination>
    </el-card>
  </div>
</template>

<script>
import { getAllGoods } from 'api/goods'
import Pagination from 'components/pagination/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      goodsList: [],
      total: 0,
      queryInfo: {
        query: '',
        // 当前的页数
        pageNum: 1,
        // 每页的数据量
        pageSize: 5
      },
      pageSizes: [5, 10, 15, 20],
    }
  },
  created() {
    this.getAllGoods()
  },
  methods: {
    getAllGoods() {
      getAllGoods(this.queryInfo).then(res => {
        console.log(res)
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      })
    },
    handleChange() {
      this.getAllGoods()
    },
    handleEditClick() {

    },
    handleRowClick(row) {
      this.$router.push({
        path: 'goods/detail',
        query: {
          id: row.id
        }
      })
    },
    addGoods() {
      this.$router.push('/goods/add')
    }
  }
}
</script>
<style lang="less" scoped>
// .goods {
//   width: 100%;
//   height: 100%;
  // .goods-card {
    // .goods-table {
    //   width: 100%;
    //   height: 100%;
    // }
  // }
// }
</style>
