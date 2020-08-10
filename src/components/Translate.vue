<template>
    <div class="tran_box">
      <div class="shadow p-3 mb-5 bg-white rounded" style="background: white">
         <div class="row">

          <div class="col-sm-6 left_china">
            <textarea class="text_china"
            v-model="tran_china"
            @keydown="listen($event)"></textarea>
            <div class="tran_upload btn btn-success" @click="tran_upload">确定</div>
          </div>
           <div class="mobile_" v-if="!this.$store.state.isPc" style="width: 100%;height: 20px"></div>

           <div class="col-sm-6 right_english">{{tran_english}}</div>
         </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'Translate',
    data(){
      return{
          tran_china:'',
          tran_english:''
      }
    },
    mounted () {
    },
    methods:{
      tran_upload(){
        let json_data={'question':this.tran_china,'keys':'5f15a18f3f03f7e88020acb1c2f8c93c'}
          this.$axios({method:'post',
          headers:{ "Content-Type": "application/json;charset=utf-8" },
          url: 'api/post_translate',
          data:json_data,
          }).then(res=>{
            if (res.data.flag=='error'){
              this.tran_english=res.data.msg
            }else {
              this.tran_english=res.data.answay
            }

          })
      },
      listen(e){
        if (e.keyCode===13){
          this.tran_upload()
          e.preventDefault()
          return false
        }
      },
    }
  }
</script>

<style scoped>
  .tran_box{
    margin-top: 100px;
    height: 850px;
  }
  .left_china{
    width: 100%;
    height: 200px;
    /*background-color: #f5f5f5;*/
    position: relative;
  }
  .tran_upload{
    position: absolute;
    right: 25px;
    bottom: 10px;
  }
  .right_english{
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
  }
  .text_china{
    width: 100%;
    height: 100%;
    font-size: 25px;
    /*border: none;*/
    outline-style: none;
    font-size: 20px;
    resize: none;
    padding: 25px;
  }
  .right_english{
    text-align: left;
    /*line-height: 25px;*/
    font-size: 25px;
    padding: 25px;
    max-height: 200px;
    word-break: break-word;
    overflow-x: hidden;
  }

</style>
