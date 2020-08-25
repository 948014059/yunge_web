<template>
  <div id="app">
    <div class="top-nav" v-if="this.$store.state.isPc">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
<!--        <router-link to="/" class="navbar-brand" href="#">首页</router-link>-->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
<!--            <li class="nav-item">-->
<!--              <a class="nav-link" href="#">关于云歌</a>-->
<!--            </li>-->
            <li class="nav-item">
              <router-link to="/" class="navbar-brand" href="#">体验中心</router-link>
            </li>
<!--            <li class="nav-item">-->
<!--              <a class="nav-link" href="http://192.168.3.203:15000" data-target="#myModal" data-toggle="modal">云歌人工智能训练平台</a>-->
<!--            </li>-->
          </ul>
        </div>
      </nav>
    </div>

    <div class="moblie_nav" v-if="!this.$store.state.isPc">
       <div style="width: 100%;height: 150px" v-if="this.$store.state.mobile_title"></div>
      <div class="main_nav" v-if="this.$store.state.mobile_title">
        <img src="./assets/mobile_top.png" alt="">
      </div>

      <div class="re" v-if="!this.$store.state.mobile_title" @click="back_">
        <div class="re_img">
          <img src="./assets/return.png" alt="">
        </div>
      </div>
    </div>

    <div class="container" style="" ref="main">
        <router-view/>
    </div>
    <div class="ec_bottom">
      <div class="tag" @click="linktoyg">
       Copyright © 广州云歌信息科技有限公司
      </div>
    </div>
    <modalpage></modalpage>
  </div>
</template>ubuntu
<script>
  import modal from '@/components/modal'
export default {
    components:{
      modalpage:modal
    },
    name: 'App',
    methods:{
      back_(){
        this.$router.go(-1);
      },
      linktoyg(){
        // this.$router.go('http://www.smartyg.com/')
        window.open('http://www.smartyg.com/')
      }
    },


  mounted () {
      const  userAgentInfo=navigator.userAgent
        const Agents=['Android','iPhone','SymbianOS','Windows Phone','iPad','iPod']
        let flag=true
        for (let v=0;v<Agents.length;v++){
          let name=new RegExp(Agents[v]);
          let iphone=new RegExp(Agents[1]);
          let ipad=new RegExp(Agents[4]);
          let ipod=new RegExp(Agents[5]);
          // console.log('iPhone'.test(userAgentInfo))
          // console.log(name)
          if (name.test(userAgentInfo)){

            this.$store.state.isPc=false
            if(iphone.test(userAgentInfo) || ipad.test(userAgentInfo) || ipod.test(userAgentInfo)){
              this.$store.state.is_iphone=true
            }
            break
          }
        }
        // this.$store.state.isPc=true
  },
  watch:{
      $route(to,from){
        // console.log(to)
        if (to.fullPath == '/'){
          this.$store.state.mobile_title=true
        }
        else {
          this.$store.state.mobile_title=false
        }
        window.scrollTo(0,0)
    }
  }
}
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }

  /*.navbar{*/
    /*background-color: greenyellow;*/
  /*}*/
  .topimg img{
    width: 30%;
    height: 30%;
    opacity:0.8;
  }
  .top-nav{
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 50px;
    z-index: 99;
  }
  .ec_bottom{
    width: 100%;
    height: 50px;
    background: #343a40;
    bottom: 0;
  }
  .tag{
    color: white;
    line-height: 50px;
  }
  .moblie_nav{
    width: 100%;
    /*height: 150px;*/
    /*position: absolute;*/
  }

  .main_nav{
    width: 100%;
    height: 280px;
    /*background-color: rgba(158, 234, 106, 0.8);*/
    position: fixed;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    /*z-index: ;*/
  }

  .main_nav img{
    width: 100%;
    height: 100%;
  }

  .re{
    width: 100%;
    height: 50px;
    background-color: #343a40;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .re_img{
    width: 50px;
    height: 50px;
    float: left;
  }

  .re_img img{
    width: 100%;
    height: 100%;
    padding: 10px;
  }



</style>
