<template>
    <div class="book_box" >
      <div class="container">
        <h1>高校人工智能互动读本</h1>
        <hr style="margin-top: 0">
      <div class="row">
        <div class="col-sm"  v-for="item in gz_books" >
          <div class="book_ " style="float: left" @click="link_to(item.link)">
            <div class="container group" >
            <a class="book-container">
                <div class="book">
                    <div class="book-cover">
                        <!-- 书的正面图 -->
                        <img :src="item.top_url" alt="" />
                    </div>
                    <div class="book-spine" :style=" 'background:url('+item.left_url+')-25px 0 no-repeat; background-size: auto 100%;'" >
<!--                    <div class="book-spine">-->
                        <h3>{{item.name}}</h3>
                    </div>
                </div>
            </a>
        </div>
        <div style="text-align:center;clear:both"><br></div>
        </div>
      </div>
      </div>
        <br>
        <br>
    <h1>中小学人工智能互动读本</h1>
        <hr style="margin-top: 0">
        <div class="row">
        <div class="col-sm"  v-for="item in zxx_books" >
          <div class="book_ " style="float: left">
            <div class="container group" >
            <a class="book-container">
                <div class="book">
                    <div class="book-cover">
                        <!-- 书的正面图 -->
                        <img :src="item.top_url" alt="" />
                    </div>
                    <div class="book-spine" :style=" 'background:url('+item.left_url+')-25px 0 no-repeat; background-size: auto 100%;'" >
<!--                    <div class="book-spine">-->
                        <h3>{{item.name}}</h3>
                    </div>
                </div>
            </a>
        </div>
        <div style="text-align:center;clear:both"><br></div>
        </div>
      </div>
      </div>



    </div>
    </div>
</template>

<script>
  export default {
    name: 'AI_Book',
    data(){
      return{
        gz_books:[
          {name:'',top_url:require('../assets/dl.png'),left_url:require('../assets/dl_left.png'),link:'http://aistudio.smartyg.com:8742/'},
          {name:'',top_url:require('../assets/ai_intr.png'),left_url:require('../assets/ai_intr_left.png'),link:'http://aistudio.smartyg.com:8743/'},
          {name:'敬请期待',top_url:require('../assets/nlp.png'),left_url:require('../assets/nlp_left.png'),link:''},
        ],
        zxx_books:[
          {name:'敬请期待',top_url:require('../assets/jqqd.png'),left_url:require('../assets/jqqd_left.png'),link:''},
          // {name:'深度学习入门',top_url:require('../assets/book1.jpg'),left_url:require('../assets/book2.jpg')},
          // {name:'深度学习入门',top_url:require('../assets/book1.jpg'),left_url:require('../assets/book2.jpg')},
        ]

      }
    },
    methods:{
      link_to(link){
        if (link != ''){
          window.open(link)
        }

      }
    }

  }
</script>

<style scoped>
  .book_box{
    margin-top: 80px;
    min-height: 850px;
  }
  h1{
    text-align: left;
    font-size: 25px;
  }

.group:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

* html .group {
    height: 1%;
}

*:first-child+html .group {
    min-height: 1px;
}

body {
    line-height: 1.9em;
    color: #fff;
    background-color: #0b3065;
    background-size: cover;
    font-family: arial,
        sans-serif;
}

.container {
    max-width: 60em;
    margin: 0 auto;
    padding: 0 2em;
}


a {
    color: #da9803;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}


p {
    margin-bottom: 1em;
    font-size: 1.25em;
}

hr {
    margin: 2em 0;
}

.book-container {
    width: 200px;
    margin: 0 auto;
    display: block;
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    perspective: 1200px;
}

.book {
    z-index: 5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    -webkit-transition: 0.75s;
    -moz-transition: 0.75s;
    transition: 0.75s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-origin: 125px 0;
    -moz-transform-origin: 125px 0;
    transform-origin: 125px 0;
}

.book:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 3px;
    width: 7px;
    /* 翻页转角处的图片 */
    background: url(../assets/book3.png) repeat-y;
    z-index: 20;
    -webkit-transform: translateZ(1px);
}

.book:hover {
    -webkit-transform: translateX(-10px) translateZ(25px) translateX(35px) rotateY(45deg);
    -moz-transform: translateX(-10px) translateZ(25px) translateX(35px) rotateY(45deg);
    transform: translateX(-10px) translateZ(25px) translateX(35px) rotateY(45deg);
}

.book-cover {
    position: relative;
    z-index: 10;
}

.book-cover img {
    vertical-align: bottom;
    max-width: 100%;
    height: auto;
}

.book-spine {
    position: absolute;
    color: #fff;
    position: absolute;
    bottom: 0;
    top: 0;
    width: 29px;
    z-index: 5;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    /* 书的侧面图片 */
    /*background: url(../assets/book2.jpg) -25px  no-repeat;*/
    /*background-size: auto 100%;*/
    -webkit-transform: rotateY(-90deg) translateX(-28px);
    -moz-transform: rotateY(-90deg) translateX(-28px);
    transform: rotateY(-90deg) translateX(-28px);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    transform-origin: 0 0;
}

.book-spine h3 {
    display: block;
    width: 300px;
    text-align: left;
    color: #fff;
    position: absolute;
    top: 0;
    left: 25px;
    text-align: center;
    /*text-indent: 5px;*/
    text-transform: uppercase;
    font-family: "league_gothic_condensedRg", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1em;
    opacity: 0.75;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
    -webkit-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    transform-origin: 0 0;
}

.book-spine:before {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3)
}


</style>
