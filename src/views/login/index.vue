<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>

      <el-form class="login-form" :model="form" :rules="rules" ref="refLogin">
        <el-form-item prop='mobile'>
          <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>

        <el-form-item prop='code'>
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn" type="primary" @click='fn("refLogin")'>登录</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import { Login, userPatch } from '@/api/user.js'
import { setUser } from '@/utils/storage.js'
export default {
  name: 'Login', // 加个name, 是为了给组件起个名字, 在调试工具中能方便调试
  data () {
    // rule 当前规则的相关信息   value 当前校验的值  callback 成功调用 callback()    失败调用  callback(error('xxxxx'))
    const validatePass = (rule, value, callback) => {
      // console.log(rule, value, callback)
      if (value === false) {
        callback(new Error('请同意许可'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: true,
        name: '金三胖'
      },
      rules: {
        mobile: [
          // require:非空   必填项
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          // min max  长度范围
          // { min: 6, max: 11, message: '手机长度在 6 到 11 个字符', trigger: ['blur', 'change'] }
          // pattern:正则
          { pattern: /^1\d{10}$/, message: '手机号长度为11位', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '验证码长度为6位', trigger: ['blur', 'change'] }
        ],
        agree: [
          { validator: validatePass, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    fn (a) {
      // ref这个属性 需要通过$ref 来调用 确认对应的dom元素 或者 组件    然后去调用方法
      this.$refs[a].validate((flag) => {
        if (!flag) return
        Login(this.form.mobile, this.form.code).then(res => {
          console.log(res)
          // 本地存储登录信息
          setUser(res.data.data)
          this.$message.success('登陆成功')
          this.$router.push('/')
        }).catch(err => {
          this.$message.error('登录失败, 手机号或者验证码错误')
          console.log(err)
        })
        userPatch(this.form.name).then(res => {
          console.log(res)
        })
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
