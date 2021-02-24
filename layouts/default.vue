<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container>
        WebSDK Playground.
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>

    <v-footer class="secondary" padless>
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col class="text-center text-md-left py-4 white--text" cols="12" md="7" sm="12">
            {{ new Date().getFullYear() }} — <strong>Pixellot WebSDK</strong>
          </v-col>
          <v-col class="text-center text-md-right py-4 white--text" cols="12" md="5" sm="12">
            <v-btn href="https://gl-ruslan-honchar.github.io/WebSDK-docs/guide/" target="_blank" color="white" rounded text>
              Developers Docs.v1
            </v-btn>
            <v-btn href="/websdk-pano-demo/docs/index.html" target="_blank" color="white" rounded text>
              Developers Docs.v2
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
