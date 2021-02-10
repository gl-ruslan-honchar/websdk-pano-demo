<template>
  <v-container>
    <v-row class="mt-6" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-select
          v-model="videoData"
          :items="videoLinkOptions"
          item-text="title"
          item-value="link"
          label="Predefined video options"
          return-object
          solo
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="videoData.link" label="Video link (https://test.com/video.mp4)" :disabled="!videoData.allowCustom" counter solo />
      </v-col>
      <v-col cols="12">
        <v-btn color="indigo" class="white--text" @click="loadVideo" outlined large>
          Load video to player
          <v-icon v-text="'mdi-cloud-upload'" right dark />
        </v-btn>
      </v-col>
    </v-row>
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
  data () {
    return {
      videoData: { title: 'Test Pano video', link: '/pano-test.mp4'},
      videoLinkOptions: [
        { title: 'Test Pano video', link: '/pano-test.mp4'},
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
