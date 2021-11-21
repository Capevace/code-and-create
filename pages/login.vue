<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" max-width="400" height="260">
        <v-card-title>
          <span class="text-h5">LOGIN</span>
        </v-card-title>

        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        />

        <v-text-field
          v-model="Passwort"
          :error-messages="errors"
          label="Passwort"
          required
        />
        <div class="d-flex justify-between">
          <p class="block flex-grow-1 mx-3">
            Du bist neu?
            <a @click="register"> Registrieren</a>
          </p>
          <v-btn class="flex-grow-0 mx-4" @click="login"> Anmelden </v-btn>

          <!-- <v-row>
                <p class="block flex-grow-1 mx-3 "> 
                <a @click="login"> Passwort vergessen? </a>
                </p>
            </v-row> -->
        </div>
      </v-card>
    </v-col>

    <v-col>
      <v-card class="mx-auto" max-width="400" height="330">
        <v-card-title>
          <span class="text-h5">Gast - Zugang</span>
        </v-card-title>

        <form @submit.prevent="submit">
          <v-text-field
            v-model="name"
            :error-messages="errors"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="phoneNumber"
            :error-messages="errors"
            label="Phone Number"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            required
          ></v-text-field>

          <v-btn class="mr-4 mx-4" type="Reset" :disabled="invalid">
            Löschen
          </v-btn>
          <v-btn @click="Weiter"> Weiter </v-btn>
        </form>
      </v-card>
    </v-col>

    <RegisterDialog :show="showDialog" @close="closeDialog" />
  </v-row>
</template>
<script>
import RegisterDialog from '../components/RegisterDialog.vue'

export default {
  components: {
    RegisterDialog,
  },
  data: () => ({
    showDialog: false,
  }),
  methods: {
    login() {
      alert('Wir haben ein neues Passwort an deine Email versendet.')
    },
    register() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
  },
}
</script>
