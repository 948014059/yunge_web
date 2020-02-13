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
<!--游戏区域-->
      <div class="draw_box" v-show="pc">
        <div class="shadow  mb-5 bg-white rounded" style="padding-left: 15px;
    padding-right: 15px;" >
          <div class="row" id="row">
<!--            顶部提提示区域-->
            <div class="draw_top">
              请在<strong>{{times.t}}</strong>秒内画出<strong>{{draw_lists[draw_index]}}</strong>
            </div>
<!--            画板区域-->
            <div>
              <plant :weight="weight" :height="height"
                @change_img="change($event)"
                ref="clear"></plant>
              <button class="btn btn-success" @click="clearcanvas">清除</button>
            </div>
<!--            右侧提示区域-->
            <div class="plant_right" v-show="argmaxshow">
              我觉得你可能画的是:{{argmaxp}}
            </div>
          </div>
        </div>
      </div>

<!--      弹窗-->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop"
      id="btn_total" v-show="false">
        弹出显示下一关
      </button>

      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Quick Draw!</h5>
            </div>

            <div class="modal-body">
              <strong>{{message1}}</strong>{{message2}}
            </div>

            <div class="modal-footer">
<!--              <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>-->
              <button type="button" class="btn btn-primary" @click="next_one" v-show="ai_succ">下一关</button>
              <button type="button" class="btn btn-primary" @click="restart" v-show="!ai_succ">重新开始</button>
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
        weight:'280',
        height:'450',
        context:'',
        url:'/post_quickDraw',
        argmaxp:'香蕉',
        res:'',
        imgurl:'',
        times:{'t':20},
        intervalId :null,
        draw_index:0,
        argmaxshow:false,
        draw_lists:['飞机','天使','苹果','香蕉','蛋糕','书','瓶盖',
               '桥','公共汽车','小汽车','狗','门','鸭','眼睛','风扇','花',
               '马','热气球','钥匙','鼠标','鼻子','猪','笑脸','星星','太阳',
               '埃菲尔铁塔','火车','树'],
        message1:'Success',
        message2:'AI成功辨别出你的灵魂画作！',
        ai_succ:true,
      }
    },
    methods:{
        //上传图片
        change(data){
        this.context=data
        let  data_={'base64':data}
        this.$axios({method:'post',
        url: this.url,
        data:data_}).then(res=>{
          this.res=res.data.flag
          this.argmaxp=res.data.argmaxp
          this.argmaxshow=true
        })
      },
      //清空画布
      clearcanvas(){
        this.imgurl=this.$refs.clear.canvasclear()
      },
      //获得组件宽度
      getcolweight(){
        const weight=document.querySelector('#row').offsetWidth
        // console.log(weight)
        return weight
      },
      //计时器
      reduce(){
          this.intervalId=setInterval(()=>{
            switch (true) {
              case this.times.t>0:
                this.$set(this.times,'t',this.times.t-1)
                break;
              case this.times.t==0:
                // console.log('qucik')
                const total=document.querySelector('#btn_total').click()
                this.message1='Fail!'
                this.message2='AI 并不能辨别出您的灵魂画作!'
                this.ai_succ=false
                this.stop()
                break;
            }
          },1000)

      },
      //停止计时器
      stop(){
          clearInterval(this.intervalId)
          this.intervalId=null
      },
      //下一关
      next_one(){
          this.times.t=20
          this.draw_index+=1
          this.reduce()
          const total=document.querySelector('#btn_total').click()
          this.clearcanvas()
      },
      //重新开始
      restart(){
          const total=document.querySelector('#btn_total').click()
          this.draw_index=0
          this.times.t=20
          this.clearcanvas()
          this.startgameshow=true
      },

    },
    mounted () {
      const weight=this.getcolweight()
      this.weight=weight
      // this.height=weight-100
    },
    watch:{
      startgameshow(val){
        if (val==false){
          this.reduce()
        }
        else {
          this.stop()
        }

      },
      argmaxp(val){
        if (val==this.draw_lists[this.draw_index]){
          // this.next_=true
          if (this.draw_index<27){
            this.stop()
            this.message1='Success!'
            this.message2='AI成功辨别出你的灵魂画作！'
            this.ai_succ=true
            const total=document.querySelector('#btn_total').click()
          }
          else {
            this.stop()
            this.message1='Success!'
            this.message2='你已经通关全部关卡，更多关卡正在开发中！'
            this.ai_succ=false
            const total=document.querySelector('#btn_total').click()
          }

        }
      }
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
    /*width: 30%;*/
    /*height: 200px;*/
    background: white;
  }

</style>
