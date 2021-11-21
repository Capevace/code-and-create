<template>
  <v-row class="mt-5">
    <v-col>
      <v-card class="mx-auto p-4" max-width="400" height="260">
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="email" type="email" label="E-Mail" required />

          <v-text-field
            v-model="password"
            type="password"
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
        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-card class="mx-auto" max-width="400" height="330">
        <v-card-title>
          <span class="text-h5">Gast-Zugang</span>
        </v-card-title>

        <v-card-text>
          <form @submit.prevent="submit">
            <v-text-field
              v-model="guest.name"
              label="Name"
              required
            ></v-text-field>

            <v-text-field label="Telefonnummer" required></v-text-field>

            <v-text-field
              v-model="guest.email"
              label="E-Mail"
              required
            ></v-text-field>

            <v-row justify="end" class="mt-1 px-4">
              <v-btn @click="continueGuest"> Weiter </v-btn>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-col>

    <RegisterDialog
      :show="showDialog"
      @close="closeDialog"
      @submit="submitRegister"
      :loading="registerLoading"
    />
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
    loginLoading: false,
    registerLoading: false,
    email: '',
    password: '',
    guest: {
      name: '',
      email: '',
    },
  }),
  methods: {
    async login() {
      this.loginLoading = true

      try {
        const { user } = await this.$axios.$post(`/api/login`, {
          mail: this.email,
          password: this.password,
        })

        this.$store.commit('auth/setUser', {
          email: this.email,
          name: 'Max Mustermann',
        })

        this.$router.push({
          path: '/confirmation',
        })
      } catch (e) {
        alert(e.message)
      }

      this.loginLoading = false
    },
    register() {
      this.showDialog = true
    },
    async submitRegister({ name, email, password, age }) {
      this.registerLoading = true

      try {
        const { user } = await this.$axios.$post(`/api/register`, {
          name,
          mail: email,
          password,
          age,
        })

        this.$store.commit('auth/setUser', {
          email: this.email,
          name: 'Max Mustermann',
        })

        this.showDialog = false

        this.$router.push({
          path: '/confirmation',
        })
      } catch (e) {
        alert(e.message)
      }

      this.registerLoading = false
    },
    closeDialog() {
      this.showDialog = false
    },

    continueGuest() {
      this.$store.commit('auth/setUser', {
        email: this.guest.email,
        name: this.guest.name,
      })
      this.$router.push({
        path: '/confirmation',
      })
    },
  },
}
</script>
