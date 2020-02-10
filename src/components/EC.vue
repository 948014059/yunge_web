<template>
  <div class="try">

    <div class="row" >
    <div class="col-md-4 " v-for="i in eclist">
          <div class="card mb-4 shadow-sm">
            <img :src="i.bgurl" alt="">
            <div class="card-body">
              <h4>{{i.title}}</h4>
              <p class="card-text">{{i.words}}</p>
                <router-link :to="i.link_" class="btn btn-success" style="float: right; margin-top: 10px">体验</router-link>
            </div>
          </div>
        </div>
     </div>

  </div>
</template>


<script>
  export default {
    data(){
      return{
        eclist:[
          {bgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577783754650&di=05990421ac9f7505b1179b19979becaa&imgtype=0&src=http%3A%2F%2Fstorage.neeqm.cn%2Fstore1%2FM00%2F11%2FAF%2FCgoBB1rC4r2AL5HsAADIHmr-qxQ168.jpg',
            link_:'/mnist',
            title:'MNIST 手写数字识别',
            words:'MNIST 数据集来自美国国家标准与技术研究所, 训练集由来自 250 个不同人手写的数字构成, 其中 50% 是高中学生, 50% 来自人口普查局  的工作人员. 测试集 也是同样比例的手写数字数据.'},
            {bgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577784813054&di=89bba542f6b992e72bedda7ecdb7f35c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180416%2F331b00720bb84c629839bb3572039186.jpeg',
            link_:'/mnist',
            title:'人脸检测',
            words:'人脸检测是自动人脸识别系统中的一个关键环节。早期的人脸识别研究主要针对具有较强约束条件的人脸图象（如无背景的图象），往往假设人脸位置一直或者容易获得，因此人脸检测问题并未受到重视。'},
          {bgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578380059&di=34e7b5ac42438570f422c442b4945abf&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.xianjichina.com%2Fdata%2Fediter%2F20180612%2Fimage%2F542813638c2dfbcefd2227c7c3c18df8.jpg',
            link_:'/mnist',
            title:'图像识别',
            words:'MNIST 数据集来自美国国家标准与技术研究所, 训练集由来自 250 个不同人手写的数字构成, 其中 50% 是高中学生, 50% 来自人口普查局  的工作人员. 测试集 也是同样比例的手写数字数据.'},
          {bgurl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577785576408&di=3b478111cdf50c63fb9551f5ac26a000&imgtype=0&src=http%3A%2F%2Fphotocdn.tv.sohu.com%2Fimg%2F20181211%2Fvrs_bg_hor_1544522015233_9529188.jpg',
            link_:'/CatVsDog',
            title:'猫狗大战',
            words:'阿猫阿狗的识别是kaggle上的一个比赛，参赛者们需要不断调整模型与算法进行训练，以得到更高的准确率'},
          {bgurl:'http://5b0988e595225.cdn.sohucs.com/images/20170826/2c327400b84844d8af11e78fa08c886d.jpeg',
            link_:'/mnist',
            title:'灵魂画师',
            words:'Quick, Draw是谷歌开源的数据集，超过1500万名玩家贡献了数百万张简笔画。 Quick，Draw！ 这些Doodle是一个独特的数据集，可以帮助开发人员训练新的神经网络，帮助研究人员了解世界各地人们绘画的方式，并帮助艺术家创作我们尚未想到的事物。'},
          {bgurl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=754030452,1401611360&fm=26&gp=0.jpg',
            link_:'/yolov3',
            title:'目标检测',
            words:'目标检测，也叫目标提取，是一种基于目标几何和统计特征的图像分割，它将目标的分割和识别合二为一，其准确性和实时性是整个系统的一项重要能力。尤其是在复杂场景中，需要对多个目标进行实时处理时，目标自动提取和识别就显得特别重要'},
        ]

      }
    },

  }

</script>

<style scoped>
  .try{
    margin-top: 100px;
  }
  .row p{
    color: #6d6d6d;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;
    margin: 0;
    text-align: left;
    text-align: left;
  }
  .row h4{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:1;
    overflow: hidden;
  }
  .row img{
    width: 100%;
    height: 255px;
  }


</style>

