<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-2">
          <span class="italic">Willkommen im</span> C&C Co-working space!
        </h1>
      </v-col>
    </v-row>

    <template v-if="step === 0">
      <v-row>
        <v-col sm="12" md="5">
          <h2 class="">Wann willst du bei uns arbeiten?</h2>
          <p>Wähle einen Tag, an dem du bei uns arbeiten willst.</p>
        </v-col>

        <v-col>
          <div class="d-flex justify-center" v-if="step === 0">
            <v-date-picker
              v-model="date"
              :min="today"
              justify="center"
            ></v-date-picker>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-if="step === 1">
      <v-row>
        <v-col>
          <h2>Um wie viel Uhr soll es losgehen?</h2>
          <p>Wähle eine Uhrzeit, an der du anfangen möchtest.</p>
        </v-col>
        <v-col>
          <div class="d-flex justify-center">
            <v-time-picker
              v-model="timeStart"
              format="24hr"
              scrollable
            ></v-time-picker>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-if="step === 2">
      <v-row>
        <v-col>
          <h2>Bis wann willst du bei uns bleiben?</h2>
          <p>Wähle die Uhrzeit, an der du vor hast zu gehen.</p>
        </v-col>
        <v-col>
          <div class="d-flex justify-center">
            <v-time-picker
              v-model="timeEnd"
              :min="timeStart"
              format="24hr"
              scrollable
            ></v-time-picker>
          </div>
        </v-col>
      </v-row>
    </template>

    <v-row justify="end">
      <v-btn color="primary" @click="next">Weiter</v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data(vm) {
    return {
      step: 0,
      date: vm.today,
      timeStart: '',
      timeEnd: '',
    }
  },
  computed: {
    today() {
      return new Date().toISOString().substring(0, 10)
    },
  },
  methods: {
    next() {
      if (this.step >= 2) {
        this.$store.commit('query/setQuery', {
          date: this.date,
          timeStart: this.timeStart,
          timeEnd: this.timeEnd,
        })
        this.$router.push({
          path: '/filter',
        })
      } else {
        this.step++
      }
    },
    submit() {},
  },
  watch: {
    timeStart() {
      this.timeEnd = this.timeStart
    },
  },
}
</script>

<style>
.avoid-clicks {
  pointer-events: none;
}
</style>
