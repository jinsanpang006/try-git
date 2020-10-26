<template>
  <div class="layout-container">
      <!-- 组件封装时  一般会给组件的   添加一个和组件名同名的类名    这样下面的css样式 可以直接写.组件名 -->
<el-container>
  <el-aside :width="isCollapse ? '64px':'200px'">
        <!-- logo -->
  <div class="logo" :class="{minLogo:isCollapse}"></div>
  <!-- 菜单区域 -->
  <!-- el-menu 整个菜单组件   -->
    <el-menu
    background-color="#002033"
    router
    :default-active="$route.path"
    :collapse='isCollapse'
    :collapse-transition='false'
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/articles">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/pictures">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/add-article">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
        <i class="el-icon-setting"></i>
        <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
    </el-menu-item>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header class="my-header" >
        <div class="left" @click="isCollapse=!isCollapse">
            <i  :class="isCollapse ? 'el-icon-s-fold': 'el-icon-s-unfold'"></i>
            <span>江苏传智播客科技教育有限公司</span>
        </div>
        <el-dropdown>

        <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        </div>

        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="del">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import { Info } from '@/api/user.js'
import { delUser } from '@/utils/storage'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      user: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    Info().then(res => {
      this.user = res.data.data
      this.$eventBus.$on('uploadName', (name) => {
        // console.log(name)
        this.user.name = name
      })
      this.$eventBus.$on('uploadImage', (img) => {
        // console.log(img)
        this.user.photo = img
      })
    })
  },
  methods: {
    del () {
      delUser()
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$route)

        this.$router.push('/login') // 不写这步的话还得刷新一下
        this.$message({
          type: 'success',
          message: '成功退出!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '不退了'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.layout-container {
  position: fixed;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #002033;
    .el-menu{
        border-right:none
    }
      .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/logo_admin.png) no-repeat center;
    background-size: 140px auto;
  }
  //一定要放在logo下面   这样会覆盖它
  .minLogo{
  background-image: url(../../assets/logo_admin_01.png);
  background-size: 36px auto;
}
  }
  .el-header {
    background-color: #b3c0d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
     .avatar-wrap{
         display: flex;
         align-items: center;
         cursor: pointer;
         .avatar {
             width: 30px;
             height: 30px;
             border-radius:50%;
             margin-right: 10px;
         }
     }

  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
