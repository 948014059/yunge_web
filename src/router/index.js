import Vue from 'vue'
import Router from 'vue-router'
const routerOptions = [
  // { path: '/', component: 'Home' },
  { path: '/', component: 'EC' },
  { path: '*', component: 'NotFound' },
  { path:'/mnist',component:'MNIST'},
  { path:'/yolov3',component:'YOLO3'},
  { path:'/face',component:'FACE_'},
  { path:'/image_net',component: 'IMAGENET'},
  { path:'/quick_draw',component:'QUICKDRAW'},
  { path:'/catVsdog', component:'CatVsDog'},
  { path:'/Poetry_gan',component:'PoetryGan'},
]


const routes = routerOptions.map(route => {
  console.log(route.component)
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`),

  }
})

Vue.use(Router)

export default new Router({
  routes,
  mode: 'history'
})
