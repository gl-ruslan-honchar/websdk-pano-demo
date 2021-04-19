<template>
  <div>
    <v-btn color="success" depressed @click="showTags">Show Tags</v-btn>
    <v-btn color="success" depressed @click="removeTags">Remove Tags</v-btn>
  </div>
</template>

<script>
  export default {
    name: "tag",
    props: {
      player: {
        type: Object,
        default: null
      },
      eventId: {
        type: String,
        default: ''
      }
    },
    mounted() {
      if (this.player) {
        this.registerPlugin()
        this.$msg.success('`Tag` Plugin Registered.')
      } else {
        this.$msg.error('Failed to register `Tag` plugin as player is not present!')
      }
    },
    methods: {
      showTags () {
        const {SDKApi} = window['pixellot-web-sdk'];

        const tagsOptions = {
          targetId: this.eventId,
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
        const {PlayerTagPlugin} = window['pixellot-web-sdk'].Plugins;
        const options = {}

        this.player.registerPlugin(PlayerTagPlugin, options)
      }
    }
  }
</script>
