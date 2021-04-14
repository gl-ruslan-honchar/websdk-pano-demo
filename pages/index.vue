<template>
  <v-container>
    <div>
      <player-sources ref="playerSources" :video-data="videoData" />
    </div>

    <div>
      <websdk-player ref="playerComponent" :source="videoData" />
    </div>

    <v-row class="mt-10">
      <v-col cols="12">
        <message-box />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlayerSources from "~/components/player-sources";
import WebsdkPlayer from "~/components/websdk-player";
import videoSources from '~/assets/player-sources';
import MessageBox from "~/components/message-box";

export default {
  name: "MainPage",
  components: {MessageBox, WebsdkPlayer, PlayerSources},
  head: {
    title: 'WebSDK Demo'
  },
  data () {
    return {
      videoData: {
        mode: 'hd',
        hd: videoSources.hd[2],
        pano: videoSources.pano[0]
      }
    }
  }
}
</script>
