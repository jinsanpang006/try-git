<template>
  <div class="pictures">
      <el-card class="box-card">
        <template v-slot:header>
          <my-breadcrumb>素材管理</my-breadcrumb>
        </template>
          <div class="top-box">
          <el-radio-group size="medium" v-model="collect" @change='changeCollect'>
            <el-radio-button :label="false" >全部</el-radio-button>
            <el-radio-button :label="true">隐藏</el-radio-button>
          </el-radio-group>
            <el-button type="success" style="float: right" size="medium" @click="dialogVisible=true">上传图片素材</el-button>
            <el-dialog
            :modal='false'
              title="选择图片素材"
              :visible.sync="dialogVisible"
              width="30%">
              <!-- 这里的action  必须自己写地址  因为是eu发的  不能用之前设置的baseURL -->
               <el-upload
                class="avatar-uploader"
                :action='$axios.defaults.baseURL+"/mp/v1_0/user/images"'
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers='headers'
                :name="name">
                <el-image @load='closeImages' v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-dialog>
        </div>
          <el-row :gutter="10">
           <el-col  v-for="item in images"  :key="item.id" class='img_item'  :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                <el-image
                  style="width:100% ; height:180px"
                  :src=item.url
                  fit="cover"
                ></el-image>
                <div class="option">
                  <span :class='{star:item.is_collected}' class="el-icon-star-off" @click="switchCollect(item.id,item.is_collected)"></span>
                  <span class="el-icon-delete" @click='delCollect(item.id)'></span>
                </div>
            </el-col>
           </el-row>
           <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="per_page"
              layout="prev, pager, next"
              :total="total_count">
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getPictures, collectPictures, delPictures } from '@/api/pictures.js'
import { getUser } from '@/utils/storage.js'
export default {
  data () {
    return {
      per_page: 12,
      images: [],
      total_count: 0,
      currentPage: 1,
      collect: false,
      dialogVisible: false,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      name: 'image'
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    async loadImages () {
      try {
        const res = await getPictures({
          collect: this.collect,
          page: this.currentPage,
          per_page: this.per_page
        })
        console.log(res.data.data)
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 切换分页
    handleCurrentChange (index) {
      // console.log(index)
      this.currentPage = index
      // 切换完页面  得  重新渲染啊 !!!!
      this.loadImages()
    },
    // 全部与收藏
    changeCollect () {
      this.currentPage = 1
      this.loadImages()
    },
    // 图片上传前校验
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功调用的函数
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = res.data.url
      // 重新渲染
      this.loadImages()
    },
    // 成功加载完 关闭预览框 并且清空预览图片
    closeImages () {
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = null
      }, 2000)
    },
    // 点击收藏
    async  switchCollect (id, collect) {
      try {
        // 这里收藏的状态要取反  和之前的状态不一样
        const res = await collectPictures(id, !collect)
        this.$message.success('操作成功')
        // console.log(res)
        this.loadImages()
      } catch (err) {
        console.log(err)
      }
    },
    // 删除图片
    async delCollect (id) {
      const res = await delPictures(id)
      this.$message.success('操作成功')
      // console.log(res)
      this.loadImages()
    }
  }
}
</script>

<style lang="less" scoped>
.el-radio-group {
  margin-bottom: 15px;
}
.img_item {
  position: relative;
  box-sizing: border-box;
}
.option {
  position: absolute;
  left: 5px;
  right:5px;
  bottom: 5px;
  height: 30px;
  line-height: 30px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: #fff;
  span {
    margin: 0 30px;
    cursor: pointer;
  }
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
.el-pagination {
  margin-top: 20px;
}
.star {
  color: yellow;
}
.pictures /deep/ .el-pager li.active {
  background-color: red;
  border-radius: 2px;
  color: #fff;
}
</style>
<style lang="less">
// .pictures .el-pager li.active {
//   background-color: red;
//   border-radius: 2px;
//   color: #fff;
// }
</style>
