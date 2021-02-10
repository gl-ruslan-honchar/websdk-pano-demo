<template>
  <div class="pa-6">
    <div ref="player" id="player"></div>

    <v-row class="py-6">
      <v-col cols="12" md="3">
        <strong>Zoom</strong>
        <span>{{ zoomValue }}%</span>

        <div class="mt-3">
          <v-btn @click="zoomVideo('in')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="zoomVideo('out')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <strong>Move</strong>

        <div class="mt-3">
          <v-btn @click="moveVideo('up')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn @click="moveVideo('down')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn @click="moveVideo('left')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="moveVideo('right')" class="mx-2" color="teal" outlined dark icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <strong>Reset positions</strong>

        <div class="mt-3">
          <v-btn @click="resetVideoPositions" color="teal" outlined dark>
            Reset
            <v-icon>mdi-reset</v-icon>
          </v-btn>
        </div>
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
        player: null
      }
    },
    mounted() {
      if (!process.client) {
        return
      }

      this.player = createPixellotPlayer(this.$refs.player);

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
    height: 500px;
    & > .video-js {
      padding: 0;
      height: 100%;
    }
  }
</style>
