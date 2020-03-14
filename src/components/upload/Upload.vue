<template>
  <div>
    <el-upload
      action="http://www.51ywyf.com/ywyf-weixin/upload/uploadPic1.do"
      :headers="headers"
      :data="dataObj"
      :multiple="false"
      list-type="picture"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url"  alt="">
    </el-dialog>
  </div>
</template>

<script>
import {policy} from '@/api/oss'

export default {
  name: 'singleUpload',
  props:{
    value: String
  },
  data () {
    return {
      headers:{'Content-Type':'multipart/form-data'},
      dataObj:{
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
      },
      dialogVisible:false,
    }
  },
  computed: {
    imageUrl(){
      return this.value;
    },
    imageName(){
      if(this.value != null && this.value !== ''){
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      }else{
        return null;
      }
    },
    fileList() {
      return [{
        name: this.imageName,
        url: this.imageUrl
      }]
    },
    showFileList: {
      get: function () {
        return this.value !== null && this.value !== ''&& this.value!==undefined;
      },
      set: function (newValue) {
      }
    }
  },
  methods:{
    initialize(){
      
    },
    //传递父组件
    emitInput(val){
      this.$emit('input' , val)
    },
    //上传文件
    beforeUpload(file){
      let _self = this;
      return new Promise((resolve , reject) => {
        policy().then(response => {
          console.log(response)
          _self.dataObj.policy = response.data.policy;
          _self.dataObj.signature = response.data.signature;
          _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
          _self.dataObj.key = response.data.dir + '/${filename}';
          _self.dataObj.dir = response.data.dir;
          _self.dataObj.host = response.data.host;

          resolve(true)
        }).catch(err =>{
          console.log(err);
          reject(false)
        })
      })
    },
    //上传后移除
    handleRemove(file){
      this.emitInput('');
    },
    //上传成功
    handleUploadSuccess(file){
      console.log(file)
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
      this.emitInput(this.fileList[0].url);
    },
    //点击文件列表中已上传的文件时
    handlePreview(){
      this.dialogVisible = true;
    },
  },
  mounted() {

  },
  beforeDestroy() {

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