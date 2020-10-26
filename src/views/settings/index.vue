<template>
  <div class='settings-container'>
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <my-breadcrumb>个人设置</my-breadcrumb>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">100</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request='uploadPhoto'>
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { Info, userPatch, reqModUserImage } from '@/api/user.js'
export default {
  name: 'Settings',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      // 用户信息
      userInfo: {
        name: 'test',
        intro: 'info',
        email: 'info@qq.com',
        mobile: '17788889999',
        photo: ''
      },
      // 支持上传组件的数据
      imageUrl: null
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const res = await Info()
      console.log(res)
      this.userInfo = res.data.data
    },
    // 修改用户资料

    async save () {
      const { name, email, intro } = this.userInfo
      const res = await userPatch({ name, email, intro })
      console.log(res)
      this.$message.success('修改成功')
      // 传给layout的created 显示
      this.$eventBus.$emit('uploadName', name)
    },
    async uploadPhoto (obj) {
      try {
        console.log(obj)

        const formData = new FormData()

        formData.append('photo', obj.file)

        const res = await reqModUserImage(formData)
        console.log(res)
        this.userInfo.photo = res.data.data.photo
        this.$eventBus.$emit('uploadImage', this.userInfo.photo)
        this.$message.success('上传头像成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.avatar{
  width: 178px;
  height: 178px;
  line-height: 178px;
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
.edit-photo{
  font-size: 12px;
  text-align: center;
}
</style>
