<template>
  <v-container>
    <v-card small class="place-info" max-width="250">
      <v-img
        height="150"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <v-card-title class="pb-0">Platz: A5</v-card-title>
      <v-card-text>
        <div class="text-subtitle-1 mb-2">15:30 - 16:20</div>

        <v-chip small>5:30PM</v-chip>
        <v-chip small>7:30PM</v-chip>
        <v-chip small>8:00PM</v-chip>
        <v-chip small>9:00PM</v-chip>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn right color="primary" @click="reserve"> Reserve </v-btn>
      </v-card-actions>
    </v-card>
    <LazyMap />
  </v-container>
</template>
<script>
// import Map from '../components/Map'

export default {
  created() {
    if (!this.$store.state.map.places) {
      //   this.$router.push({
      //     path: '/start',
      //   })
      // TODO: remove this
      //   this.$store.commit('query/setQuery', {
      //     date: '2021-11-10',
      //     timeStart: '16:20',
      //     timeEnd: '16:22',
      //   })
    }
  },
  components: {
    // Map: () => {
    //   if (process.client) return import('../components/lazy-Map.vue')
    // },
  },
}
</script>

<style>
.place-info {
  position: fixed;
  margin: 10px;
  top: 0;
  left: 0;
}
</style>
