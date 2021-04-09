<template>
  <v-container>
    <player-sources ref="playerSources" :video-data="videoData" />

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
import videoSources from '~/assets/player-sources';

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
        hd: videoSources.hd[2],
        pano: videoSources.pano[2]
      }
    }
  }
}
</script>
