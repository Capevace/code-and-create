<template>
  <v-container v-if="this.$store.state.query.query">
    <v-row>
      <v-col>
        <v-card elevation="4" class="mb-5 pa-5">
          <v-row>
            <v-col sm="3">
              <p class="mb-0">Am</p>
              <h3>{{ date }}</h3>
            </v-col>

            <v-col sm="1">
              <p class="mb-0">Von</p>
              <h3>{{ timeStart }}</h3>
            </v-col>

            <v-col sm="1">
              <p class="mb-0">Bis</p>
              <h3>{{ timeEnd }}</h3>
            </v-col>

            <v-col sm="5">
              <p class="mb-0">Besonderheiten</p>
              <div>
                <v-chip
                  class="mr-1"
                  small
                  v-for="activeFeature in features"
                  :key="featureList[activeFeature]"
                >
                  {{ featureList[activeFeature] }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="mb-2">Was für einen Platz möchtest du?</h1>

        <v-chip-group v-model="features" column multiple>
          <v-chip
            filter
            outlined
            large
            :disabled="loading"
            v-for="feature in featureList"
            :key="feature"
          >
            {{ feature }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-btn
        color="primary"
        @click="find"
        :loading="loading"
        :disabled="loading"
        >Finde meinen Platz!</v-btn
      >
    </v-row>

    <v-dialog :value="error" width="500">
      <v-card>
        <v-card-title class="text-h5">
          Ein Problem ist aufgetreten
        </v-card-title>

        <v-card-text>
          {{ error }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="error = null"
            >OK, ich versuch's nochmal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import featureList from '../data/feature-list'

export default {
  data: () => ({
    loading: false,
    error: null,
    features: [],
  }),
  created() {
    if (!this.$store.state.query.query) {
      //   this.$router.push({
      //     path: '/start',
      //   })

      // TODO: remove this
      this.$store.commit('query/setQuery', {
        date: '2021-11-10',
        timeStart: '16:20',
        timeEnd: '16:22',
      })
    }
  },
  computed: {
    featureList() {
      return featureList
    },
    date() {
      return this.$store.state.query.query
        ? this.$store.state.query.query.date
        : null
    },
    timeStart() {
      return this.$store.state.query.query
        ? this.$store.state.query.query.timeStart
        : null
    },

    timeEnd() {
      return this.$store.state.query.query
        ? this.$store.state.query.query.timeEnd
        : null
    },
  },
  methods: {
    async find() {
      this.loading = true
      try {
        const from = new Date(`${this.date} ${this.timeStart}`).getTime()
        const to = new Date(`${this.date} ${this.timeStart}`).getTime()
        const filterQuery = this.features.reduce((query, feature, index) => {
          if (index !== 0) {
            query += '&'
          }

          return query + 'filters[]=' + featureList[feature]
        }, '')

        const { data } = await this.$axios.$get(
          `/api/find?from=${from}&to=${to}&${filterQuery}`
        )

        console.log(data)

        this.$store.commit('map/setPlaces', data)

        this.$router.push({
          path: '/map',
        })
      } catch (e) {
        this.error = e.message
        // TODO: alerts are ugly
        // alert(e.message)
      }

      this.loading = false
    },
  },
  watch: {
    features() {
      this.$store.commit('query/setFeatures', this.features)
    },
  },
}
</script>
