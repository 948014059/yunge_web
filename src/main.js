// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from  'axios'
import vueAxios from 'vue-axios'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import  apiconfig from '../config/api.config'
import Vuex from 'vuex'


//条形图
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme)

Vue.use(Vuex)
const store =new Vuex.Store({
  state:{
    isPc:true,
    mobile_title:true
  }
})

//图片放大
Vue.use(Viewer)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

Vue.prototype.$axios=axios
//网络请求
axios.defaults.headers.post["Content-type"] = "application/json"
axios.defaults.baseURL=apiconfig.baseUrl
// axios.defaults.baseURL='/api/'

Vue.config.productionTip = false
Vue.use(vueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
