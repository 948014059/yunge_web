<template>
  <!-- 模态框 -->
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <!-- 模态框头部 -->
              <div class="modal-header">
                <h4 class="modal-title">
                  请关注公众号获取秘钥
                </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>

              <!-- 模态框主体 -->
              <div class="modal-body">
                <img src="../assets/zbar.jpg" alt="">
                <p>关注公众号，回复"在线体验"获得秘钥</p>
              </div>

              <!-- 模态框底部 -->
              <div class="modal-footer">

                <div class="input-group mb-3" >
                  <div class="input-group-prepend">
                    <span class="input-group-text">key</span>
                  </div>
                  <input type="text" class="form-control" placeholder="请输入秘钥" id="usr" name="username">
                </div>

                <button type="button" class="btn btn-success"
                        @click="gotolink"
                        data-dismiss="modal" >确定</button>
              </div>

            </div>
          </div>
        </div>
</template>

<script>
  export default {
    name: 'modal',
    data(){
      return{

      }
    },
    methods:{
      gotolink(){
        // this.$router.replace('http://www.baidu.com')
        window.open('http://aistudio.smartyg.com:4000')
      }
    }
  }
</script>

<style scoped>
.modal-title{
  font-size: 20px;
}
  .modal-body img{
    width: 60%;
    height: 60%;
  }
  .modal-body p{
    color: blue;
  }
  .modal-footer{
    width: 100%;
    height: 100%;
  }
  .modal-footer button{
    width: 20%;
    margin-bottom: 20px;
  }
  .modal-dialog{
    z-index: 999;
  }
</style>
