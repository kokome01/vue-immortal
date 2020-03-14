<template>
  <div class="body">
    132
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>