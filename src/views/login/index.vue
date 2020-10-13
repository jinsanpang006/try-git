<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>

      <el-form class="login-form" :model="form" :rules="rules">
        <el-form-item prop='mobile'>
          <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click='fn'>登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login', // 加个name, 是为了给组件起个名字, 在调试工具中能方便调试
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { min: 6, max: 11, message: '手机长度在 6 到 11 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    fn () {
      if (!this.form.agree) {
        // 在引入element-ui时  就在vue实例上添加了 message方法
        this.$message({
          showClose: true,
          message: '请点击许可同意',
          type: 'warning'
        })
        return
      }
      this.$axios.post('/mp/v1_0/authorizations', {
        mobile: this.form.mobile,
        code: this.form.code
      }).then(res => {
        this.$message.success('登陆成功')
      }).catch(err => {
        this.$message.error('登录失败, 手机号或者验证码错误')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
// 铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
