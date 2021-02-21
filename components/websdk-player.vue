<template>
  <div class="pa-6">
    <v-row>
      <v-col cols="12" md="7" class="pa-0 pa-md-3">
        <div class="my-6" ref="player" id="player"></div>
      </v-col>
      <v-col cols="12" md="5">
        <v-row class="py-6">
          <player-zoom @zoom="zoomVideo" />
          <player-pan @move="moveVideo" />
          <v-col cols="12" md="5" sm="12">
            <strong>Configurations</strong>

            <div>
              <v-btn class="mt-3" @click="resetVideoPositions" :loading="resetting" :disabled="resetting || applying" color="teal" outlined>
                Reset
                <v-icon>mdi-restart</v-icon>
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
              <v-btn class="mt-3" @click="applyOptions" :loading="applying" :disabled="applying || resetting" color="teal" outlined>
                Apply
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <player-zoom-configs :player-options="playerOptions"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="videoLoadError.value" :timeout="5000" color="error" outlined bottom right>
      {{ videoLoadError.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="videoLoadError.value = false" v-text="'Close'" />
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  import { createPixellotPlayer } from "~/assets/WebSDK";
  import playerOptions from "~/assets/playerOptions";
  import PlayerZoomConfigs from "~/components/player-zoom-configs";
  import PlayerZoom from "~/components/player-zoom";
  import PlayerPan from "~/components/player-move";

  export default {
    name: "websdk-player",
    components: {PlayerPan, PlayerZoom, PlayerZoomConfigs},
    props: {
      source: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        applying: false,
        resetting: false,

        player: null,
        playerOptions,
        videoLoadError: {
          value: false,
          message: ''
        },
      }
    },
    mounted() {
      if (!process.client) {
        return
      }

      this.player = createPixellotPlayer(this.$refs.player, this.playerOptions.configuration);

      this.loadSource()
    },
    methods: {
      loadSource () {
        const hdExist = this.source.mode === 'hd' ? this.source.hd.link : true;
        const panoExist = this.source.mode === 'pano' ? this.source.pano.link : true;

        if (!hdExist || !panoExist) {
          this.videoLoadError = {
            value: true,
            message: `Please select video source for ${this.source.mode} mode!`
          };

          return;
        }

        if (this.source.mode === 'hd') {
          this.player.setSource(this.source.hd.link);
        } else {
          this.player.setSource(this.source.pano.link);
        }

        setTimeout(() => {
          this.videoLoadError = {
            value: Boolean(this.player.vdjsPlayer.error()),
            message: 'Some error occurred during loading a video'
          };
        }, 300)
      },

      applyOptions () {
        this.applying = true;
        this.player.updateOptions(this.playerOptions.configuration);
        this.resetVideoPositions();
      },

      zoomVideo (direction) {
        direction === 'in' ? this.player.zoomIn() : this.player.zoomOut();
      },

      moveVideo (direction) {
        switch (direction) {
          case 'up': return this.player.pan(0, 25, true);
          case 'down': return this.player.pan(0, -25, true);
          case 'left': return this.player.pan(25, 0, true);
          case 'right': return this.player.pan(-25, 0, true);
          default: return;
        }
      },

      resetVideoPositions () {
        this.resetting = !this.applying;
        this.player.plugins.pano.reset();

        setTimeout(() => {
          this.resetting = false;
          this.applying = false;
        }, 500);
      }
    }
  }
</script>

<style lang="scss">
  #player {
    max-width: 900px;
    height: 500px;
    margin: 0 auto;
    & > .video-js {
      padding: 0;
      height: 100%;
    }
  }
</style>
