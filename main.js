import App from './App'
// import './css/iconfont.css'

// #ifndef VUE3
import Vue from 'vue'
// import { createPinia } from 'pinia'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
// app.use(createPinia())
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import  uviewPlus from '@/uni_modules/uview-plus'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(uviewPlus)
  // app.use(ElementPlus)
  return {
    app,
	Pinia
  }
}
// #endif