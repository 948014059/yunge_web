<template>
    <div class="facere_box">
       <input type="file" name="image" id='file' class="image_file"
          @change="show_img($event)">

      <div class="upload_box" @click="click_file">
        <div class="upload_img" >
        <div class="add_icon" v-if="add_show">+</div>
          <img :src="image_base64" alt="" v-if="!add_show">
          <span></span>
          <span></span>
          <span></span>

        </div>
      </div>

      <div class="uplodbox">
        <div class="name_input">

          <div class="input-group flex-nowrap">
            <div class="input-group-prepend">
              <span class="input-group-text" id="name">姓名</span>
            </div>
            <input type="text" class="form-control" placeholder="" v-model="name"
                   aria-label="Username" aria-describedby="addon-wrapping">
          </div>
          <br>

          <div class="input-group flex-nowrap">
            <div class="input-group-prepend">
              <span class="input-group-text" id="word">单位</span>
            </div>
            <input type="text" class="form-control" placeholder="" v-model="word"
                   aria-label="Username" aria-describedby="addon-wrapping">
          </div>
          <br>


            <div class="input-group flex-nowrap">
              <div class="input-group-prepend">
                <span class="input-group-text" id="phone">电话</span>
              </div>
              <input type="text" class="form-control" placeholder="" v-model="phone"
                     aria-label="Username" aria-describedby="addon-wrapping">
            </div>


<!--          <span>单位：</span><input type="text" v-model="word"> <br><br>-->
<!--          <span>电话：</span><input type="text" v-model="phone"><br>-->

        </div>
        <div class="upload_bottom btn btn-success"  @click="upload_faces">提交</div>
      </div>


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
</template>

<script>
  export default {
    name: 'face_re',
    data(){
      return{
        add_show:true,
        image_base64:'',
        name:'',
        phone:'',
        word:'',
        url:'/post_facere',
        upload_show:false,
        upload_flag:{'pro':'上传图片中...0%'},
        hash_:'',
      }
    },
    methods:{
      click_file(){
        document.querySelector('#file').click()
      },

      show_img(event){
        let files=document.querySelector('#file').files[0]
        this.image_to_base64(files)
        this.add_show=false
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
        let self =this
        var reader= new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
          let result=reader.result
          let img=new Image()
          img.src=result
          if (result.length/1024/1024>1){
            img.onload=function () {
              self.compress(img,0.6)
              // self.post_image()
            }
          }else {
            this.image_base64=result
            // self.post_image()
          }
        }
        reader.onerror=function (error) {
          console.log('error')
        }
      },

      compress(img, size) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let initSize = img.src.length
            let width = img.width
            let height = img.height
            canvas.width = width
            canvas.height = height
            // 铺底色
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0, width, height)
            //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', size)
            console.log('*******压缩后的图片大小*******')
            console.log(ndata.length / 1024/1024)
            this.image_base64=ndata
        },

      chick_word(){
        if (this.name=='' || this.phone=='' || this.word==''){
          alert('请填入完整信息')
          return false
        }
        else {
          return true
        }
      },

         //获取随机字符进行区分用户
      get_hash(){
          var d= new Date()
          var time = d.getTime()
          var random_seed=Math.ceil(Math.random()*60)
          var str=time
          this.hash_=str
      },

      upload_faces(){

        var allowd_post = this.chick_word()
        if (allowd_post){
          let  that=this
          this.upload_show=true
          let json_data={'base64':this.image_base64,'keys':'5f15a18f3f03f7e88020acb1c2f8c93c','name':this.name,
              'work':this.word,'phone':this.phone,'time':this.hash_}
          // console.log(json_data)
          this.$axios({method:'post',
          headers:{ "Content-Type": "application/json;charset=utf-8" },
          url: this.url,
          data:json_data,
          onUploadProgress:function (e) {
              var complete=(e.loaded/e.total*100|0)+'%'
              that.$set(that.upload_flag,'pro','上传图片中...'+complete)

          },

          onDownloadProgress:function (e) {
              var complete = (e.loaded/e.total*100|0)+'%'
              that.$set(that.upload_flag,'pro','下载图片中...'+complete)
          }
          }).then(res=>{
            this.upload_show=false
            if (res.data.flag=='success'){
              alert('上传成功')
            }
            if(res.data.flag=='same'){
              alert('请勿重复上传')
            }
            if(res.data.flag=='error') {
              alert('请上传有人脸的照片')
            }
            // this.$emit('returnres',res.data)
          })
        }
      }

    },
    mounted () {
      this.get_hash()
    }
  }
</script>

<style scoped>
  .facere_box{
    margin-top: 50px;
    /*background-color: red;*/
    position: fixed;
    width: 100%;
    height: 800px;
    left: 0;
    background: url("../assets/facere_background.jpg");
    background-position: 100% 100%;

  }

  .image_file{
    display: none;
  }
  .upload_box{
    width: 100%;
  }
  .upload_img{
    width: 224px;
    height: 224px;
    margin: 0 auto;
    /*background: red;*/
    border-radius: 448px;
    margin-top: 50px;
    position: relative;
    /*border: 1px solid white;*/
    box-shadow: inset 0px 0px 25px 10px #2196f3;

  }

  .add_icon{
    width: 100%;
    height: 100%;
    font-size: 50px;
    line-height: 224px;
    color: white;
    opacity: 0.5;
  }
  .add_icon:hover{
    color: #cccccc;
  }
  .upload_img img{
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 448px;
    z-index: 0;
  }

  @keyframes living {
    0%{
      transform:  scale(0.1);
      opacity: 0.5;
    }
    25%{
      transform:  scale(1.1);
      opacity: 0.3;
    }
    50%{
      transform: scale(1.3);
      opacity: 0;
    }
    75%{
      transform:  scale(1.1);
      opacity: 0.1;
    }
    100%{
      transform: scale(0.1);
      opacity: 0.2;
    }
  }
  .upload_img span{
    position:  absolute;
    width: 224px;
    height: 224px;
    left: 0;
    bottom: 0;
    background:  #2196f3;
    opacity: 0.5;
    border-radius: 50%;
    -webkit-animation: living 3s linear infinite;
    z-index: -1;
  }
  .upload_img span:nth-child(2){
    -webkit-animation-delay: 0.5s;
  }
  .upload_img span:nth-child(3){
    -webkit-animation-delay: 1s;
  }

  .uplodbox{
    background: white;
    width: 100%;
    margin-top: 50px;
    height: 300px;
    position: absolute;
    opacity: 0.8;
    box-shadow: 0px 0px 25px 10px #cccccc;
  }

  .name_input{
    width: 80%;
    /*height: 50px;*/
    position: relative;
    margin: 0 auto ;
    top: 40px;
  }
  .name_input input{
    border: none;
    background: none;
    border: 1px solid #cccccc;
    border-radius: 5px;
  }
  .upload_bottom{
    position: relative;
    top: 60px;
    width: 70%;
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
