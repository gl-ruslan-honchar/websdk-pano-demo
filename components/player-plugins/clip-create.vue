<template>
  <div></div>
</template>

<script>
  export default {
    name: "clip-create",
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
        this.$msg.success('`Clip Create` Plugin Registered.')
      } else {
        this.$msg.error('Failed to register `Clip Create` plugin as player is not present!')
      }
    },
    methods: {

      registerPlugin() {
        const {Plugins, SDKApi} = window['pixellot-web-sdk'];
        const {ClipCreatePlugin} = Plugins;
        const src = this.player.vdjsPlayer.src();

        const options = {
          onClipCreateRequest: range => {
            const from = Math.round(range.from);
            const to = Math.round(range.to);
            const clipName = `${this.eventId} [${from}-${to}]`;
            const clipCreateOptions = {startTime: from, endTime: to, name: clipName, targetId: this.eventId, url: src}

            SDKApi.createClip(clipCreateOptions)
              .then(plainResponse => {
                if (!plainResponse.ok) {
                  throw new Error(plainResponse.data);
                }

                return plainResponse.json();
              })
              .then(({data}) => {
                this.$msg.success(`Clip creation request sent: Name - ${data.name}, ID - ${data.id}`);
              })
              .catch(() => {
                this.$msg.error(`Clip creation request failed`);
              });
          }
        }

        this.player.registerPlugin(ClipCreatePlugin, options)
      }
    }
  }
</script>
