<template>
  <svg
    ref="map"
    class="space-svg"
    viewBox="0 0 350 390"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <!-- Generator: Sketch 52.6 (67491) - http://www.bohemiancoding.com/sketch -->
    <g
      id="space"
      stroke="none"
      stroke-width="3"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="tables" transform="translate(40.000000, 45.000000)" fill="#EFEFEF">
        <rect
          id="space-table-1"
          x="0"
          y="122"
          width="138"
          height="51"
          rx="8"
        ></rect>
        <rect
          id="space-table-2"
          x="0"
          y="0"
          width="138"
          height="51"
          rx="8"
        ></rect>
        <rect
          id="space-table-3"
          x="178"
          y="0"
          width="138"
          height="51"
          rx="8"
        ></rect>
        <rect
          id="space-table-4"
          transform="translate(269.000000, 198.000000) rotate(90.000000) translate(-269.000000, -198.000000) "
          x="200"
          y="151"
          width="138"
          height="94"
          rx="8"
        ></rect>
      </g>
      <g id="places" transform="translate(57.000000, 34.000000)">
        <circle
          v-for="place in places"
          :key="place.id"
          :id="`space-p-${place.id}`"
          :fill="place.available ? '#78EA78' : 'rgba(0, 0, 0, 0.2)'"
          :stroke="
            place.id === selectedPlace
              ? place.available
                ? '#438b43'
                : 'rgba(0, 0, 0, 0.4)'
              : 'transparent'
          "
          :cx="place.x"
          :cy="place.y"
          r="10"
          :class="{ active: place.available }"
          @click="selectPlace(place.id)"
        ></circle>
      </g>
    </g>
  </svg>
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    selectedPlace: {
      type: Number,
      default: null,
    },
    places: {
      type: Object,
      default: [],
    },
  },
  mounted() {
    if (Vue.svgPanZoom) {
    }
    // if (process.client) {
    //   await import('../static/svg-pan-zoom')
    //   setInterval(() => console.log(window.svgPanZoom), 1000)
    // }
    // Vue.svgPanZoom(this.$refs.map)
  },
  methods: {
    selectPlace(placeId) {
      this.$emit('select', placeId)
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

.space-svg circle.active:hover {
  fill: #a9d8a9;
}
</style>
