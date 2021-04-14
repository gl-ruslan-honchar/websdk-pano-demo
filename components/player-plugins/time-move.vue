<template>
  <div></div>
</template>

<script>
  import {WebSDKPlugins, SDKApi, eventId} from "~/assets/WebSDK";

  export default {
    name: "time-move",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    mounted() {
      if (this.player) {
        this.registerPlugin()
        this.$root.$emit('message', { title: '`Time Move` Plugin Registered.', type: 'success' })
      } else {
        this.$root.$emit('message-error', 'Failed to register `Time Move` plugin as player is not present!')
      }
    },
    methods: {

      registerPlugin() {
        const {TimeMovePlugin} = WebSDKPlugins;
        const options = {}

        this.player.registerPlugin(TimeMovePlugin, options)
      }
    }
  }
</script>
