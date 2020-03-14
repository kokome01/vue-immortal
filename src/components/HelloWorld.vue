<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods:{
    initialize(){
      
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#666');
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
  created() {
    this.initialize();
  },
  components:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>