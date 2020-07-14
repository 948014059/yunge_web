<template>
    <div class="gossip">

    <div class="shadow p-3 mb-5 bg-white rounded">
      <div class="row gossip_box">
<!--        聊天框左侧-->
        <div class="gossip_left"></div>
<!--        聊天框中间区域-->
        <div class="gossip_center"></div>
<!--        聊天框内容-->
        <div class="gossip_right">
<!--          显示聊天内容-->
          <div class="message_show">
            <div class="gossip_name">
              <h4>正在与您聊天...</h4>
            </div>
            <div class="show_">

            </div>


          </div>
<!--          写入聊天数据-->
          <div class="send_message">
            <div class="tip">
            </div>
            <textarea type="text" class="message"/>
          </div>
          <button class="btn btn-success send">发送</button>
        </div>
      </div>

    </div>



    </div>
</template>

<script>
  export default {
    name: 'Gossip'
  }
</script>

<style scoped>
.gossip{
  margin-top: 100px;
}
  .gossip_box{
    width: 100%;
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
  .gossip_center{
    flex: 3;
    max-width: 250px;
    background-color: #ebe9e8;
  }
  .gossip_right{
    flex: 7;
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
    line-height: 50px;
    float: left;
    margin-left: 40px;
  }

  .send_message{
    width: 100%;
    height: 200px;
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
  .show_{
    width: 100%;
    height: 450px;
    /*background-color: #2196f3;*/
  }

  .message{
    width: 100%;
    height: 170px;
    border: none;
    outline-style: none;
    font-size: 20px;
    resize: none;
  }
</style>
