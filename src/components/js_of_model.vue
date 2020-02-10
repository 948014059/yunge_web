<template>
    <div class="model_js">
     <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative mnist_js">
        <div class="col p-4 d-flex flex-column position-static js_mnist">
          <p class="card-text mb-auto" v-html="js_for_model"></p>
        </div>
        <div class="col-auto d-none d-lg-block img_mnist">
          <img :src="img_url" alt="">
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'js_of_model',
    props:['js_for_model','img_url']
  }
</script>

<style scoped>
.mnist_js{
    width: 100%;
    /*height: 100px;*/
    background: white;
    display: flex;
    text-align: center;
  }
  .js_mnist{
    flex: 8;
  }
  .js_mnist p{
    margin: 0 auto;
    /*text-align: center;*/
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    line-height: 40px;
  }
  .img_mnist img{
    width: 100%;
    height: 100%;
  }
  .img_mnist{
    flex: 2;
    min-width: 250px;
    min-height: 100%;
  }
</style>
