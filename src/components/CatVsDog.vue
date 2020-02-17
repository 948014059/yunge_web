<template>
    <div class="cd_box">
      <div class="shadow p-3 mb-5 bg-white rounded">
      <div class="cd">
        <img src="../assets/dog.png" alt="">
        <img src="../assets/cat.png" alt="">


<!--        底部进度条+上传-->
        <div class="par_">
          <div class="vs_pr">
            <div class="dog_bar">
              <div class="bar_1" style="width: 100%"> 55</div>
            </div>

            <div class="flip-container">
                <div class="flipper" @mouseenter="tips=true" @mouseleave="tips=false">
                  <div class="front">
                    <div class="vs_img"></div>
                  </div>
                  <div class="back">
                    <div class="back_upload" @click="uploadclick">
                      <span  v-if="!hidden_">+</span>
                      <img :src="image_base64" alt="">
                    </div>
                  </div>
                </div>
              </div>

            <div class="cat_bar">
              <div class="bar_2" style="width: 50%">55</div>
            </div>
          </div>
        </div>
        <input type="file" id="cd_upload"
               style="display: none"
               name="image"
               @change="show_img($event)">
        <div id="main" v-show="upload_show">
      <div class="box">

        <div class="loading">
        <div class="spinner-border" style="" role="status">
        </div>
         <span>{{upload_flag.pro}}</span>
        </div>

      </div>
    </div>

      </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CatVsDog",
        data(){
          return{
          tips:true,
          hidden_:false,
          image_base64:'',
          upload_flag:{'pro':'上传图片中...0%'},
          upload_show:false,
          url:'/post_catdog'
          }
        },
      methods:{
        uploadclick(){
          const upload = document.querySelector('#cd_upload').click()
        },

        show_img(event){
        let files=document.querySelector('#cd_upload').files[0]
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
        let  that=this
        this.upload_show=true
        let json_data={'base64':this.image_base64}
        this.$axios({method:'post',
        url: this.url,
        data:json_data,
        onUploadProgress:function (e) {
            var complete=(e.loaded/e.total*100|0)+'%'
            that.$set(that.upload_flag,'pro','上传图片中...'+complete)
            // this.upload_flag='上传图片中...'+complete
            // console.log('上传图片中...'+complete)
        },
        onDownloadProgress:function (e) {
            var complete = (e.loaded/e.total*100|0)+'%'
            that.$set(that.upload_flag,'pro','下载图片中...'+complete)
        }
        }).then(res=>{
          // console.log(res)
          // this.od_base64=res.data.base64_data
          this.upload_show=false
          this.$emit('returnres',res.data)

        })
      },


      }
    }
</script>

<style scoped>
.cd_box{
  margin-top: 100px;
  /*background: #2196f3;*/
}
  .cd{
    width: 100%;
    height: 420px;
    position: relative;
  }
  .cd img:nth-child(1){
    /*flex: 5;*/
    max-width: 240px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cd img:nth-child(2){
    /*flex: 5;*/
    max-width: 240px;
    /*float: right;*/
    position: absolute;
    top: 0;
    right: 0;
  }
  .par_{
    position: absolute;
    top: 70%;
    width: 100%;
    height: 150px;
  }
  .vs_pr{
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .dog_bar{
    flex: 3;
    background: rgba(204, 204, 204, 0.5);
    height: 25px;
    border-radius: 50px 0px 0 50px;
    margin-top: 62.5px;
    margin-left: 150px;
  }
  .bar_1{
    /*width: 10%;*/
    height: 25px;
    background: #2c3e50;
    float: right;
    border-radius: 50px 0px 0 50px;
    color: white;
  }
  .vs_img{
      width: 100%;
      height: 100%;
      max-width: 150px;
      max-height: 150px;
      flex:3;
      background-image:url('data:image/png;base64,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');
      /*background-position: 150px 150px;*/
  }
  /*.vs_img img{*/
  /*  display: block;*/
  /*  max-width: 100%;*/
  /*  max-height: 100%;*/
  /*}*/
  .cat_bar{
    flex: 3;
    background: rgba(204, 204, 204, 0.5);
    height: 25px;
    border-radius: 0px 50px 50px 0px;
    margin-top: 62.5px;
    margin-right: 150px;
  }

  .bar_2{
    /*width: 10%;*/
    height: 25px;
    background: #2c3e50;
    float: left;
    border-radius: 0px 50px 50px 0px;
    color: white;
  }
   .flip-container {
    margin: 0 auto ;
    width: 150px;
    height: 150px;
    perspective:1000px;
  }
  .flip-container:hover .flipper {
    transform:rotateY(540deg);
  }
  .flip-container,.front,.back {
    width:150px;
    height:150px;
  }
  .flipper {
    transition:0.6s;
    transform-style:preserve-3d;
    position:relative;
  }
  .front,.back {
    position:absolute;
  }
  .back {
    transform:rotateY(180deg);
  }
  .back_upload{
    width: 100px;
    height: 100px;
    /*margin: 23px auto ;*/
    margin-top: 22px;
    margin-left: 28px;
    background: #ffffff;
    border-radius: 200px;
    border: 2px solid #1b1b1b;
    text-align: center;
    line-height: 100px;
    font-size: 80px;
  }
  .back_upload img{
    width: 100px;
    height: 100px;
    margin-top: 22px;
    margin-left: 28px;
    border-radius: 200px;
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
