<template>
  <div class="articles">
    <!-- 上部的表单 -->
  <el-card class="box-card">
      <template v-slot:header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
       </template>
       <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label='null'>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.channels" placeholder="请选择活动区域" clearable>
            <el-option  v-for="item in channels" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
            <el-date-picker
              format='yyyy-MM-dd'
              value-format='yyyy-MM-dd'
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='check'>查询</el-button>
        </el-form-item>
       </el-form>
  </el-card>

    <el-card class="box-card">
          <template late v-slot:header>
                <div>根据筛选共查询到{{total_count}}条数据, 当前是第{{currentPage}}页</div>
          </template>

          <template >
                    <!--  这要根据 ：data的这个数组 在看不到的模板里 prop接受 然后根据这个数据 遍历模板 -->
                    <!-- - 1.简单的数据 (直接将后台返回的值, 展示出来) - 通过 prop 配置              2.自定义的列结构 - 通过插槽-->
                    <el-table
                    :data="articles"
                    style="width: 100%">
                        <el-table-column
                          label="封面">
                          <!-- 图片插槽1 -->
                          <template v-slot:default='obj'>
                                <el-image
                                  style="width: 150px; height: 100px"
                                  :src="obj.row.cover.images[0]"
                                  fit="cover">
                                  <!-- 图片插槽2  这里el-image有两个插槽 一个是上面的直接显示  这个是错误的时候加载的 -->
                                    <template v-slot:error>
                                      <div>
                                        <img src="@/assets/error.gif"  style="width:150px;height:100px">
                                      </div>
                                    </template>
                                </el-image>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="title"
                          label="标题">
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态">
                          <template v-slot:default='obj'>
                            <el-tag v-if="obj.row.status===0">草稿</el-tag>
                            <el-tag v-if="obj.row.status===1" type="info">待审核</el-tag>
                            <el-tag v-if="obj.row.status===2" type="success">审核通过</el-tag>
                            <el-tag v-if="obj.row.status===3" type="danger">审核失败</el-tag>
                            <el-tag v-if="obj.row.status===4" type="warning">已删除</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="pubdate"
                          label="发布时间">
                        </el-table-column>
                        <!-- 这个 table 是列组件  里面的 template是一个插槽  -->
                        <el-table-column
                          label="操作">
                              <template v-slot:default='obj'>
                                <el-button   size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                                <el-button  @click=del(obj.row.id) size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                              </template>
                        </el-table-column>
                    </el-table>

                           <!-- 分页 -->
                    <el-pagination
                     @current-change="handleCurrentChange"
                      background
                      :page-size="20"
                      layout="prev, pager, next"
                      :total="total_count">
                    </el-pagination>
          </template>
    </el-card>
    </div>

</template>

<script>
import { getArticles, getChannels } from '@/api/articles'
export default {
  name: 'articles',
  data () {
    return {
      form: {
        status: null, // 默认选中全部   不能是空的 这样将来会报错   要不设置null 要不 undefined 这样不会传给后台
        date: [],
        channels: null
      },
      articles: [],
      channels: [],
      total_count: 0,
      currentPage: 1
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    // 根据条件  获取对应的文章列表
    loadArticles () {
      const [beginPubdate, endPubdate] = this.form.date || []
      getArticles({
        page: this.currentPage,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        status: this.form.status,
        channel_id: this.form.channels || null
      }).then((res) => {
        console.log(res.data.data)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        // console.log(this.articles)
        console.log(this.status)
      })
    },
    loadChannels () {
      getChannels().then((res) => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    },
    // 删除功能
    del (id) {
      console.log(id)
    },
    handleCurrentChange (index) {
      // console.log(index)
      // 点击哪页 index就是几
      this.currentPage = index
      this.loadArticles()
    },
    check () {
      this.currentPage = 1
      this.loadArticles()
    }

  }
}
</script>

<style lang='less' scoped>
  .box-card{
    margin-bottom: 20px;
  }
  .el-pagination {
  margin-top: 20px;
}
</style>
