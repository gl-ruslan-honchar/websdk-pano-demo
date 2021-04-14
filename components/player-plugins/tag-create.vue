<template>
  <div>
    <v-card>
      <v-toolbar flat color="blue-grey" tile dark height="40px">
        <v-toolbar-title>Tag Create Plugin</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="success" depressed @click="showTagsUI">Show tags UI</v-btn>
        <v-btn color="success" depressed @click="hideTagsUI">Hide tags UI</v-btn>
        <v-btn color="success" depressed @click="showTagBtn">Show tag button</v-btn>
        <v-btn color="success" depressed @click="hideTagBtn">Hide tag button</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import {WebSDKPlugins, SDKApi, eventId} from "~/assets/WebSDK";

  export default {
    name: "tag-create",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    mounted() {
      if (this.player) {
        this.registerPlugin()
        this.$root.$emit('message', { title: '`Tag Create` Plugin Registered.', type: 'success' })
      } else {
        this.$root.$emit('message-error', 'Failed to register `Tag Create` plugin as player is not present!')
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
        const {TagCreatePlugin} = WebSDKPlugins;
        const vm = this

        const options = {
          onTagCreateRequest(time) {
            const pts = Math.round(time * 1000);

            const createTagOptions = {
              targetId: eventId,
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
                vm.$root.$emit('message', `Tag creation request sent: Type - ${data.type}, ID - ${data.id}`);
              })
              .catch((error) => {
                vm.$root.$emit('message-error', `Tag creation request failed`);
              });
          }
        }

        this.player.registerPlugin(TagCreatePlugin, options)
      }
    }
  }
</script>
