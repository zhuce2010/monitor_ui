<template>
  <div class="bg-img" :style="note" >
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h2 class="title" style="padding-left:22px;">界面化监控平台</h2>
      <el-tabs type="border-card" stretch = 'stretch'>
        <el-tab-pane label="用户名登陆" >
          <el-form-item prop="account"  >
            <span style="width:20%;" > 用户名：  </span>
            <el-input type="text" style="width:80%;" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <span style="width:20%;" > 密   码：</span>

            <el-input type="password" style="width:80%;"  v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
            <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="手机号登陆">
          <el-form-item prop="account"  >
            <span style="width:20%;" > 手机号：  </span>
            <el-input type="text" style="width:80%;" v-model="loginTelForm.phone" auto-complete="off" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password" >
            <span style="width:20%;" > 验证码：</span>
            <el-input type="text" style="width:80%;"  v-model="loginTelForm.code" auto-complete="off" placeholder="验证码"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:48%;" @click.native.prevent="getCode">获取验证码</el-button>
            <el-button type="primary" style="width:48%;" @click.native.prevent="loginPhone" :loading="loading">登 录</el-button>
          </el-form-item>




          </el-tab-pane>
      </el-tabs>




    </el-form>
  </div>

</template>

<script>
    import {mapState} from 'vuex'
    import Cookies from "js-cookie"
    import ThemePicker from "@/components/ThemePicker"
    import LangSelector from "@/components/LangSelector"

    export default {
        name: 'Login',
        components: {
            ThemePicker,
            LangSelector
        },
        data() {
            return {
                note: {
                    backgroundImage: "url(" + require('../assets/login.jpg') + ") ",
                    // backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                },

                loading: false,
                loginImg: "@/assets/login.jpg",
                loginForm: {
                    account: '',
                    password: '',
                    phone:'',
                    code:'',
                    captcha: '',
                    src: ''
                },
                loginTelForm: {
                    phone:'',
                    code:'',
                    codeCreateTime:'',
                    captcha: '',
                    src: ''
                },



                fieldRules: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                    // ,
                    // captcha: [
                    //   { required: true, message: '请输入验证码', trigger: 'blur' }
                    // ]
                },
                checked: true
            }
        },
        methods: {
            getCode(){
                //调用后端获取验证码方法
                let userInfo = {
                    phone: this.loginTelForm.phone,
                }
                this.$api.login.getCode(userInfo).then((res) => {
                /*    console.log("时间戳："+res)
                    this.loginTelForm.codeCreateTime =res
                    */

                });

            },
            loginPhone(){
                //使用手机号登陆
                this.loading = true
                if (this.loginTelForm.code =='')
                {
                    alert("请输入验证码")
                    return
                }
                let userInfo = {
                    phone: this.loginTelForm.phone,
                    code: this.loginTelForm.code,

                }
                //调用使用手机号登陆方法
                this.$api.login.loginPhone(userInfo).then((res) => {

                    if (res != 'ok') {
                        this.$message({
                            message: res,
                            type: 'error'
                        })
                    } else {
                        //              Cookies.set('token', res.data.token) // 放置token到Cookie
                        sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
                        //              this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                        this.$router.push('/Home')  // 登录成功，跳转到主页
                    }
                    this.loading = false
                }).catch((res) => {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                });






            },





            login() {
             //   this.$router.push('/Home')  // 登录成功，跳转到主页

                          this.loading = true
                          let userInfo = {
                              account: this.loginForm.account,
                              password: this.loginForm.password,
                              captcha: this.loginForm.captcha
                          }
                          this.$api.login.login(userInfo).then((res) => {

                              if (res != 'ok') {
                                  this.$message({
                                      message: res,
                                      type: 'error'
                                  })
                              } else {
                    //              Cookies.set('token', res.data.token) // 放置token到Cookie
                                  sessionStorage.setItem('user', userInfo.account) // 保存用户到本地会话
                    //              this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                                  this.$router.push('/Home')  // 登录成功，跳转到主页
                              }
                              this.loading = false
                          }).catch((res) => {
                              this.$message({
                                  message: res.message,
                                  type: 'error'
                              })
                          });
            },
            refreshCaptcha: function () {
                this.loginForm.src = this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
            },
            reset() {
                this.$refs.loginForm.resetFields()
            },
            // 切换主题
            onThemeChange: function (themeColor) {
                this.$store.commit('setThemeColor', themeColor)
            }
        },
        mounted() {
            this.refreshCaptcha()
        },
        computed: {
            ...mapState({
                themeColor: state => state.app.themeColor
            })
        }
    }
</script>

<style lang="scss" scoped>
  .bg-img {

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .login-container {
    position: relative;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }
  }


</style>
