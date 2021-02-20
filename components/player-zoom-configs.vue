<template>
  <v-expansion-panels :value="[0]" multiple popout>
    <v-expansion-panel>
      <v-expansion-panel-header>Zoom configuration</v-expansion-panel-header>
      <v-expansion-panel-content>
        <div>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-select
                v-model="playerOptions.configuration.pano.defaultZoom"
                :items="playerOptions.zoomOptions"
                item-text="title"
                item-value="value"
                label="Default zoom level"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-select
                v-model="playerOptions.configuration.pano.minZoom"
                :items="playerOptions.zoomOptions"
                item-text="title"
                item-value="value"
                label="Min zoom"
              />
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-select
                v-model="playerOptions.configuration.pano.maxZoom"
                :items="playerOptions.zoomOptions"
                item-text="title"
                item-value="value"
                label="Max zoom"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-checkbox v-model="playerOptions.configuration.pano.showZoomUI" label="Show zoom on player UI"/>
            </v-col>

          </v-row>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    name: "player-zoom-configs",
    props: {
      playerOptions: {
        type: Object,
        required: true
      }
    }
  }
</script>

