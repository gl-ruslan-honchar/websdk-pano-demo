<template>
  <div class="pa-6">
    <v-row>
      <v-col cols="12" md="7" sm="9">
        <div class="my-6" ref="player" id="player"></div>
      </v-col>
      <v-col cols="12" md="5" sm="3">
        <v-row class="py-6">
          <v-col cols="12" md="3" sm="6">
            <strong>Zoom</strong>
            <span>{{ zoomValue }}%</span>

            <div class="mt-3">
              <v-btn @click="zoomVideo('in')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn @click="zoomVideo('out')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <strong>Move</strong>

            <div class="mt-3">
              <v-btn @click="moveVideo('up')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn @click="moveVideo('down')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              <v-btn @click="moveVideo('left')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn @click="moveVideo('right')" class="ma-2" color="teal" outlined dark icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="3" sm="12">
            <strong>Reset positions</strong>

            <div class="mt-3">
              <v-btn @click="resetVideoPositions" color="teal" outlined dark>
                Reset
                <v-icon>mdi-reset</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels :value="[0]" multiple popout>
              <v-expansion-panel>
                <v-expansion-panel-header>Zoom configuration</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div>
                    <v-row>
                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="playerZoomOptions.zoom"
                          :items="zoomOptions"
                          item-text="title"
                          item-value="value"
                          label="Default zoom level"
                        />
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="playerZoomOptions.minZoom"
                          :items="zoomOptions"
                          item-text="title"
                          item-value="value"
                          label="Min zoom"
                        />
                      </v-col>
                      <v-col cols="12" md="4" sm="6">
                        <v-select
                          v-model="playerZoomOptions.maxZoom"
                          :items="zoomOptions"
                          item-text="title"
                          item-value="value"
                          label="Max zoom"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="playerZoomOptions.zoomPoint"
                          :items="zoomPointOptions"
                          item-text="title"
                          item-value="value"
                          label="Zoom change point"
                        />
                      </v-col>
                      <v-col cols="12" md="6" align="end">
                        <v-btn @click="applyZoomOptions" class="ma-2" color="teal" outlined dark>
                          Apply options
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { createPixellotPlayer } from "~/assets/WebSDK";

  export default {
    name: "websdk-player",
    props: {
      source: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        player: null,

        zoomPointOptions: [
          { value: 0.01, title: '1%' },
          { value: 0.05, title: '5%' },
          { value: 0.1, title: '10%' },
          { value: 0.2, title: '20%' },
          { value: 0.25, title: '25%' },
          { value: 0.5, title: '50%' },
          { value: 0.75, title: '75%' },
          { value: 1, title: '100%' },
          { value: 1.25, title: '125%' },
        ],
        zoomOptions: [
          { value: 0.25, title: '25%' },
          { value: 0.5, title: '50%' },
          { value: 0.75, title: '75%' },
          { value: 1, title: '100%' },
          { value: 1.25, title: '125%' },
          { value: 1.5, title: '150%' },
          { value: 2, title: '200%' },
          { value: 2.5, title: '250%' },
          { value: 3, title: '300%' },
          { value: 3.5, title: '350%' },
          { value: 4, title: '400%' },
          { value: 4.5, title: '450%' },
          { value: 5, title: '500%' },
          { value: 5.5, title: '550%' },
          { value: 6, title: '600%' },
          { value: 6.5, title: '650%' },
          { value: 7, title: '700%' },
          { value: 8, title: '800%' },
          { value: 9, title: '900%' },
          { value: 10, title: '1000%' },
        ],
        playerZoomOptions: {
          zoom: 1,
          minZoom: 1,
          maxZoom: 4,
          zoomPoint: 0.1,
        }
      }
    },
    mounted() {
      if (!process.client) {
        return
      }

      this.player = createPixellotPlayer(this.$refs.player, { zoom: this.playerZoomOptions });

      if (this.source) {
        this.loadSource()
      }
    },
    computed: {
      zoomValue () {
        const formatValue = (val) => Number.parseFloat(val).toFixed(0)

        return this.player && formatValue(this.player.pano.zoom * 100);
      }
    },
    methods: {
      loadSource () {
        const preroll = '';
        const midrolls = [];

        this.player.setSource(this.source, preroll, midrolls);
      },

      applyZoomOptions () {
        this.player.pano.updateOptions(this.playerZoomOptions);
        this.resetVideoPositions();
      },

      zoomVideo (direction) {
        direction === 'in' ? this.player.pano.zoomIn() : this.player.pano.zoomOut();
      },

      moveVideo (direction) {
        switch (direction) {
          case 'up': return this.player.pano.moveUp();
          case 'down': return this.player.pano.moveDown();
          case 'left': return this.player.pano.moveLeft();
          case 'right': return this.player.pano.moveRight();
          default: return;
        }
      },

      resetVideoPositions () {
        this.player.pano.reset()
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
