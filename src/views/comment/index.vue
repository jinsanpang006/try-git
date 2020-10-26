<template>
  <div class="comment">
    <!-- 面包屑 -->
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>评论管理</my-breadcrumb>
      </template>
    </el-card>
      <!-- 获取到的每一项数据 简单类型 上面父传子  数据给到data   利用data传给EU 里面的prop 给里面组件用 -->
      <!-- 表格 -->
    <el-table :data="comments">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="评论状态">
        <template v-slot:default='obj'>
          {{obj.row.comment_status ? '关闭':'开启'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default='obj'>
          <el-button @click="toggleComment(obj.row.id,obj.row.comment_status)" v-if="obj.row.comment_status"  type="success">打开评论</el-button>
          <el-button @click="toggleComment(obj.row.id,obj.row.comment_status)" v-else type="danger">关闭评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      background
      :page-size="per_page"
      :current-page="page"
      :total="total_count">
    </el-pagination>
  </div>
</template>
<script>
import { getComments, modCommentStatus } from '@/api/comment.js'
export default {
  name: 'comment',
  data () {
    return {
      page: 1, // 当前页
      per_page: 10, // 每页10条
      total_count: 0, // 总条数
      comments: [] // 获取到的每一项数据 简单类型 上面父传子  数据给到data   利用data传给EU 里面的prop 给里面组件用
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    async loadComments () {
      try {
        const res = await getComments(this.page, this.per_page)
        console.log(res)
        this.comments = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleCurrentChange (index) {
      this.page = index
      this.loadComments()
    },
    // 评论状态
    // 传入的值 和 返回的值 一模一样
    async toggleComment (id, status) {
      try {
        const res = await modCommentStatus(id.toString(), !status)
        // console.log(res)
        this.$message.success('操作成功')
        this.loadComments()
      } catch (err) {
        this.$message.error('操作失败')
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
