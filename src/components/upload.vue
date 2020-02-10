<template>
    <div class="upload">
        <input type="file" name="image" id='file' class="image_file"
          @change="show_img($event)">
        <div class="image_show" @click="fileclick()">
          <span style="display: block;width: 100%;height: 100%;
          line-height: 350px;font-size: 100px;" v-if="!hidden_">+</span>
          <img :src="image_base64" alt="">
        </div>
        <div class="left_bottom">
          <img :src="i" alt=""v-for="i in base64_lists" @click="change_image(i)">
        </div>

    <div id="main" v-show="upload_show">
      <div class="box">

        <div class="loading">
        <div class="spinner-border" style="" role="status">
        </div>
         <span>{{upload_flag}}</span>
        </div>

      </div>
    </div>

    </div>
</template>

<script>
  export default {
    name: 'upload',
    props:['base64_lists','url'],
    data(){
      return{
        hidden_:false,
        image_base64:'',
        upload_show:true,
        upload_flag:'上传图片中...0%'
      }
    },
    methods:{
      show_img(event){
        let files=document.querySelector('#file').files[0]
        // this.imgDataUrl =this.getObjectURL(files)
        this.image_to_base64(files)
        this.hidden_=true
        // this.post_image()
      },
      getObjectURL(file){
        let url=null
        if (window.createObjectURL != undefined){
          url=window.createObjectURL(file)
        }
        else if(window.webkitURL!=undefined){
          url=window.webkitURL.createObjectURL(file)
        }
        else if(window.URL!=undefined){
          url=window.urlURL.createObjectURL(file)
        }
        return url
      },
      image_to_base64(file){
        var reader= new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
          // console.log(reader.result)
          this.image_base64=reader.result
          // console.log(this.image_base64)
          this.post_image(reader.result)
        }
        reader.onerror=function (error) {
          console.log('error')
        }
      },
      post_image(){
        let json_data={'base64':this.image_base64}
        this.$axios({method:'post',
        url: this.url,
        data:json_data,
        onUploadProgress:function(prigressEvent){
          if (progressEvent.lengthComputable){

          }
        }
        }).then(res=>{
          // console.log(res)
          // this.od_base64=res.data.base64_data
          this.$emit('returnres',res.data)

        })
      },
      fileclick(){
        document.querySelector('#file').click()
      },
      change_image(item){
        this.image_base64=item
        this.hidden_=true
        this.post_image()
      }
    },

  }
</script>

<style scoped>
  .upload{
    width: 100%;
  }
  .image_file{
    display: none;
  }
  .image_show{
    width: 100%;
    height: 350px;
    margin: 0 auto;
    background: black;
  }
  .image_show img{
    /*margin-top: 10px;*/
    width: 100%;
    height: 100%;
  }
  .image_show :hover{
    background: rgba(33, 181, 242, 0.32);
  }
  .left_bottom{
    /*margin-top: 5px;*/
    width: 100%;
    height: 100px;
    /*background: blue;*/
  }
  .left_bottom img{
    width: 18%;
    margin: 1%;
    height: 100%;
    float: left;
    display: block;
  }
  .left_bottom img:hover{
    filter: blur(5px);/* Chrome, Opera */
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
        /* IE6~IE9 */
  }
  #main{
    width: 100%;
    height: 100%;
  }
  .box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 9;
  }
  .spinner-border{
    width: 8rem;
    height: 8rem;
    color: white;
  }
  .loading{
    width: 100%;
    position: fixed;
    top: 35%;
  }
  .loading span{
    color: white;
    display: block;
    text-align: center;
  }
</style>
