<template>
  <div id="app">
    <div class="top-nav" >
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
<!--              <a class="nav-link" href="#" data-target="#myModal" data-toggle="modal">云歌人工智能训练平台</a>-->
<!--            </li>-->
          </ul>
        </div>
      </nav>
    </div>
    <div class="container" style="margin-top: 30px">
        <router-view/>
    </div>
    <div class="ec_bottom">
      <dic class="tag">
       © POWER BY YunGe
      </dic>
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
    name: 'App'
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
  .topimg{
    background: url("./assets/topimage1.jpg") no-repeat;
    background-position: center;
    background-size: 100% 100%;
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

</style>
