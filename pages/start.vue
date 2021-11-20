<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-2">Willkommen im Code&Create Co-working space!</h1>
      </v-col>
    </v-row>

    <template v-if="step === 0 && !loading">
      <v-row>
        <v-col sm="12" md="5">
          <h2 class="">Wann willst du bei uns arbeiten?</h2>
          <p>Wähle einen Tag, an dem du bei uns arbeiten willst.</p>
        </v-col>

        <v-col>
          <div class="d-flex justify-center" v-if="step === 0">
            <v-date-picker v-model="date" justify="center"></v-date-picker>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-if="step === 1 && !loading">
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

    <template v-if="step === 2 && !loading">
      <v-row>
        <v-col>
          <h2>Bis wann willst du bei uns bleiben?</h2>
          <p>Wähle die Uhrzeit, an der du vor hast zu gehen.</p>
        </v-col>
        <v-col>
          <div class="d-flex justify-center">
            <v-time-picker
              v-model="timeEnd"
              format="24hr"
              scrollable
            ></v-time-picker>
          </div>
        </v-col>
      </v-row>
    </template>

    <template v-if="loading">
      <h2>Bis wann willst du bei uns bleiben?</h2>

      <div class="d-flex justify-center">
        <v-time-picker
          v-model="timeEnd"
          format="24hr"
          scrollable
        ></v-time-picker>
      </div>
    </template>

    <v-row justify="end">
      <v-btn color="primary" @click="next">Weiter</v-btn>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      step: 0,
      date: '',
      timeStart: '',
      timeEnd: '',
    }
  },
  methods: {
    next() {
      if (this.step >= 2) {
        this.loading = true
      } else {
        this.step++
      }
    },
    submit() {},
  },
}
</script>

<style>
.avoid-clicks {
  pointer-events: none;
}
</style>
