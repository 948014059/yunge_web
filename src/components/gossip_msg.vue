<template>
    <div class="msg_box" :style="'height:'+height+'px'">
      <div class="ai_box" v-if="msg_obj.ai">
        <div class="ai_icon">
          <img src="../assets/dog-3431913.jpg" alt="">
        </div>
        <div class="ai_msg">
          {{msg_obj.msg}}
        </div>
      </div>

      <div class="mine_box" v-if="!msg_obj.ai">
        <div class="mine_icon">
          <img src="../assets/person_icon.jpg" alt="">
        </div>
        <div class="mine_msg" >
          {{msg_obj.msg}}
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
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
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
      let cont_len = this.cont_len(this.msg_obj.msg)
      let  div_height=(parseInt(cont_len/24)+1)*20
      this.height=div_height
    },

  }
</script>

<style scoped>
  .msg_box{
    width: 100%;
    margin-top: 10px;
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
    max-width: 300px;
    min-height: 20px;
    background-color: skyblue;
    border-bottom-color: skyblue;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 20px;
    line-height: 18px;
    padding: 5px 12px 5px 12px;
    box-sizing: border-box;
    border-radius: 6px;
    word-break: break-all;

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
    right: 5px;
    margin-right: 65px;
    max-width: 300px;
    min-height: 20px;
    background-color: #9eea6a;
    border-bottom-color: #9eea6a;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 20px;
    line-height: 18px;
    padding: 5px 12px 5px 12px;
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
