<template>
  <div class="body">
    <div class="login_logo">
      <img :src="logo.img" :alt="logo.name">
    </div>
    <div class="login_box">
      <div class="login">
        <vLogin v-show="showVal === 1" @funLogin="funShow"></vLogin>
        <vRegister v-show="showVal === 2" @funLogin="funShow"></vRegister>
        <vForget v-show="showVal === 3" @funLogin="funShow"></vForget>
      </div>
    </div>
  </div>
</template>

<script>
import vLogin from './components/Login.vue'
import vRegister from './components/Register.vue'
import vForget from './components/Forget.vue'

export default {
  name: 'index',
  data () {
    return {
      showVal:1,
      logo:{
        img:require('../../../static/img/logo.png'),
        name:'logo',
      },
      
    }
  },
  methods:{
    initialize(){
      console.log(this.showVal)
    },
    //对于页面转移
    funShow(val){
      this.showVal = val
    }
  },
  mounted() {
    //document.querySelector('body').setAttribute('style', 'background-color:#666');
  },
  beforeDestroy() {
    //document.querySelector('body').removeAttribute('style');
  },
  components:{
    vLogin:vLogin,
    vRegister,
    vForget,
  },
  created() {
    this.initialize();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_logo img{
    width: 100px;
    height: 100px;
  }
  .login_box{
    margin-top: 20px;
  }
  .login{
    box-shadow: 2px 2px 3px 3px #cdcdcd;
    border-radius:10px; 
    width: 300px;
    margin: auto;
  }
</style>