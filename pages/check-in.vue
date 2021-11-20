<template>
  <v-card class="mx-auto" max-width="450" height="350">
    <v-card-title>
      <div class="text-h1 mb-2">Buchung</div>
      <div class="text-h6 font-weight-regular grey--text mt-4">
        Datum und Uhrzeit der Buchung
      </div>
    </v-card-title>
    <v-row class="text-h4 font-weight-regular grey--text mx-4" align="center">
      Sitzplatz oder Raum...
    </v-row>

    <v-divider class="mt-10 mx-4"></v-divider>

    <v-card-text>
      <v-row justify="center">
        <v-btn class="text-h4 mt-8 mr-2" color="green" center @click="CheckIN">
          <v-icon left> mdi-alarm-check </v-icon>
          Check-IN
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>
