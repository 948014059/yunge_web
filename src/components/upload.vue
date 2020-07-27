<template>
    <div class="upload">
        <input type="file" name="image" id='file' class="image_file"
          @change="show_img($event)">
        <div class="image_show" @click="fileclick()">
          <span style="width: 100%;height: 100%;
          line-height: 350px;font-size: 100px;" v-if="!hidden_">+</span>
          <img :src="image_base64" alt="" v-if="hidden_">
        </div>
        <div class="left_bottom">
          <img :src="i" alt=""v-for="i in base64_lists" @click="change_image(i)">
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
    name: 'upload',
    props:['base64_lists','url'],
    data(){
      return{
        hidden_:false,
        image_base64:'',
        upload_show:false,
        upload_flag:{'pro':'上传图片中...0%'},
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
        let self =this
        var reader= new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>{
          let result=reader.result
          let img=new Image()
          img.src=result
          console.log(result.length/1024/1024)
          if (result.length/1024/1024>1){
            img.onload=function () {
              self.compress(img,0.6)
              self.post_image()
            }
          }else {
            this.image_base64=result
            self.post_image()
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

      post_image(){
        // console.log(this.image_base64)
        let  that=this
        this.upload_show=true
        let json_data={'base64':this.image_base64,'keys':'5f15a18f3f03f7e88020acb1c2f8c93c'}
        console.log(json_data)
        this.$axios({method:'post',
        headers:{ "Content-Type": "application/json;charset=utf-8" },
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
    /*position: absolute;*/
    overflow: hidden;
  }
  .image_show img{
    /*margin-top: 10px;*/
    width: 100%;
    height: 100%;
    /*display: none;*/
    /*position: relative;*/
    /*top: 0;*/
    /*left: 0;*/
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
    /*position: fixed;*/
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
