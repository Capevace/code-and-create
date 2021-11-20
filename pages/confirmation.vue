<template>
  <v-hover v-slot="{ hover }" v-if="booking">
    <v-card class="mx-auto" color="grey lighten-4" max-width="600">
      <v-img
        class="white--text align-end"
        :aspect-ratio="16 / 9"
        src="http://localhost:3000/place2.jpg"
      >
        <!-- Bild der Buchung hinzufügen -->
        <v-card-title>Buchung – Platz: {{ booking.place.id }}</v-card-title>
      </v-img>

      <v-card-text class="pt-6" style="position: relative">
        <v-btn absolute color="orange" class="white--text" fab large right top>
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-row>
          <v-col>
            <h3 class="text-h4 font-weight-normal orange--text mb-4">
              Platz: {{ booking.place.id }}
              <!-- <a @click="selectDate"> Edit</a> -->
            </h3>
            <h3 class="text-h5 font-weight-light orange--text mb-2">
              {{ booking.date | simpleDate }}
              <!-- <a @click="selectPlace"> Edit</a> -->
            </h3>

            <h3 class="text-h5 font-weight-light orange--text mb-2">
              {{ booking.timeStart }} - {{ booking.timeEnd }} Uhr

              <!-- <a @click="selectPlace"> Edit</a> -->
            </h3>
          </v-col>
          <v-col class="pt-10">
            <v-row class="font-weight-light grey--text text-h6 mx-0">
              Vorname Nachname
            </v-row>
            <v-row class="font-weight-light grey--text text-h6 mx-0">
              Email Adresse
            </v-row>

            <v-row class="px-3 mt-7" justify="space-between">
              <v-btn
                color="orange"
                elevation="2"
                outlined
                @click="$router.push('/map')"
              >
                Zurück
              </v-btn>

              <v-btn color="primary" elevation="2" right @click="bookNow">
                Buchen
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

//
<script>
import RegisterDialog from '../components/RegisterDialog.vue'

export default {
  components: {
    RegisterDialog,
  },
  computed: {
    booking() {
      return this.$store.state.booking.booking || null
    },
  },
  data: () => ({
    showDialog: false,
    loading: false,
  }),
  filters: {
    simpleDate(d) {
      return new Date(d).toLocaleDateString()
    },
  },
  methods: {
    selectDate() {},
    selectPlace() {},
    async bookNow() {
      this.loading = true
      try {
        const from = new Date(
          `${this.booking.date} ${this.booking.timeStart}`
        ).getTime()
        const to = new Date(
          `${this.booking.date} ${this.booking.timeStart}`
        ).getTime()

        const { id } = await this.$axios.$post('book', {
          room,
          tableId: this.booking.place.id,
          from,
          to,
          user: this.booking.user.username,
        })

        this.$router.push({
          path: `/check-in/${id}`,
        })
      } catch (e) {
        this.error = e.message
        // TODO: alerts are ugly
        // alert(e.message)
      }

      this.loading = false
    },
  },
}
</script>
