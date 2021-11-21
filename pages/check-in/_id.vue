<template>
  <v-card class="mx-auto" max-width="450" height="350">
    <v-card-title>
      <div class="mb-2">Buchung</div>
    </v-card-title>
    <v-row class="text-h4 font-weight-regular grey--text mx-4" align="center">
      Platz: {{ booking.placeId }}

      <div class="text-h6 font-weight-regular grey--text mt-4">
        {{ date }}<br />{{ timeStart }} - {{ timeEnd }}
      </div>
    </v-row>

    <v-divider class="mt-10 mx-4"></v-divider>

    <v-card-text>
      <v-row justify="center">
        <v-btn
          class="mt-8 mr-2"
          color="green"
          center
          @click="checkIn"
          v-if="!booking.checkedIn"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left> mdi-alarm-check </v-icon>
          Check-In
        </v-btn>

        <!-- <v-row justify="space-between" v-if="booking.checkedIn">
          
        </v-row> -->
        <v-btn
          class="mt-8 mr-2"
          @click="renew"
          left
          v-if="booking.checkedIn"
          :loading="loading"
          :disabled="loading"
        >
          Verlängern
        </v-btn>

        <v-btn
          class="mt-8 mr-2"
          color="red"
          v-if="booking.checkedIn"
          @click="checkOut"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left> mdi-alarm-check </v-icon>
          Check-Out
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  async asyncData(context) {
    /**
     * @typedef Booking
     * @type {object}
     * @property {number} id
     * @property {number} tableId
     * @property {number} roomId
     * @property {number} from
     * @property {number} to
     * @property {string} by
     * @property {boolean} checkedIn
     */
    const id = parseInt(context.route.params.id) - 1
    const {
      from,
      to,
      by,
      checkedIn,
      tableId: placeId,
    } = await context.$axios.$get('api/book/' + id)

    return {
      loading: false,
      booking: {
        from,
        to,
        by,
        checkedIn,
        placeId,
        id,
      },
    }
  },

  computed: {
    date() {
      return new Date(this.booking.from).toLocaleDateString()
    },
    timeStart() {
      return new Date(this.booking.from).toLocaleTimeString()
    },
    timeEnd() {
      return new Date(this.booking.to).toLocaleTimeString()
    },
  },

  methods: {
    async checkIn() {
      this.loading = true
      try {
        await this.$axios.$post(`/api/check-in/`, {
          id: this.booking.id,
        })

        this.booking.checkedIn = true
      } catch (e) {
        // TODO: alerts are ugly
        alert(e.message)
      }

      this.loading = false
    },

    async checkOut() {
      this.loading = true
      try {
        await this.$axios.$post(`/api/check-out/`, {
          id: this.booking.id,
        })

        this.booking.checkedIn = false
        this.$router.push('/')
      } catch (e) {
        // TODO: alerts are ugly
        alert(e.message)
      }

      this.loading = false
    },

    async renew() {
      this.loading = true
      try {
        const time = prompt('Wie lange willst du bleiben (in Stunden)?')

        if (!time) {
          return
        }

        const to = this.booking.to + parseInt(time) * 60 * 60 * 1000

        await this.$axios.$post(`/api/renew/`, {
          id: this.booking.id,
          to,
        })

        this.booking.to = to
      } catch (e) {
        // TODO: alerts are ugly
        alert(e.message)
      }

      this.loading = false
    },
  },
}
</script>
