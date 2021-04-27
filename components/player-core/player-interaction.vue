<template>
  <div>
    <v-row class="py-6">
      <v-col cols="12" md="2" sm="12">
        <strong>Configuration actions</strong>

        <div class="mt-3">
          <div>
            <v-btn @click="zoomVideo('in')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="zoomVideo('out')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn @click="moveVideo('up')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn @click="moveVideo('down')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn @click="moveVideo('left')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn @click="moveVideo('right')" class="ma-2" color="teal" outlined dark icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="mt-3">
          <v-btn class="mt-3" @click="resetVideoPositions" :loading="resetting"
                 :disabled="resetting || applying" color="teal" outlined>
            Reset
            <v-icon>mdi-restart</v-icon>
            <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
            </template>
          </v-btn>
          <v-btn class="mt-3" @click="applyOptions" :loading="applying" :disabled="applying || resetting"
                 color="teal" outlined>
            Apply
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="10" sm="12">
        <v-row>
          <v-col cols="6">
            <h4>HD Mode</h4>
            <player-interaction-table :config="interactionConfig.hd"/>
          </v-col>
          <v-col cols="6">
            <h4>Pano Mode</h4>
            <player-interaction-table :config="interactionConfig.pano"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import playerOptions from "~/assets/playerOptions";
  import PlayerInteractionTable from "~/components/player-core/player-interaction-table";

  export default {
    name: "player-interaction",
    components: {PlayerInteractionTable},
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        applying: false,
        resetting: false,

        interactionConfig: playerOptions.configuration.interaction,
      }
    },
    methods: {
      applyOptions() {
        this.applying = true;
        this.player.updateOptions({interaction: this.interactionConfig});
        this.resetVideoPositions();
      },

      zoomVideo(direction) {
        direction === 'in' ? this.player.zoomIn() : this.player.zoomOut();
      },

      moveVideo(direction) {
        switch (direction) {
          case 'up':
            return this.player.pan(0, 25, true);
          case 'down':
            return this.player.pan(0, -25, true);
          case 'left':
            return this.player.pan(25, 0, true);
          case 'right':
            return this.player.pan(-25, 0, true);
          default:
            return;
        }
      },

      resetVideoPositions() {
        this.resetting = !this.applying;
        this.player.plugins.interaction.reset();

        setTimeout(() => {
          this.resetting = false;
          this.applying = false;
        }, 500);
      }
    }
  }
</script>

