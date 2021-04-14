<template>
  <div>
    <v-card>
      <v-toolbar flat color="blue-grey" tile dark height="40px">
        <v-toolbar-title>Tag Plugin</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="success" depressed @click="showTags">Show Tags</v-btn>
        <v-btn color="success" depressed @click="removeTags">Remove Tags</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import {WebSDKPlugins, SDKApi, eventId} from "~/assets/WebSDK";

  export default {
    name: "tag",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    mounted() {
      if (this.player) {
        this.registerPlugin()
        this.$root.$emit('message', { title: '`Tag` Plugin Registered.', type: 'success' })
      } else {
        this.$root.$emit('message-error', 'Failed to register `Tag` plugin as player is not present!')
      }
    },
    methods: {
      showTags () {
        const tagsOptions = {
          targetId: eventId,
          limit: 10,
          videoType: 'vod',
          streamName: 'hd'
        }

        SDKApi.getTags(tagsOptions)
          .then(response => response.json())
          .then(res => res.data.result)
          .then(this.player.showTags)
      },
      removeTags () {
        this.player.removeTags()
      },

      registerPlugin() {
        const {PlayerTagPlugin} = WebSDKPlugins;
        const options = {}

        this.player.registerPlugin(PlayerTagPlugin, options)
      }
    }
  }
</script>
