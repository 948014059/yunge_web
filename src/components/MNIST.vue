<template>
  <div class="mnistbox">
    <div class="shadow p-3 mb-5 bg-white rounded">
      <div class="row">
<!--        mnist手写数字识别 画图区域-->
        <div class="col" id="plant_col" style="">
          <plant :weight="weight" :height="height"
          @change_img="change($event)"
          ref="clear"></plant>

          <button class="btn btn-danger" @click="clearcanvas"
          style="margin-top: 10px ;width: 100%;">清空</button>
        </div>
<!--        mnist手写数字识别 识别结果返回区域-->
        <div class="col">
          <div v-for="(item ,index) of res" class="progress_box">
            <span>{{index}}</span>
             <div class="progress">
              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="getweight(item)">{{ parseFloat(item).toFixed(2)*100+'%' }}</div>
             </div>
          </div>
          <div class="progress_top">
            <p>最终识别结果：{{argmaxp}}</p>
          </div>
<!--&lt;!&ndash;          <transition-group appear >&ndash;&gt;-->
<!--&lt;!&ndash;            <div v-for="(item,index) of imgurl" class="img_list" :key="item"&ndash;&gt;-->
<!--&lt;!&ndash;                 style="margin-top: 10px;">&ndash;&gt;-->
<!--&lt;!&ndash;            <img :src="item" alt="">&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </transition-group>&ndash;&gt;-->
        </div>
      </div>

    </div>

    <js_of_model :js_for_model="mnist_js" :img_url="img_url"></js_of_model>

  </div>
</template>

<style scoped>
.mnistbox{
  margin-top: 100px;
}
.v-enter,.v-leave-to{
    opacity: 0;
    transform: translateX(80px);
  }
.v-enter-active,.v-leave-avtive{
    transition: all 0.5s ease;
  }
  .img_list{
  width: 100%;
  height: auto;
}
  .img_list img{
    display: block;
    float: left;
    width: 18%;
    margin: 0.25% ;
    background: black;
  }

    .progress_top{
      margin-top: 30px;
    width: 100%;
    height: 50px;
    background: rgb(33, 181, 242);
      border-radius: 10px;
  }
    .progress_top p{
    display: block;
      color: rgba(255, 255, 255, 0.7);
    /*margin-top: 5px;*/
    /*height: 20px;*/
    text-align: center;
      line-height: 50px;
  }
  .progress_box{
    width: 100%;
    display: flex;
    margin-top: 20px;
  }
  .progress_box span{
    flex: 1;
    display: block;
    height: 20px;
    line-height: 20px;
  }
  .progress{
    flex: 8;
    height: 20px;
  }

</style>

<script>
  import plant from '@/components/plant'
  import js_of_model from './js_of_model'
  export default {
    components:{
      plant:plant,
      js_of_model:js_of_model
    },
    data () {
        return{
            weight:350,
            height:350,
            context:'555',
            url:'http://192.168.1.106:8888/post_mnist',
            res:[0,0,0,0,0,0,0,0,0,0],
            imgurl:'',
            argmaxp:'',
            mnist_js:'<strong>MNIST数据集</strong>来自美国国家标准与技术研究所，由纽约大学的Yann LeCun教授主导建立。250位志愿者的手写数字、共70000张数字图像构成了这个入门级的计算机视觉数据集。' +
              'MNIST数据集在深度学习中的地位，就像Hello,World!在编程中的地位。自建立以来，它便被广泛应用于检验各种机器学习算法、测试各种模型，为机器学习的发展做出了不可磨灭的贡献，其当之无愧为历史上最伟大的数据集之一。\n',
            img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577783754650&di=05990421ac9f7505b1179b19979becaa&imgtype=0&src=http%3A%2F%2Fstorage.neeqm.cn%2Fstore1%2FM00%2F11%2FAF%2FCgoBB1rC4r2AL5HsAADIHmr-qxQ168.jpg',
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
        const weight=document.querySelector('#plant_col').offsetWidth
        // console.log(weight)
        return weight-30
      },
      getweight(item){
        const  realval=parseFloat(item).toFixed(2)
        const  style='width:'+realval*100+'%;'
        console.log(style)
        return style
      }
    },
    mounted () {
      const weight=this.getcolweight()
      this.weight=weight
      this.height=weight-100
    }

  }
</script>
