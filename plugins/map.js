import Vue from 'vue'
import svgPanZoom from 'svg-pan-zoom'

Vue.use({
  install(Vue, options) {
    Vue.svgPanZoom = svgPanZoom
  },
})
