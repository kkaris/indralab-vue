import Vue from 'vue'
import App from './App.vue'
import install from './index'

// Install all components
install(Vue)

// Set up Vue prototype properties that components may expect
// For development, you can point this to your local API or a mock server
Vue.prototype.$agent_url = process.env.VUE_APP_AGENT_URL || 'http://localhost:5000/api/statements/query/agents'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
