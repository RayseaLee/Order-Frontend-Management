<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-28 09:22:37
 * @FilePath: \VScode\vue\vue-order-control\src\views\store\childComps\StoreDiscount.vue
 * @LastEditTime: 2022-01-12 11:36:12
 * @LastEditors: RayseaLee
-->
<template>
  <el-card shadow="hover" class='store-discount'>
    <div slot="header" class="clearfix">
      <span>优惠活动</span>
      <el-button style="float: right; padding: 3px 0;" type="text" @click='addClick'>添加</el-button>
    </div>
    <div>
      <el-tag
        v-for="tag in coupons"
        class="el-tag"
        :key="tag.id"
        size='medium'
        closable
        @close='handleTagClose(tag.id)'
        @click='handleTagClick(tag)'
      >
        满{{tag.full}}减{{tag.subtract}}
      </el-tag>
    </div>
    <add-coupon-dialog :dialog-visible="addDialogVisible" @close='addDialogVisible = false' @confirm='addConfirm'></add-coupon-dialog>
    <edit-coupon-dialog :dialog-visible="editDialogVisible" :form='editForm' :id='id' @close='editDialogVisible = false' @confirm='editConfirm'></edit-coupon-dialog>
  </el-card>
</template>

<script>
import { getAllCoupons, deleteCouponById } from 'api/coupon'
import AddCouponDialog from './AddCouponDialog.vue'
import EditCouponDialog from './EditCouponDialog.vue'
export default {
  components: {
    AddCouponDialog,
    EditCouponDialog
  },
  data () {
    return {
      coupons: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        full: '',
        subtract: ''
      },
      id: 0
    }
  },
  created() {
    this.getAllCoupons()
  },
  methods: {
    // 网络请求：获取所有的优惠券
    getAllCoupons() {
      getAllCoupons().then(res => {
        this.coupons = res.data.data
      })
    },
    // 删除优惠券
    handleTagClose(id) {
      this.$confirm('确认删除优惠券？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCouponById(id).then(res => {
          const {status, msg} = res.data.meta
          if (status != 204) {
            return this.$message.error('删除失败')
          } else {
            this.$message.success(msg)
            this.getAllCoupons()
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 更新优惠券
    handleTagClick(coupon) {
      this.editForm.full = coupon.full
      this.editForm.subtract = coupon.subtract
      this.id = coupon.id
      this.editDialogVisible = true
    },
    addClick() {
      this.addDialogVisible = true
    },
    addConfirm(coupon) {
      this.addDialogVisible = false
      this.coupons.push(coupon)
    },
    editConfirm() {
      this.editDialogVisible = false
      this.getAllCoupons()
    }
  },
}
</script>
<style lang="less" scoped>
.store-discount {
  margin-top: 20px;
  .el-tag {
    cursor: pointer;
    font-size: 16px;
    margin: 0 10px 10px 0; 
    height: 40px; 
    line-height: 38px
  }
  .el-tag:hover {
    box-shadow: 0px 0px 5px #409EFF;
    transition: .3s
  }
  .el-tag:active {
    box-shadow: 0px 0px 1px #409EFF;
  }
}
</style>
