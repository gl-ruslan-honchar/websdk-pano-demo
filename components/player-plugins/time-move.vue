<template>
  <div></div>
</template>

<script>
  export default {
    name: "time-move",
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
        this.$msg.success('`Time Move` Plugin Registered.')
      } else {
        this.$msg.error('Failed to register `Time Move` plugin as player is not present!')
      }
    },
    methods: {

      registerPlugin() {
        const {TimeMovePlugin} = window['pixellot-web-sdk'].Plugins;
        const options = {}

        this.player.registerPlugin(TimeMovePlugin, options)
      }
    }
  }
</script>
