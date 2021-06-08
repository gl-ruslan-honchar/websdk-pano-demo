<template>
  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Title</th>
        <th class="text-left">Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Enabled</td>
        <td class="pt-6">
          <v-switch v-model="config.enabled" label="Enabled"/>
        </td>
      </tr>
      <tr>
        <td>Interaction engine</td>
        <td class="pt-6">
          <v-select
            v-model="config.engine"
            :items="['d3-html', 'd3-canvas']"
            label="Interaction engine"
            solo
          />
        </td>
      </tr>
      <tr>
        <td>Disable pan</td>
        <td>
          <v-switch v-model="config.disablePan" label="Disable pan"/>
        </td>
      </tr>
      <tr>
        <td>Disable zoom</td>
        <td>
          <v-switch v-model="config.disableZoom" label="Disable zoom"/>
        </td>
      </tr>
      <tr>
        <td>Disable X Axis pan</td>
        <td>
          <v-switch v-model="config.disableXAxisPan" label="Disable X Axis pan"/>
        </td>
      </tr>
      <tr>
        <td>Disable Y Axis pan</td>
        <td>
          <v-switch v-model="config.disableYAxisPan" label="Disable Y Axis pan"/>
        </td>
      </tr>
      <tr>
        <td>Default zoom level</td>
        <td class="pt-6">
          <v-select
            v-model="config.defaultZoom"
            :items="playerOptions.zoomOptions"
            item-text="title"
            item-value="value"
            label="Default zoom level"
            solo
          />
        </td>
      </tr>
      <tr>
        <td>Minimum zoom level</td>
        <td class="pt-6">
          <v-select
            v-model="config.minZoom"
            :items="playerOptions.zoomOptions"
            item-text="title"
            item-value="value"
            label="Min zoom"
            solo
          />
        </td>
      </tr>
      <tr>
        <td>Maximum zoom level</td>
        <td class="pt-6">
          <v-select
            v-model="config.maxZoom"
            :items="playerOptions.zoomOptions"
            item-text="title"
            item-value="value"
            label="Max zoom"
            solo
          />
        </td>
      </tr>
      <tr>
        <td>Show zoom on player UI</td>
        <td>
          <v-switch v-model="config.showZoomUI" label="Show zoom on player UI"/>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import playerOptions from "~/assets/playerOptions";

  export default {
    name: "player-interaction-table",
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        playerOptions,
      }
    },
  }
</script>

<style scoped>

</style>
