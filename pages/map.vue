<template>
  <v-container v-if="places">
    <div class="place-info">
      <v-card class="mb-5 pa-5" max-width="350">
        <v-row>
          <v-col sm="6">
            <p class="mb-0">Am</p>
            <h3>{{ query.date | simpleDate }}</h3>
          </v-col>

          <v-col sm="6">
            <p class="mb-0">Zeit</p>
            <h3>{{ query.timeStart }} - {{ query.timeEnd }}</h3>
          </v-col>

          <v-col sm="12">
            <p class="mb-0">Besonderheiten</p>
            <div>
              <v-chip
                class="mr-1"
                small
                v-for="activeFeature in query.features"
                :key="featureList[activeFeature]"
              >
                {{ featureList[activeFeature] }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-if="selectedPlace" small max-width="250">
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

          <v-chip
            class="mb-2 mr-1"
            small
            v-for="prop in selectedPlace.properties"
            :key="prop"
          >
            {{ prop }}
          </v-chip>
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
    </div>

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
import featureList from '../data/feature-list'

export default {
  data(vm) {
    const available = this.$store.state.map.places || []
    const random = Math.floor(Math.random() * available.length)

    console.log(available[random])
    return {
      selectedPlace: {
        ...placePositions.find((place) => place.id === available[random]),
        available: true,
      },
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
  filters: {
    simpleDate(d) {
      return new Date(d).toLocaleDateString()
    },
  },
  computed: {
    featureList() {
      return featureList
    },
    query() {
      return this.$store.state.query.query
    },
    places() {
      return placePositions
        .map((place) => {
          return {
            ...place,

            available: this.available.includes(place.id),
          }
        })
        .reduce((placeObj, place) => {
          placeObj[place.id] = place
          return placeObj
        }, {})
    },
    available() {
      return this.$store.state.map.places || [21, 20, 19, 18, 17]
    },
  },
  methods: {
    onPlaceSelected(placeId) {
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

      const user = this.$store.state.auth.user
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
