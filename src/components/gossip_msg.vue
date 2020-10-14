<template>
    <div class="msg_box" :style="'height:'+height+'px'">
      <div class="ai_box"
           v-if="msg_obj.ai">
        <div class="ai_icon">
          <img :src="get_aipng()" alt="">
        </div>
        <div class="ai_msg">
          <span v-html="msg_obj.msg"></span>
          <div class="music_box" v-if="msg_obj.music">
            <div class="music_box_left">
              <img src="../assets/bf_music.png" alt="" @click="bf_music(msg_obj.music.id,$event)">
            </div>
            <div class="music_box_right">
              <h5>{{msg_obj.music.name}}</h5>
              <marquee >{{msg_obj.music.person}}-{{msg_obj.music.name}}</marquee >
            </div>
            <audio :src="msg_obj.music.url" controls="controls" :id="msg_obj.music.id"></audio>
          </div>

          <div class="img_box" v-if="msg_obj.img">
            <img :src="msg_obj.img" alt="" >
          </div>

        </div>
      </div>

      <div class="mine_box"
           v-if="!msg_obj.ai">
        <div class="mine_icon">
          <img src="../assets/person_icon.jpg" alt="">
        </div>
        <div class="mine_msg" >
          <span>{{msg_obj.msg}}</span>
          <div class="img_box" v-if="msg_obj.img">
            <img :src="msg_obj.img" alt="" >
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'gossip_msg',
    props:{
      msg_obj:{},
      ai_:'',
    },
    data(){
      return{
        height:'',
      }
    },
    methods:{
      cont_len(str){
        var len=0
        for (var i=0;i<str.length;i++){
          var c = str.charCodeAt(i)
          if (c >= 0 && c <= 128){
          len++
          }
          else {
            len+=2
          }
        }
        return len
      },
      get_aipng(){
        if (this.ai_=='小云'){
          return require('../assets/ai_xiaoyun.jpg')
        }
        else {
          return require('../assets/ai_xiaoge.jpeg')
        }
      },
      bf_music(id,event){
        event.stopPropagation();
        console.log(id)
        var audio= document.getElementById(id)

          if(audio.paused){ //如果当前是暂停状态
                audio.play(); //播放
            }else{//当前是播放状态
                audio.pause(); //暂停
        }


      },


    },
    mounted () {
      if (this.msg_obj.img){
        this.height=150
      }
      else if (this.msg_obj.music){
        this.height=100
      }
      else {
        let cont_len = this.cont_len(this.msg_obj.msg)
        // console.log(cont_len)
        let line_height_=Math.ceil(cont_len/22)
        // console.log(line_height_)
        let  div_height
        if (line_height_==1){
          div_height=0
        }
        else{
          div_height=line_height_*25+25
        }
        this.height=div_height
      }

    },

  }
</script>

<style scoped>
  .msg_box{
    width: 100%;
    margin-top: 20px;
    /*height: 100%;*/
    position: relative;
    /*display:table*/
    /*width:max-content;*/
  }


  .ai_box{
    width: 360px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .mine_box{
    width: 360px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .ai_icon{
    position: absolute;
    width: 50px;
    height: 50px;
  }
  .ai_icon img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 5px;
  }

  .mine_icon{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 5px;
  }
  .mine_icon img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin-top: 5px;
  }

  .ai_msg{
    position: absolute;
    top: 15px;
    left: 65px;
    max-width: 245px;
    min-height: 20px;
    background-color: skyblue;
    border-bottom-color: skyblue;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 20px;
    line-height: 25px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 6px;
    word-break: break-all;

  }

  .music_box{
    /*width: 245px;*/
    display: flex;
    height: 80px;

  }
  .music_box_left{
    flex: 4;
    min-width: 80px;
    min-height: 80px;
    background-image: url("../assets/mv_bg.jpg");
    background-size: 80px;
  }
  .music_box_left img {
    width: 40px;
    height: 40px;
    margin: 20px ;
    opacity: 0.6;
   }

  .music_box_left img:hover{
    opacity: 0.9;
  }

  .music_box_right{
    flex: 8;
    min-width: 165px;
    min-height: 80px;
  }
  .music_box_right h5{
    margin-left: 10px;
    margin-top: 10px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
  }
  .music_box_right marquee {
    height: 15px;
    line-height: 15px;
    margin-left: 10px;
    color: rgba(244, 244, 244, 0.59);
    overflow: -webkit-marquee;
    font-size: 15px;
    white-space: nowrap;
    -webkit-marquee-direcTIon:left;
    -webkit-marquee-repeTITIon:infinite;
  }

  .music_box audio{
    width: 0px;
    height: 0px;

  }

  .img_box{
    width: 200px;
    height: 130px;
    overflow: hidden;
  }
  .img_box img {
    width: 100%;
  }

  .ai_msg::before {
      content: '';
      position: absolute;

      top: 15px;
      left: -5px;
      width: 10px;
      height: 10px;
      margin-top: -10px;
      background: inherit;
      transform: rotate(45deg);
  }

  .mine_msg{
    position: absolute;
    top: 15px;
    right: 65px;
    /*margin-right: 6px;*/
    max-width: 245px;
    min-height: 20px;
    background-color: #9eea6a;
    border-bottom-color: #9eea6a;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 20px;
    line-height: 25px;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 6px;
    word-break: break-all;
  }
  .mine_msg::before {
    content: '';
    position: absolute;
    top: 15px;
    right: -5px;
    width: 10px;
    height: 10px;
    margin-top: -10px;
    background: inherit;
    /*自动继承父元素的背景*/
    transform: rotate(45deg);
  }

</style>
