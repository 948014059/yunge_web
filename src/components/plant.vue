<template>
    <div class="plant" >
      <canvas id="canvas" :width="weight" :height="height"
       disable-scroll="true"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
      @touchstart="canvasDown($event)"
      @touchend="canvasUp($event)"
      @touchmove="canvasMove($event)"></canvas>
    </div>
</template>

<script>
  export default {
    name: 'plant',
    props:['weight','height'],
    data(){
      return{
        context:{},
        imgUrl:[],
        middleAry:[],
        canvasMoveUse:false,
        nextDrawAry:[],
        preDrawAry:[],
        config: {
          lineWidth: 1,
          lineColor: '#ffffff',
          shadowBlur: 4,
          background:'#ff9770'
        }
      }
    },
    created () {
      this.$emit('setNav','dada')
    },
    mounted () {
      const  canvas=document.querySelector('#canvas')
      this.canvas=canvas
      this.context=canvas.getContext('2d')

      this.initDraw()
      this.setCanvasStyle()
    },
    destroyed () {
    },
    computed:{},
    methods:{
      isPc(){
        const  userAgentInfo=navigator.userAgent
        const Agents=['Android','iPhone','SymbianOS','Windows Phone','iPad','iPod']
        let flag=true
        for (let v=0;v<Agents.length;v++){
          if (userAgentInfo.indexOf(Agents[v])>0){
            flag=false
            break
          }
        }
        return flag
      },
      removeImg(src){
        this.imgUrl=this.imgUrl.filter(item=>item!==src)
      },
      initDraw(){
        const  preData=this.context.getImageData(0,0,this.weight,this.height)
        this.middleAry.push(preData)
      },
      canvasMove(e){
        e.preventDefault()
        if (this.canvasMoveUse){
          const t= e.target
          let  canvasX,canvasY
          if (this.isPc()){
              canvasX=e.clientX-canvas.getBoundingClientRect().left
              canvasY=e.clientY-canvas.getBoundingClientRect().top
          } else {
              canvasX=e.changedTouches[0].clientX-canvas.getBoundingClientRect().left
              canvasY=e.changedTouches[0].clientY-canvas.getBoundingClientRect().top
          }
          this.context.lineTo(canvasX,canvasY)
          this.context.stroke()
        }
      },
      beginPath(e){
        const  canvas=document.querySelector('#canvas')
        if (e.target != canvas){
          this.context.beginPath()
        }
      },
      canvasUp(e){
        const preData=this.context.getImageData(0,0,this.weight,this.height)
        if (!this.nextDrawAry.length){
          this.middleAry.push(preData)
        } else {
          this.middleAry=[]
          this.middleAry=this.middleAry.concat(this.preDrawAry)
          this.middleAry.push(preData)
          this.nextDrawAry=[]
        }
        this.canvasMoveUse=false
        const canvas=document.querySelector('#canvas')
        const  src=canvas.toDataURL('image/jpg')
        this.$emit('change_img',src)
      },
      canvasDown(e){
        this.canvasMoveUse=true
        const  canvasX=e.clientX-canvas.getBoundingClientRect().left
        const  canvasY=e.clientY-canvas.getBoundingClientRect().top

        this.setCanvasStyle()
        this.context.beginPath()
        console.log(this.context.beginPath())
        this.context.moveTo(canvasX,canvasY)

        const preData=this.context.getImageData(0,0,this.weight,this.height)
        this.preDrawAry.push(preData)
      },
      canvasclear(){
        this.getImage()
        this.context.clearRect(0,0,this.weight,this.height)
        this.preDrawAry=[]
        this.nextDrawAry=[]
        this.middleAry=[this.middleAry[0]]
        return this.imgUrl
      },
      getImage(){
        const canvas=document.querySelector('#canvas')
        const  src=canvas.toDataURL('image/jpg')
        this.imgUrl.push(src)
      },
      setCanvasStyle(){
        this.context.lineWidth = this.config.lineWidth
        this.context.shadowBlur = this.config.shadowBlur
        this.context.shadowColor = this.config.lineColor
        this.context.strokeStyle = this.config.lineColor
        this.context.fillStyle=this.config.background
      }
    }

  }



</script>

<style scoped>
.plant{
  /*width: 280px;*/
  /*height: 280px;*/
  background: #000000;
  margin: 0;
  padding: ;
  /*margin: 0 auto;*/
}
</style>
