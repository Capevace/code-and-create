<template>
  <svg
    ref="map"
    class="space-svg"
    width="657px"
    height="390px"
    viewBox="0 0 657 390"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
    <g
      id="space"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="rooms"
        transform="translate(393.000000, 0.000000)"
        fill="#D8D8D8"
        stroke="#979797"
      >
        <rect
          id="space-room-2"
          x="0.5"
          y="210.5"
          width="263"
          height="179"
        ></rect>
        <rect id="space-room-1" x="0.5" y="0.5" width="263" height="209"></rect>
      </g>
      <g id="tables" transform="translate(38.000000, 44.000000)" fill="#EFEFEF">
        <rect
          id="space-table-1"
          x="0"
          y="0"
          width="138"
          height="51"
          rx="8"
        ></rect>
      </g>
      <g id="places" transform="translate(57.000000, 34.000000)">
        <circle id="space-p-6" fill="#F14F4F" cx="10" cy="10" r="10"></circle>

        <circle
          @click="test"
          id="space-p-5"
          stroke="#979797"
          fill="#D8D8D8"
          cx="50"
          cy="10"
          r="10"
        ></circle>
        <circle
          id="space-p-4"
          stroke="#979797"
          fill="#D8D8D8"
          cx="90"
          cy="10"
          r="10"
        ></circle>
        <circle
          id="space-p-3"
          stroke="#979797"
          fill="#D8D8D8"
          cx="10"
          cy="60"
          r="10"
        ></circle>
        <circle
          id="space-p-2"
          stroke="#979797"
          fill="#D8D8D8"
          cx="50"
          cy="60"
          r="10"
        ></circle>
        <circle
          id="space-p-1"
          stroke="#979797"
          fill="#D8D8D8"
          cx="90"
          cy="60"
          r="10"
        ></circle>
      </g>
    </g>
  </svg>
</template>
<script>
import Vue from 'vue'

export default {
  mounted() {
    if (Vue.svgPanZoom) {
    }
    // if (process.client) {
    //   await import('../static/svg-pan-zoom')
    //   setInterval(() => console.log(window.svgPanZoom), 1000)
    // }
    Vue.svgPanZoom(this.$refs.map)
  },
  methods: {
    test() {
      alert('hi')
    },
  },
}
</script>
<style>
.space-svg {
  width: 100%;
  height: 100vh;
}
.space-svg circle:hover {
  fill: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
