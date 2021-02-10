<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container>
        WebSDK PoC - Pano video demo.
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>

    <v-footer padless>
      <v-row justify="center" no-gutters>
        <v-col class="secondary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Pixellot WebSDK</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import { version } from '@/package.json'

  export default {
    data () {
      return { version }
    }
  }
</script>
