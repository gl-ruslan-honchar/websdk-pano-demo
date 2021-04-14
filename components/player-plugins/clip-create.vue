<template>
  <div></div>
</template>

<script>
  import {WebSDKPlugins, SDKApi, eventId} from "~/assets/WebSDK";

  export default {
    name: "clip-create",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    mounted() {
      if (this.player) {
        this.registerPlugin()
        this.$root.$emit('message', {title: '`Clip Create` Plugin Registered.', type: 'success'})
      } else {
        this.$root.$emit('message-error', 'Failed to register `Clip Create` plugin as player is not present!')
      }
    },
    methods: {

      registerPlugin() {
        const {ClipCreatePlugin} = WebSDKPlugins;
        const src = this.player.vdjsPlayer.src();

        const options = {
          onClipCreateRequest: range => {
            const from = Math.round(range.from);
            const to = Math.round(range.to);
            const clipName = `${eventId} [${from}-${to}]`;
            const clipCreateOptions = {startTime: from, endTime: to, name: clipName, targetId: eventId, url: src}

            SDKApi.createClip(clipCreateOptions)
              .then(plainResponse => {
                if (!plainResponse.ok) {
                  throw new Error(plainResponse.data);
                }

                return plainResponse.json();
              })
              .then(({data}) => {
                this.$root.$emit('message', `Clip creation request sent: Name - ${data.name}, ID - ${data.id}`);
              })
              .catch(() => {
                this.$root.$emit('message-error', `Clip creation request failed`);
              });
          }
        }

        this.player.registerPlugin(ClipCreatePlugin, options)
      }
    }
  }
</script>
