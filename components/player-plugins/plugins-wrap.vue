<template>
  <v-expansion-panels :value="toggles" multiple popout>
    <v-expansion-panel>
      <v-expansion-panel-header>WebSDK Plugins configuration</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row class="pa-3">
          <v-item-group multiple>
            <v-btn color="primary accent-3" :disabled="plugins.clipCreate" @click="plugins.clipCreate = true">
              <span>Enable `Clip Create` Plugin</span>
            </v-btn>
            <v-btn color="primary accent-3" :disabled="plugins.tag" @click="plugins.tag = true">
              <span>Enable `Tag` Plugin</span>
            </v-btn>
            <v-btn color="primary accent-3" :disabled="plugins.tagCreate" @click="plugins.tagCreate = true">
              <span>Enable `Tag Create` Plugin</span>
            </v-btn>
            <v-btn color="primary accent-3" :disabled="plugins.timeMove" @click="plugins.timeMove = true">
              <span>Enable `Time Move` Plugin</span>
            </v-btn>
          </v-item-group>
        </v-row>
        <v-row>
          <v-col cols="12">
            <clip-create v-if="plugins.clipCreate" :player="player" />
          </v-col>
          <v-col cols="12">
            <tag-create v-if="plugins.tagCreate" :player="player" />
          </v-col>
          <v-col cols="12">
            <tag v-if="plugins.tag" :player="player" />
          </v-col>
          <v-col cols="12">
            <time-move v-if="plugins.timeMove" :player="player" />
          </v-col>
        </v-row>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import { eventId } from "~/assets/WebSDK";
  import ClipCreate from "~/components/player-plugins/clip-create";
  import TagCreate from "~/components/player-plugins/tag-create";
  import Tag from "~/components/player-plugins/tag";
  import TimeMove from "~/components/player-plugins/time-move";

  export default {
    name: "plugins-wrap",
    components: {TimeMove, Tag, TagCreate, ClipCreate},
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        toggles: [],
        plugins: {
          clipCreate: false,
          tag: false,
          tagCreate: false,
          timeMove: false,
        }
      }
    },
    mounted() {
      this.$root.$emit('message', `EventID: ${eventId}`)
    }
  }
</script>

