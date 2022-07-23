<!--
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2022-04-18 14:33:27
 * @FilePath: \vue-order-control\src\views\order\Evaluation.vue
 * @LastEditTime: 2022-04-18 16:05:39
 * @LastEditors: RayseaLee
-->
<template>
  <div>
    <el-card>
      <el-table :data="evaluationInfo">
        <el-table-column prop="username" label="用户昵称" align="center" width="80"></el-table-column>
        <el-table-column prop="user_avatar" label="用户头像" align="center" width="80">
          <template slot-scope="scope">
            <el-avatar :src='scope.row.user_avatar' :size='50'></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评价分值" align="center" width="150">
          <template slot-scope="scope" >
            <el-rate
              v-model="scope.row.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="菜品列表" align="center" width="100">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.order.goodsInfo" :key="index">
              {{item.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评价内容" align="center" width="250"></el-table-column>
        <el-table-column prop="evaluate_time" label="评价时间" align="center" width="100"></el-table-column>
        <el-table-column prop="reply" label="商家回复" align="center"></el-table-column>
        <el-table-column prop="reply_time" label="回复时间" align="center" width="100"></el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.reply == null"  class="item" effect="dark" content="回复" placement="top">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleReply(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <reply-dialog :dialog-visible="dialogVisible" :evaluation-id="evaluationId" @close="handleClose" @confirm="handleConfirm"></reply-dialog>
  </div>
</template>

<script>
import {getEvaluation} from 'api/order'
import ReplyDialog from './childComps/ReplyDialog'
export default {
  components: {
    ReplyDialog
  },
  data () {
    return {
      evaluationInfo: [],
      dialogVisible: false,
      evaluationId: 0
    }
  },
  created() {
    this.getEvaluation()
  },
  methods: {
    getEvaluation() {
      getEvaluation().then(res => {
        if (res.data.meta.status === 200) {
          this.evaluationInfo = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    handleReply(data) {
      this.dialogVisible = true
      this.evaluationId = data.id
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
      this.getEvaluation()
    }
  },
}
</script>
<style lang="less" scoped>

</style>
