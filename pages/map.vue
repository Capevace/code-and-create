<template>
  <v-container v-if="places">
    <v-card v-if="selectedPlace" small class="place-info" max-width="250">
      <v-img height="150" src="http://localhost:3000/place1.jpg"></v-img>

      <v-card-title class="pb-0">
        Platz: {{ selectedPlace.id }}
        <v-spacer />
        <v-chip
          small
          :color="selectedPlace.available ? 'green' : 'red'"
          text-color="white"
        >
          {{ selectedPlace.available ? 'Verfügbar' : 'Nicht verfügbar' }}
        </v-chip>
      </v-card-title>
      <v-card-text>
        <div class="text-subtitle-1 mb-2">
          {{ query.timeStart }} - {{ query.timeEnd }}
        </div>

        <v-chip small v-for="prop in selectedPlace.properties" :key="prop">
          {{ prop }}
        </v-chip>
        <v-chip small>test</v-chip>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn
          right
          color="primary"
          @click="book"
          :disabled="!selectedPlace.available"
          >Platz buchen</v-btn
        >
      </v-card-actions>
    </v-card>
    <LazyMap
      :places="places"
      :selected-place="selectedPlace ? selectedPlace.id : null"
      @select="onPlaceSelected"
    />
  </v-container>
</template>
<script>
// import Map from '../components/Map'
import placePositions from '../data/place-data'

export default {
  data() {
    return {
      selectedPlace: null,
    }
  },
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
  computed: {
    query() {
      return this.$store.state.query.query
    },
    places() {
      return placePositions
        .map((place) => {
          return {
            ...place,

            available: this.available.hasOwnProperty(place.id),
          }
        })
        .reduce((placeObj, place) => {
          placeObj[place.id] = place
          return placeObj
        }, {})
    },
    available() {
      return Object.values(
        this.$store.state.map.places || [
          {
            id: 21,
            properties: [],
            disabled: false,
            bookable: true,
            booked: [],
          },
          {
            id: 20,
            properties: [],
            disabled: false,
            bookable: true,
            booked: [],
          },
          {
            id: 19,
            properties: [],
            disabled: false,
            bookable: true,
            booked: [],
          },
        ]
      ).reduce((placeObj, place) => {
        placeObj[place.id] = place
        return placeObj
      }, {})
    },
  },
  methods: {
    onPlaceSelected(placeId) {
      console.log(this.places, placeId, this.places[placeId])
      this.selectedPlace = this.places[placeId]
    },
    book() {
      this.$store.commit('booking/createBooking', {
        place: this.selectedPlace,
        date: this.query.date,
        timeStart: this.query.timeStart,
        timeEnd: this.query.timeEnd,
        user: null,
      })

      const user = false
      this.$router.push({
        path: user ? '/confirmation' : '/login',
      })
    },
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
