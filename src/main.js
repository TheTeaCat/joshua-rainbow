// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/reset.css'
import '~/assets/scss/_vars.scss'
import '~/assets/scss/styles.scss'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

export default function (Vue, { router, head, isClient }) {
  head.link.push({
    rel:"stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
  })
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
