<template>
    <div class="gossip">

<!--    <div class="shadow p-3 mb-5 bg-white rounded">-->
      <div class="row gossip_box">
<!--        聊天框左侧-->
        <div class="gossip_left">
          <div class="person_icon">
            <img src="../assets/person_icon.jpg" alt="">
          </div>
        </div>
<!--        聊天框中间区域-->
        <div class="gossip_center">
          <div class="top_title">
            <h5>当前在线</h5>
          </div>

          <div class="ai_list">
            <div :class="[item.bg? 'ai_box_activate':'ai_box']"
                 v-for="(item ,index) of ai_lists" @click="change_ai(index)">
              <div class="ai_left">
                <img :src="item.ai_img" alt="">
              </div>
              <div class="ai_right">
                <div class="ai_name">{{item.ai_name}} <img :src="get_state(item.state)" alt=""></div>
                <div class="ai_message">{{item.messages}}</div>
              </div>
            </div>
          </div>

        </div>
<!--        聊天框内容-->
        <div class="gossip_right">
<!--          显示聊天内容-->
          <div class="message_show">
            <div class="gossip_name">
              <h4>{{ai_talk_with}}正在与您聊天...</h4>
            </div>
            <div class="show_" id="show_">
                <div class="chat_content"
                     v-for="item in chat_contents">
                  <gossip_msg :msg_obj="item"></gossip_msg>
<!--                  {{item}}-->
                </div>


            </div>


          </div>
<!--          写入聊天数据-->
          <div class="send_message">
            <div class="tip">

            </div>
            <textarea type="text"
                      class="message"
                      @keydown="listen($event)"
                      v-model="textarea"/>
          </div>
          <button class="btn btn-success send" @click="send">发送</button>
        </div>
      </div>

<!--    </div>-->
    <div class="alert alert-warning alert-dismissible " role="alert" v-if="alert">
      <button @click="alert=false" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <strong>Warning!</strong> {{ai_no_alive}}不在线!
    </div>
    </div>
</template>

<script>
  import gossip_msg from './gossip_msg'
  export default {
    components:{
      gossip_msg:gossip_msg
    },
    name: 'Gossip',
    data(){
      return{
        url:'',
        alert:false,
        ai_talk_with:'小云',
        ai_no_alive:'',
        ai_lists:[
          {ai_name:'小云',state:true,ai_img:require('../assets/dog-3431913.jpg'),messages:'dadadada',bg:true},
          {ai_name:'小歌',state:true,ai_img:require('../assets/cat.png'),messages:'hahahah',bg:false},
        ],
        chat_contents:[],
        textarea:'',
      }
    },
    methods:{
      get_state(state){
        if (state){
          return require('../assets/green_point.png')
        }
        else {
          return require('../assets/red_point.png')
        }
      },
      change_ai(index){
        if (this.ai_lists[index].state==true){
          for (var i=0 ;i<this.ai_lists.length;i++){
          this.ai_lists[i].bg=false
          }
        // console.log(this.ai_lists)
          this.ai_lists[index].bg=true
          this.ai_talk_with=this.ai_lists[index].ai_name
        }
        else {
          this.alert=true
          this.ai_no_alive=this.ai_lists[index].ai_name
        }

      },
      send(){
        // console.log(this.textarea)
        this.chat_contents.push({msg:this.textarea,ai:false},)

        let ai_res=this.ai_return(this.textarea)
        this.chat_contents.push({msg:ai_res,ai:true},)


        this.textarea=''
      },
      scrolltoBottom(){
        this.$nextTick(function () {
          let  div=document.getElementById('show_')
          div.scrollTop=div.scrollHeight
        })
      },
      listen(e){
        if (e.keyCode===13){
          this.send()
          e.preventDefault()
          return false
        }
      },
      ai_return(str){
          str=str.replace('？','!')
          str=str.replace("吗","")
          // str.replace('?','!')
        return str

      }

    },
    mounted () {
    // this.scrolltoBottom()
    },
    watch:{
      chat_contents(new_val){
        this.scrolltoBottom()
      }
    }

  }
</script>

<style scoped>

  .alert{
    position: fixed;
    width: 40%;
    top: 5%;
    left: 30%;
    z-index: 999;
  }

  .gossip{
    margin-top: 150px;
    margin-bottom: 100px;
  }
  .gossip_box{
    width: 910px;
    height: 700px;
    display: flex;
    margin: 0 auto;
    border: 1px solid rgba(204, 204, 204, 0.5);
    /*border-radius: 20px ;*/
  }
  .gossip_left{
    flex: 1;
    max-width: 60px;
    background-color: #27282c;
  }
  .person_icon{
    width: 36px;
    height: 36px;
    background: #2196f3;
    margin: 12px ;

  }
  .person_icon img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .gossip_center{
    flex: 3;
    max-width: 250px;
    background-color: #ebe9e8;
  }
  .top_title{
    width: 100%;
    height: 50px;
    background-color: #eeebe8;
    border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  }
  .top_title h5 {
    margin: 0;
    height: 50px;
    line-height: 50px;
    float: left;
    margin-left: 20px;
  }

  .ai_list{
    width: 100%;
    height: auto;

  }
  .ai_box{
    width: 100%;
    height: 65px;
    display: flex;
    background-color: #e1dfde;
  }
  .ai_box_activate{
    width: 100%;
    height: 65px;
    display: flex;
    background-color: #c8c5c6;
  }

  .ai_list :hover{
    background-color: #c8c5c6;
  }

  .ai_left{
    flex: 3;
    height: 100%;
    min-width: 65px;
  }
  .ai_left img {
    display: block;
    width: 50px;
    height: 50px;
    margin: 7.5px ;
    border-radius: 5px;
  }
  .ai_right{
    flex: 7;
    margin: 10px;
  }
  .ai_name{
    width: 100%;
    height: 25px;
    text-align: left;
    line-height: 25px;
    font-size: 20px;
    font-weight: inherit;
    /*background-color: #1b1b1b;*/
  }
  .ai_name img {
    margin-top: 2.5px;
    float: right;
    width: 20px;
    height: 20px;
  }

  .ai_message{
    width: 100%;
    height: 20px;
    text-align: left;
    line-height: 20px;
    color: #f8f8f6;
  }


  .gossip_right{
    flex: 7;
    max-width: 600px;
    /*background-color: #f5f5f5;*/
    position: relative;
  }
  .message_show{
    background-color: #f5f5f5;
    width: 100%;
    height: 500px;
    position: absolute;
    top: 0;
  }
  .gossip_name{
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e7e7e7;
  }
  .gossip_name h4{
    margin: 0;
    line-height: 50px;
    float: left;
    margin-left: 40px;
  }

  .send_message{
    width: 100%;
    height: 200px;
    background-color: white;
    position: absolute;
    bottom: 0;
  }
  .send{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .tip{
    width: 100%;
    height: 30px;
  }





  .show_{
    width: 100%;
    height: 450px;
    overflow-y: scroll;
    /*overflow-x: auto;*/
    /*background-color: #2196f3;*/
  }
  .message{
    width: 100%;
    height: 170px;
    border: none;
    outline-style: none;
    font-size: 20px;
    resize: none;
  }
  .chat_content{
    width: 100%;
    min-height: 65px;
    /*background-color: #2196f3;*/
    text-align: left;
    font-size: 20px;
  }

</style>
