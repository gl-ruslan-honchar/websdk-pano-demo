<template>
  <v-container>
    <v-expansion-panels :value="[0]" multiple popout>
      <v-expansion-panel>
        <v-expansion-panel-header>Video sources configuration</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="mt-6" justify="center" align="center">
            <v-col cols="12" md="6">
              <v-select
                v-model="videoData"
                :items="videoLinkOptions"
                item-text="title"
                item-value="link"
                label="Predefined video options"
                return-object
                outlined
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="videoData.link"
                :disabled="!videoData.allowCustom"
                label="Video link"
                placeholder="https://test.com/video.mp4"
                outlined
              />
            </v-col>
            <v-col cols="12" align="end">
              <v-btn color="indigo" class="white--text" :disabled="!videoData.link" @click="loadVideo" outlined large>
                Load video to player
                <v-icon v-text="'mdi-cloud-upload'" right dark />
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-row>
      <v-col cols="12">
        <v-container>
          <v-sheet class="mt-6" min-height="50vh" rounded="lg">
            <websdk-player ref="playerComponent" :source="videoData.link" />
          </v-sheet>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",
  head: {
    title: 'WebSDK Demo'
  },
  data () {
    return {
      videoData: { title: 'Test Pano video 1', link: '/websdk-pano-demo/pano-test1.mp4'},
      videoLinkOptions: [
        { title: 'Test Pano video 1', link: '/websdk-pano-demo/pano-test1.mp4'},
        { title: 'Test Pano video 2', link: '/websdk-pano-demo/pano-test2.mp4'},
        { title: 'Simple video', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { title: 'Custom link', link: '', allowCustom: true }
      ]
    }
  },
  methods: {
    loadVideo () {
      this.$refs.playerComponent.loadSource();
    }
  }
}
</script>
