import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/assets/styles/common.less'

// import Vant from 'vant'
// import 'vant/lib/index.css'
// // 插件安装初始化：将所有组件导入
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
