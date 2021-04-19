<template>
  <div>
    <v-row class="pa-3">
      <v-col cols="12" md="6">
        <v-text-field v-model="eventId" label="Event ID" type="text" clearable solo/>
      </v-col>
      <v-col cols="12">
        <v-card v-for="(playerPlugin, index) in plugins" :key="index" class="my-3">
          <v-toolbar flat color="blue-grey" tile dark height="40px">
            <v-toolbar-title>{{ playerPlugin.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text transition="slide-y-transition">
            <component v-if="playerPlugin.enabled" :is="playerPlugin.component" :player="player" :eventId="eventId" />
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-3">
            <v-switch v-model="playerPlugin.enabled" :disabled="playerPlugin.enabled" label="Enabled" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
        eventId: '5c36fed232ee4b7e85a82e0d',
        plugins: [
          { enabled: false, component: 'ClipCreate', title: 'Clip Create Plugin' },
          { enabled: false, component: 'Tag', title: 'Tag Plugin' },
          { enabled: false, component: 'TagCreate', title: 'Tag Create Plugin' },
          { enabled: false, component: 'TimeMove', title: 'Time Move Plugin' }
        ]
      }
    },
    mounted() {
      this.$msg.info(`Event ID: '${this.eventId}'`)
    }
  }
</script>

