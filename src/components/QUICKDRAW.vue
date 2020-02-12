<template>
    <div class="quickdraw_box">
      <transition>
      <div class="strat_game" v-show="startgameshow">
        <a href="#" @click="startgameshow=false">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Start the game
        </a>
      </div>
      </transition>

      <div class="draw_box" v-show="pc">
        <div class="shadow  mb-5 bg-white rounded" style="padding-left: 15px;
    padding-right: 15px;" >
          <div class="row" id="row">
<!--            顶部提提示区域-->
            <div class="draw_top">
              请在{{times}}秒内画出{{things}}
            </div>
<!--            画板区域-->
            <div>
              <plant :weight="weight" :height="height"
                @change_img="change($event)"
                ref="clear"></plant>
            </div>
<!--            右侧提示区域-->
            <div class="plant_right">
              我觉得你可能画的是:{{argmaxp}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import plant from './plant'
  export default {
    name: 'QUICKDEAW',
    components:{
      plant
    },
    data(){
      return{
        startgameshow:true,
        pc:true,
        weight:'300',
        height:'500',
        context:'',
        url:'/post_quickDraw',
        argmaxp:'香蕉',
        res:'',
        imgurl:'',
        times:20,
        things:'苹果'
      }
    },
    methods:{
        change(data){
        this.context=data
        let  data_={'base64':data}
        this.$axios({method:'post',
        url: this.url,
        data:data_}).then(res=>{
          this.res=res.data.flag
          this.argmaxp=res.data.argmaxp
        })
      },
      clearcanvas(){
        this.imgurl=this.$refs.clear.canvasclear()
      },
      getcolweight(){
        const weight=document.querySelector('#row').offsetWidth
        // console.log(weight)
        return weight
      },
    },
    mounted () {
      const weight=this.getcolweight()
      this.weight=weight
      // this.height=weight-100
    }
  }
</script>

<style scoped>
.quickdraw_box{
  margin-top: 100px;
}
  .strat_game{
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #031321;
    font-family: consolas;
  }
  .strat_game a{
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    color: #2196f3;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-decoration: none;
    font-size: 24px;
    overflow: hidden;
    transition: 0.2s;
  }
  .strat_game a:hover{
    color: #255784;
    background: #2196f3;
    box-shadow: 0 0 10px #2196f3,0 0 40px #2196f3,0 0 80px #2196f3;
    transition-delay: 1s;
  }
  .strat_game a span:nth-child(1){
    position: absolute;
    top:0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg,transparent,#2196f3);
  }
  .strat_game a:hover span:nth-child(1){
    left: 100%;
    transition: 1s;
  }

  .strat_game a span:nth-child(3){
    position: absolute;
    bottom:0;
    left: 100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg,transparent,#2196f3);
  }
  .strat_game a:hover span:nth-child(3){
    left: -100%;
    transition: 1s;
    transition-delay: 0.5s;
  }

  .strat_game a span:nth-child(2){
    position: absolute;
    right:0;
    top: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg,transparent,#2196f3);
  }
  .strat_game a:hover span:nth-child(2){
    top: 100%;
    transition: 1s;
    transition-delay: 0.25s;
  }

  .strat_game a span:nth-child(4){
    position: absolute;
    left:0;
    bottom: -100%;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg,transparent,#2196f3);
  }
  .strat_game a:hover span:nth-child(4){
    bottom: 100%;
    transition: 1s;
    transition-delay: 0.75s;
  }
  .v-enter,.v-leave-to{
    opacity: 0;
    transform: translateY(-500px);
  }
  .v-enter-active,.v-leave-active{
    transition:  all .8s ease;
  }
  .row{
    z-index: 1;
    position: relative;
  }
  .draw_top{
    width: 100%;
    height: 50px;
    /*background: #2196f3;*/
    line-height: 50px;
    text-align: center;
  }
  .plant_right{
    position: absolute;
    opacity: 0.5;
    right: 0;
    top: 50px;
    width: 30%;
    height: 200px;
    background: white;
  }

</style>
