<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog">
      <!-- 这里的coverImgUrl 就是怕父组件的imgurl没图片  -->
      <img :src="value || coverImgUrl" />
    </div>
    <!-- 对话框 -->
    <el-dialog
      title="选择封面"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
            <!-- 单标签全部隐藏 -->
            <div  class="top-box">
                <el-radio-group size="medium" v-model="collect" @change='changeCollect'>
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">隐藏</el-radio-button>
                </el-radio-group>
            </div>
            <!-- 响应式布局图片 -->
            <el-row :gutter="10" class="img_list">
                <el-col v-for="item in images" :key="item.id"  class="img_item"
                :class="{selected:selectedImageUrl===item.url}" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                    <el-image style="height: 100px; width: 100%;"
                    :src='item.url' fit="cover"  @click.native="imageClick(item)"></el-image>
                </el-col>
            </el-row>
            <!-- 分页器 -->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size='per_page'
                background
                layout="total, prev, pager, next"
                :total="total_count">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
                class="avatar-uploader"
                :action="$axios.defaults.baseURL  + '/mp/v1_0/user/images'"
                :show-file-list="false"
                :headers="headers"
                name="image"
                :on-success="handleSuccess">
                <el-image v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPictures } from '@/api/pictures.js'
import { getUser } from '@/utils/storage.js'
import defaultImg from '@/assets/default.png'
export default {
  name: 'cover',
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      images: [],
      collect: false, // 全部
      per_page: 6, // 每页条数
      currentPage: 1, // 当前页
      total_count: 0, // 总条数
      selectedImageUrl: null, // 选中图片的地址
      imageUrl: null, // 上传图片的地址
      coverImgUrl: defaultImg, // 预览显示的图片
      headers: {
        Authorization: `Bearer ${getUser().token}`
      }
    }
  },
  methods: {
    //   点击显示提示框 并渲染图片
    openDialog () {
      this.dialogVisible = true
      this.loadImages()
    },
    // 获取图片
    async loadImages () {
      try {
        const res = await getPictures({
          collect: this.collect,
          per_page: this.per_page,
          page: this.currentPage
        })
        console.log(res)
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 点击分页
    handleCurrentChange (index) {
      this.currentPage = index
      this.loadImages()
    },
    // 点击全部与收藏
    changeCollect () {
      this.currentPage = 1
      this.loadImages()
    },
    // 点击选中素材图片
    imageClick (item) {
      this.selectedImageUrl = item.url
    },
    // 上传图片成功是显示的
    handleSuccess (res, file) {
      // console.log(res)//res 的url 就是这个图片的地址
      this.imageUrl = res.data.url// 这里只是预览 不需要重新渲染
      this.$message.success('上传成功')
    },
    // 给上传图片的确定注册点击事件
    handleConfirm () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          this.$message.error('请先选中一张图片')
          return
        }
        this.coverImgUrl = this.selectedImageUrl
      } else if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          this.$message.error('请先上传一张图片')
          return
        }
        this.coverImgUrl = this.imageUrl
      }
      this.dialogVisible = false
      // 子传父 imgurl
      this.$emit('input', this.coverImgUrl)
    }
  }
}
</script>

<style lang='less' scoped>
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list{
  margin-top: 15px;
  .img_item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
  .selected::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
  }
  .avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
