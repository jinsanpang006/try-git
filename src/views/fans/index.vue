<template>
  <div class="fans">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>粉丝管理</my-breadcrumb>
      </template>

      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card" @tab-click="changeTab">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{ item.name }}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            :current-page="page"
            @current-change="changePage"
            :total="total">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="img">
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqGetFans, reqGetFansStatistics } from '@/api/fans.js'
import echarts from 'echarts'
export default {
  name: 'Fans',
  data () {
    return {
      activeName: 'list',
      page: 1,
      per_page: 20,
      total: 0,
      list: [],
      // 测试默认头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    // 渲染
    async getFans () {
      try {
        const res = await reqGetFans(this.page, this.per_page)
        console.log(res)
        this.list = res.data.data.results
        this.total = res.data.data.total_count
      } catch (e) {
        console.log(e)
      }
    },
    // 分页
    changePage (index) {
      console.log(index)
      this.page = index
      this.getFans()
    },
    // 点击切换tab
    async changeTab (tab) {
      // console.log(tab)
      if (this.activeName === 'img') {
        var myChart = echarts.init(this.$refs.main)

        const res = await reqGetFansStatistics()
        console.log(res)
        const x = []
        const y = []
        // 对象遍历 res的age
        for (const key in res.data.data.age) {
          x.push(key.replace('le', '小于').replace('gt', '大于'))
          y.push(res.data.data.age[key])
        }
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['粉丝人数']
          },
          xAxis: {
            data: x
          },
          yAxis: {},
          series: [{
            name: '粉丝人数',
            type: 'bar',
            data: y
          }]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }
    }

  },
  components: {
    MyBreadcrumb
  }
}
</script>

<style lang="less" scoped>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
