import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jQuery from 'jquery'
import {fireb} from './firebase'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)


window.$ = window.jQuery = jQuery;

import 'popper.js'
import 'bootstrap'
import './assets/app.scss'

import Swal from 'sweetalert2'

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;

Vue.component('Navbar', require('./components/Navbar.vue').default);


Vue.config.productionTip = false;

let app = '';

fireb.auth().onAuthStateChanged(function(user) {
  if(!app){
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});