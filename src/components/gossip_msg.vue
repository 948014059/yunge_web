<template>
    <div class="msg_box" :style="'height:'+height+'px'">
      <div class="ai_box"
           v-if="msg_obj.ai">
        <div class="ai_icon">
          <img src="../assets/ai_xiaoyun.jpg" alt="">
        </div>
        <div class="ai_msg">
          <span v-html="msg_obj.msg"></span>
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


    },
    mounted () {
      if (this.msg_obj.img){
        this.height=150
      }else {
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
