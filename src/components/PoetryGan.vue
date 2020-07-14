<template>
    <div class="poetry_box">

      <div id="wrap">
        <div id="from-wrap">
          <div class="form">
            <p>您好</p>
            <label >有您的信封，请查收</label>
            <div class="select_box">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-outline-secondary"
                  @click="post_data">{{choose}}</button>
                  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" v-for="(item,index) of memus"
                    @click="choose_(index)">{{item}}</a>

                  </div>
                </div>
                <input type="text" class="form-control"
                       style="outline-style: none"
                       v-model="text"
                       :placeholder="placeholder"
                       aria-label="Text input with segmented dropdown button">
              </div>
            </div>
            <div class="poetry"  style="white-space: pre-line;text-align: center">
              {{poetry}}
            </div>
            <div class="by_box">
                —无题
            </div>
          </div>
        </div>
<!--        <div class="open btn btn-danger">打开</div>-->
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
    name: 'PoetryGan',
    data(){
      return{
          memus:['随机生成','藏头诗','给出首句'],
          placeholders:['随机生成，无需输入数据',
            '输入单词或句子如：人工智能',
            '输入五言首句如：山亭秋色满'],
          choose:'随机生成',
          placeholder:'随机生成，无需输入数据',
          url:'/post_poetry',
          text:'',
          poetry:'寒随穷律变，春逐鸟声开。\n初风飘带柳，晚雪间花梅。\n碧林青旧竹，绿沼翠新苔。\n芝田初雁去，绮树巧莺来。',
          upload_show:false,
          upload_flag:{'pro':'上传中...0%'},
      }
    },
    methods:{
      choose_(index){
        console.log(index)
        // this.$set()
        this.choose=this.memus[index]
        this.placeholder=this.placeholders[index]
      },
      post_data(){
        this.upload_show=true
        var  json_data={'choose':this.choose,
        'text':this.text}
        this.$axios({method:'post',
        url: this.url,
        data:json_data,
        onUploadProgress:function (e) {
            var complete=(e.loaded/e.total*100|0)+'%'
            that.$set(that.upload_flag,'pro','上传中...'+complete)
            // this.upload_flag='上传图片中...'+complete
            // console.log('上传图片中...'+complete)
        },
        onDownloadProgress:function (e) {
            var complete = (e.loaded/e.total*100|0)+'%'
            that.$set(that.upload_flag,'pro','下载中...'+complete)
        }
        }).then(res=>{
          // console.log(res)
          // this.od_base64=res.data.base64_data
          // this.upload_show=false
          // this.$emit('returnres',res.data)
          this.upload_show=false
          this.poetry=res.data.char
        })
      },
    },

  }
</script>

<style scoped>
  .poetry_box{
    margin-top: 160px;
  }
  #wrap{
    width: 530px;
    margin: 20px auto 0;
    height: 1000px;
  }

  #from-wrap{
    overflow: hidden;
    height: 447px;
    position: relative;
    top:  0px;
    transition:  all 0.5s ease-in-out .3s;
    /*z-index: 99;*/
  }
  #from-wrap:before{
    content: "";
    position: absolute;
    bottom: 128px;
    left: 0px;
    background:url("../assets/before.png") ;
    width: 530px;
    height: 317px;
  }
  #from-wrap:after{
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: url("../assets/after.png");
    width: 530px;
    height: 259px;
  }
  #from-wrap.hide:after,
  #from-wrap.hide:before{
    display: none;
  }
  #from-wrap:hover{
    height: 777px;
    top: -200px;
  }

  .form{
    background: white;
    position: relative;
    top: 200px;
    overflow: hidden;
    height: 530px;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border:  1px solid white;
    border-right: 3px;
    transition:  all 0.5s ease-in-out .3s;
  }
  /*#from-wrap:hover .form{*/
  /*  !*height: 530px;*!*/
  /*}*/
  label{
    /*margin: 11px 20px 0 0;*/
    font-size: 15px;
    color: gray;
    text-transform: uppercase;
  }




  .select_box{
    position: relative;
    top: 22px;
  }
  .by_box{
    position: relative;
    top: 0;
    left: 130px;
  }
  .btn{
    z-index: 0;
  }
  .open{
    /*position: relative;*/
    /*top: -100px;*/
  }
  .poetry{
    position: relative;
    top: 20px;
    /*transition: all .5s ease ;*/
    /*transform: translateX(-20px);*/
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
