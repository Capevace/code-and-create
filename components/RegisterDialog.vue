<template>
     <v-dialog
      v-model="show"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Nutzer Profil</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Vorname*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Nachname*"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Passwort*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              </v-row>
            <v-row>
              <v-col
                sm="2"
              >
                <v-text-field
                  label="Alter*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
          >
            Schließen
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close')"
          >
            Sichern & Weiter
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
            default: false
        }
    }
}
</script>