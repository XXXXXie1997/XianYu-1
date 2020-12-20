import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 10000);
  },0)
};


if(document.documentElement.clientWidth>500){
  window.alert('使用手机打开本页面已获得最佳体验（点击任意位置关闭二维码）')
  const img = document.createElement('img')
  const div = document.createElement('div')
  img.src = 'https://s1.ax1x.com/2020/09/03/wCc2ex.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'scale(50%) translate(-100%,-100%)'
  document.body.appendChild(div)
  div.appendChild(img)
  document.body.onclick= function close() {
document.body.querySelector("img")
    img.remove()
  }

}