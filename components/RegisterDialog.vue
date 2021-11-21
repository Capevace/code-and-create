<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Registrieren</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Vorname *"
                required
                v-model="firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Nachname " v-model="lastName"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="E-Mail *"
                required
                v-model="email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Passwort *"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="2">
              <v-text-field
                label="Alter *"
                class="no-arrows"
                type="number"
                min="18"
                v-model="age"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6"> </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">
          Schließen
        </v-btn>
        <v-btn color="blue darken-1" text @click="submit">
          Registrieren & Weiter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: null,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        email: this.email,
        password: this.password,
        name: this.firstName + ' ' + this.lastName,
        age: this.age,
      })
    },
  },
}
</script>
<style>
.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.no-arrows[type='number'] {
  -moz-appearance: textfield;
}
</style>
