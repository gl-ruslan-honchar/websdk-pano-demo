<template>
  <v-expansion-panels :value="toggles" multiple popout>
    <v-expansion-panel>
      <v-expansion-panel-header>Video sources configuration</v-expansion-panel-header>
      <v-expansion-panel-content>
        <div>
          <h4>HD:</h4>
          <v-row class="mt-6" justify="center" align="center">
            <v-col cols="12" md="6">
              <v-select
                v-model="videoData.hd"
                :items="videoLinkOptions.hd"
                item-text="title"
                item-value="link"
                label="Predefined video options"
                return-object
                outlined
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="videoData.hd.link"
                :disabled="!videoData.hd.allowCustom"
                label="Video link"
                placeholder="https://test.com/video.mp4"
                outlined
              />
            </v-col>
          </v-row>

          <h4>Pano:</h4>
          <v-row class="mt-6" justify="center" align="center">
            <v-col cols="12" md="6">
              <v-select
                v-model="videoData.pano"
                :items="videoLinkOptions.pano"
                item-text="title"
                item-value="link"
                label="Predefined video options"
                return-object
                outlined
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="videoData.pano.link"
                :disabled="!videoData.pano.allowCustom"
                label="Video link"
                placeholder="https://test.com/video.mp4"
                outlined
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="videoData.mode"
                :items="[{id: 'hd', title: 'HD mode'}, {id: 'pano', title: 'Pano mode'}]"
                item-text="title"
                item-value="id"
                label="Default video mode"
              />
            </v-col>
            <v-col cols="12" md="8" align="end">
              <v-btn color="indigo" class="white--text" :disabled="!canLoadVideo" :loading="loadingVideo" @click="loadVideo" outlined large>
                Load video to player
                <v-icon v-text="'mdi-cloud-upload'" right dark />
              </v-btn>
            </v-col>
          </v-row>
        </div>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import videoSources from '~/assets/player-sources'

  export default {
    name: "player-sources",
    props: {
      videoData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        toggles: [],
        loadingVideo: false,
        videoLinkOptions: videoSources
      }
    },
    computed: {
      canLoadVideo () {
        return this.loadingVideo || this.videoData.mode === 'hd'
          ? this.videoData.hd.link
          : this.videoData.pano.link;
      }
    },
    methods: {
      loadVideo () {
        this.loadingVideo = true;
        this.$parent.$refs.playerComponent.loadSource();

        setTimeout(() => {
          this.loadingVideo = false;
        }, 500);
      }
    }
  }
</script>

