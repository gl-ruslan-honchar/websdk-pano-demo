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
        videoLinkOptions: {
          hd: [
            { title: 'Test video', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
            { title: 'Custom link', link: '', allowCustom: true }
          ],
          pano: [
            { title: 'Test Pano video 1', link: '/websdk-pano-demo/pano-test1.mp4'},
            { title: 'Test Pano video 2', link: '/websdk-pano-demo/pano-test2.mp4'},
            { title: 'Custom link', link: '', allowCustom: true }
          ]
        }
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
        }, 1000);
      }
    }
  }
</script>

