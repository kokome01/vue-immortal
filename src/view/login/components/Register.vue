<template>
  <div>
    <div class="login_box">
      <el-form :model="inputForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item  prop="tel">
          <el-input
            class="login_input" prefix-icon="el-icon-user-solid" placeholder="请输入手机号" v-model="inputForm.tel" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            class="login_input" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="inputForm.password" show-password>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            class="login_input login_code" prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="inputForm.code" clearable>
          </el-input>
          <el-button type="primary" @click="gainCode()">获取</el-button>
        </el-form-item>
        <el-button style="width: 100%" class="login_button" type="primary">注册</el-button>
      </el-form>
    </div>
    <p class="login_other"><span @click="funLogin()">我要登录></span></p>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    var validateTel = (rule , value , callback)=>{
      console.log(value)
      if(!value){
        return callback(new Error('账号不能为空'));
      }else if(value.length != 11){
        return callback(new Error('账号长度错误'));
      }else if(Number.isInteger(value)){
        return callback(new Error('账号格式错误'));
      }else{
        callback();
      }
    }
    var validatePass = (rule , value , callback)=>{
      if(!value){
        return callback(new Error('密码不能为空'));
      }else if(value.length < 6){
        return callback(new Error('密码长度小于6位'));
      }else{
        callback();
      }
    }
    var validateCode = (rule , value , callback)=>{
      if(!value){
        return callback(new Error('验证码不能为空'));
      }else{
        callback();
      }
    }
    return {
      inputForm:{
        tel:'',
        password:'',
        code:'',
      },
      rules: {
        tel: [
          {required: true, validator: validateTel, trigger: 'blur' }
        ],
        password: [
          {required: true, validator: validatePass, trigger: 'blur' }
        ],
        code: [
          {required: true, validator: validateCode, trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    initialize(){
      
    },
    //获取验证码
    gainCode(){

    },
    //返回登录
    funLogin(){
      this.$emit("funLogin",1)
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  created() {
    this.initialize();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_input{
    margin-bottom: 0px;
  }
  .login_box{
    padding: 20px 20px 10px 20px;
  }
  .login_button span{
    color: #fff;
    display: block;
  }
  .login_code{
    width: 185px;
  }
  .code_img{
    position: absolute;
    top: 0px;
    right: -100px;
    height: 40px;
    width: 80px;
    border: 1px solid #f1f1f1;
    border-radius:5px; 
  }
  .login_other{
    padding: 0px 20px;
    height: 30px;
  }
  .login_other span{
    color: #666;
    font-size: 12px;
  }
  .login_other span:nth-child(1){
    float: left;
  }
</style>