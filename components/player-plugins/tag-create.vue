<template>
  <div>
    <v-btn color="success" depressed @click="showTagsUI">Show tags UI</v-btn>
    <v-btn color="success" depressed @click="hideTagsUI">Hide tags UI</v-btn>
    <v-btn color="success" depressed @click="showTagBtn">Show tag button</v-btn>
    <v-btn color="success" depressed @click="hideTagBtn">Hide tag button</v-btn>
  </div>
</template>

<script>
  export default {
    name: "tag-create",
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
        this.$msg.success('`Tag Create` Plugin Registered.')
      } else {
        this.$msg.error('Failed to register `Tag Create` plugin as player is not present!')
      }
    },
    methods: {
      showTagsUI() {
        this.player.tagUI.show()
      },
      hideTagsUI() {
        this.player.tagUI.hide()
      },

      showTagBtn() {
        this.player.showTagButton()
      },

      hideTagBtn() {
        this.player.hideTagButton()
      },

      registerPlugin() {
        const {Plugins, SDKApi} = window['pixellot-web-sdk'];
        const {TagCreatePlugin} = Plugins;
        const vm = this

        const options = {
          onTagCreateRequest(time) {
            const pts = Math.round(time * 1000);

            const createTagOptions = {
              targetId: vm.eventId,
              type: 'basketball_dunk',
              timePTS: pts,
              videoType: 'vod',
              streamName: 'hd',
              mode: 'sync'
            };

            SDKApi.createTag(createTagOptions)
              .then(plainResponse => {
                if (!plainResponse.ok) {
                  throw new Error(plainResponse.data);
                }

                return plainResponse.json();
              })
              .then(({ data }) => {
                vm.$msg.success(`Tag creation request sent: Type - ${data.type}, ID - ${data.id}`);
              })
              .catch((error) => {
                vm.$msg.error(`Tag creation request failed`);
              });
          }
        }

        this.player.registerPlugin(TagCreatePlugin, options)
      }
    }
  }
</script>
