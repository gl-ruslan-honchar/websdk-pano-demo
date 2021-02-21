<template>
  <v-container>
    <player-sources :video-data="videoData" />

    <v-row>
      <v-col cols="12">
        <v-sheet class="mt-6" min-height="50vh" rounded="lg">
          <websdk-player ref="playerComponent" :source="videoData" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlayerSources from "~/components/player-sources";
import WebsdkPlayer from "~/components/websdk-player";

export default {
  name: "MainPage",
  components: {WebsdkPlayer, PlayerSources},
  head: {
    title: 'WebSDK Demo'
  },
  data () {
    return {
      videoData: {
        mode: 'hd',
        hd: { title: 'Test video', link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        pano: { title: 'Test Pano video 1', link: '/websdk-pano-demo/pano-test1.mp4' },
      }
    }
  }
}
</script>
