<template>
    <v-hover v-slot="{ hover }">
        <v-card
        class="mx-auto"
        color="grey lighten-4"
        max-width="600"
        >
        <v-img
            :aspect-ratio="16/9"
            src="https://cdn.vuetifyjs.com/images/cards/kitchen.png" 
        >
        <!-- Bild der Buchung hinzufügen -->
        </v-img>
        <v-card-text
            class="pt-6"
            style="position: relative;"
            >
            <v-btn
            absolute
            color="orange"
            class="white--text"
            fab
            large
            right
            top>
            <v-icon>mdi-cart</v-icon>
            </v-btn>

            <div class="font-weight-light grey--text text-h6 mb-2">
            Buchung
            </div>

            <v-row
            align="center"
            class="mx-0">
            <h3 class="text-h4 font-weight-light orange--text mb-2">
            Datum: ... | Zeit: ...
            <!-- <a @click="selectDate"> Edit</a> -->
            </h3>
            </v-row>

            <v-row
            class="mx-0">
            <h3 class="text-h4 font-weight-light orange--text mb-2">
            Platz:... 
            <!-- <a @click="selectPlace"> Edit</a> -->
            </h3>
            </v-row>

            <v-row
            class="font-weight-light grey--text text-h6 mx-0"
            >
            Vorname Nachname
            </v-row>
            <v-row
            class="font-weight-light grey--text text-h6 mx-0">
            Email Adresse 
            </v-row>
            
            <v-btn
            color="orange"
            class = "mx-10"
            elevation="2"
            outlined
            x-large
            absolute
            large
            > Zurück
            </v-btn>

            <v-btn
            color="orange"
            elevation="2"
            outlined
            x-large
            absolute
            large
            right
            > Buchen
            </v-btn>
        </v-card-text>
        </v-card>
  </v-hover>
</template>

// <script>
// import RegisterDialog from "../components/RegisterDialog.vue";

// export default {
//     components: {
//         RegisterDialog
//         },
//     data: () => ({
//         showDialog: false
//         }),
//     methods: {
//         selectDate() {
            
//         },
//         selectPlace(){

//         }
// }
// </script>