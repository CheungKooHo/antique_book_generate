/*
 * @Author: Klein
 * @Date: 2025-07-12 01:54:30
 * @LastEditors: Klein
 * @LastEditTime: 2025-07-12 02:25:15
 * @FilePath: /antique_book_generate/src/main.js
 * @Description:
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/fonts/font.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
