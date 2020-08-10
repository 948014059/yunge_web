<template>
    <div class="gossip">
<!--      pc 端显示-->
      <div class="row gossip_box" v-if="$store.state.isPc">
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
              <viewer :images="chat_contents">
                <transition-group>
                <div class="chat_content"
                     v-for="(item,index) of chat_contents" :key="index">
                  <gossip_msg :msg_obj="item"></gossip_msg>
<!--                  {{item}}-->
                </div>
                </transition-group>
              </viewer>

            </div>


          </div>
<!--          写入聊天数据-->
          <div class="send_message">
            <div class="tip">
              <svg width="1em" height="1em" viewBox="0 0 16 16"
                   class="bi bi-image-alt" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg"
                    @click="upload_yolo">
                <path d="M10.648 6.646a.5.5 0 0 1 .577-.093l4.777 3.947V15a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-2l3.646-4.354a.5.5 0 0 1 .63-.062l2.66 2.773 3.71-4.71z"/>
                <path fill-rule="evenodd" d="M4.5 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
              <svg width="1em" height="1em" viewBox="0 0 16 16"
                   class="bi bi-person-square" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg"
                    @click="upload_face">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
            </div>
            <textarea type="text"
                      class="message"
                      @keydown="listen($event)"
                      v-model="textarea"/>
          </div>
          <button class="btn btn-success send" @click="send">发送</button>
        </div>
      </div>
<!--      移动端显示-->
      <div class="mobile" v-if="!$store.state.isPc">
        <div class="show_" id="show_">
              <viewer :images="chat_contents">
                <transition-group>
                <div class="chat_content"
                     v-for="(item,index) of chat_contents" :key="index">
                  <gossip_msg :msg_obj="item"></gossip_msg>
<!--                  {{item}}-->
                </div>
                </transition-group>
              </viewer>


            </div>
        <div class="mobile_bottom">
          <div class="mobile_test_input">
            <input type="text" v-model="textarea" @keydown="listen($event)">
          </div>
          <div class="mobile_button_send" @click="send">
            发送
          </div>
        </div>
      </div>

      <input type="file" name="image" id='file' class="image_file"
          @change="post_yolo($event)">

      <input type="file" name="image" id='file1' class="image_file"
          @change="post_face($event)">

      <transition name="alert">
      <div class="alert alert-warning alert-dismissible " role="alert" v-if="alert">
        <button @click="alert=false" type="button" class="close"><span aria-hidden="true">&times;</span></button>
        <strong>Warning!</strong> {{ai_no_alive}}不在线!
      </div>
    </transition>

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
          {ai_name:'小云',state:true,ai_img:require('../assets/ai_xiaoyun.jpg'),messages:'dadadada',bg:true},
          {ai_name:'小歌',state:false,ai_img:require('../assets/cat.png'),messages:'hahahah',bg:false},
        ],
        chat_contents:[
          // {msg:'msg',ai:false,img:''},
          // {msg:'msg',ai:true,img:''},
          // {msg:'msg',ai:false,img:''},
          // {msg:'msg',ai:false,img:''},
          // {msg:'msg',ai:false,img:''},
          // {msg:'msg',ai:false,img:''},
        ],
        textarea:'',
        image_base64:'',
      }
    },
    methods:{
      //
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
      add_contents(msg,ai,img){
        this.chat_contents.push({msg:msg,ai:ai,img:img})
      },
      send(){
        // console.log(this.textarea)
        this.add_contents(this.textarea,false,'')
        this.ai_return(this.textarea)
        // this.add_contents(ai_res,true,'')
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
          let json_data={'question':str,'keys':'5f15a18f3f03f7e88020acb1c2f8c93c'}
          this.$axios({method:'post',
          headers:{ "Content-Type": "application/json;charset=utf-8" },
          url: 'api/post_gossip',
          data:json_data,
          }).then(res=>{
            if (res.data.flag=='error'){
              this.add_contents('错误！',true,'')
              this.ai_lists[0].messages='错误！'
            }else {
              this.add_contents(res.data.answay,true,'')
              this.ai_lists[0].messages=res.data.answay
            }

          })
          // str.replace('?','!')
        // return str

      },
      upload_yolo(){
        document.querySelector('#file').click()
      },
      upload_face(){
        document.querySelector('#file1').click()
      },

      post_yolo(){
        let files=document.querySelector('#file').files[0]
        this.image_to_base64(files,'/post_yolo')
        // this.post_image()
      },
      post_face(){
        let files=document.querySelector('#file1').files[0]
        this.image_to_base64(files,'/post_face')
        // this.post_image()
      },

      post_image(url){
        // let files=document.querySelector('#file').files[0]
        // this.image_to_base64(files)
        let  that=this
        let json_data={'base64':this.image_base64,'keys':'5f15a18f3f03f7e88020acb1c2f8c93c'}
        this.add_contents('',false,this.image_base64)
        this.add_contents('请稍等...',true)
        this.$axios({method:'post',
        headers:{ "Content-Type": "application/json;charset=utf-8" },
        url: url,
        data:json_data,
        }).then(res=>{
          if (res.data.flag=='error'){
            this.add_contents('错误！',true,'')
          }else {
            this.add_contents('',true,res.data.base64_data)
          }

        })
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

      image_to_base64(file,url){
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
              self.post_image(url)
            }
          }else {
            this.image_base64=result
            self.post_image(url)
          }
        }
        reader.onerror=function (error) {
          console.log('error')
        }
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

    },
    mounted () {
    // this.scrolltoBottom()
      this.ai_return('robot')
    },
    watch:{
      chat_contents(new_val){
        this.scrolltoBottom()
      }
    }

  }
</script>

<style scoped>
  .mobile{
    margin: 0;
    width: 100%;
    /*height: 600px;*/
    margin-top: -55px;
    background: white;
    border-radius: 20px;
    margin-bottom: -55px;
  }
  .mobile_bottom{
    width: 100%;
    height: 50px;
    display: flex;
    text-align: left;
    /*background-color: #2196f3;*/
  }
  .mobile_test_input{
    flex: 8;
  }
  .mobile_test_input input{
    margin: 8px;
    border: none;
    width: 100%;
    height: 34px;
    /*margin-top: 10px;/*/
    outline-style: none;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid #cccccc;
  }
  .mobile_button_send{
    flex: 2;
    background-color: #9eea6a;
    margin: 8px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 10px;
    color: white;
  }

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
    overflow: hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp: 3;
    /*white-space: nowrap;*/
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
    height: 100px;
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
  .tip svg {
    width: 20px;
    height: 20px;
    margin: 5px;
    float: left;
  }
  .tip svg:hover{
    color: #2196f3;
  }

  .show_{
    width: 100%;
    height: 550px;
    overflow-y: scroll;
    overflow-x: hidden;
    /*overflow-x: auto;*/
    /*background-color: #2196f3;*/
  }
  .message{
    width: 100%;
    height: 70px;
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

  .image_file{
    display: none;
  }

  .alert-enter,
  .alert-leave-to{
    opacity: 0;
    transform: translateY(-150px);
  }

  .alert-enter-active,
  .alert-leave-active{
    transition:  all .8s ease;
  }

  .v-enter, .v-leave-to {
    opacity : 0 ;
      transform: translateZ(20px);
    }
    .v-enter-active, .v-leave-active {
        transition :all .8s ease;
    }

</style>
