<template>
  <div>
    <v-row class="my-6">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-icon color="secondary" class="mr-4" light large>mdi-play</v-icon>
            <v-toolbar-title>Pixellot Player</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="grey lighten-4">
            <v-row class="pa-lg-6">
              <v-col cols="12" lg="6">
                <div ref="player" id="player"></div>
              </v-col>
              <v-col cols="12" lg="6">
                <message-box/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-6">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-icon color="secondary" class="mr-4" light>mdi-cog</v-icon>
            <v-toolbar-title>Configuration</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="grey lighten-4">
            <v-expansion-panels :value="toggles" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span>
                    <v-icon color="secondary" class="mr-4">mdi-import</v-icon>
                    Sources
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <player-sources ref="playerSources" :video-data="source" @load-sources="loadSource"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span>
                    <v-icon color="secondary" class="mr-4">mdi-panorama</v-icon>
                    Pano/zoom
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <player-pano :player="player"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span>
                    <v-icon color="secondary" class="mr-4">mdi-compare</v-icon>
                    <v-badge bordered color="green" content="beta">
                      Theme
                    </v-badge>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <player-theme :player="player"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <span>
                    <v-icon color="secondary" class="mr-4">mdi-image-filter-center-focus-strong</v-icon>
                    <v-badge bordered color="green" content="beta">
                      Recording/clipping
                    </v-badge>
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <player-record :player="player"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <div>
              <player-common :player="player"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-6">
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-icon color="secondary" class="mr-4" light>mdi-puzzle</v-icon>
            <v-toolbar-title>Plugins</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text class="grey lighten-4">
            <plugins-wrap :player="player"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {createPixellotPlayer} from "~/assets/WebSDK";
  import playerOptions from "~/assets/playerOptions";
  import PlayerTheme from "~/components/player-core/player-theme";
  import PluginsWrap from "~/components/player-plugins/plugins-wrap";
  import PlayerSources from "~/components/player-core/player-sources";
  import videoSources from "~/assets/player-sources";
  import MessageBox from "~/components/message-box";
  import PlayerPano from "~/components/player-core/player-pano";
  import PlayerRecord from "~/components/player-core/player-record";
  import PlayerCommon from "~/components/player-core/player-common";

  export default {
    name: "websdk-player",
    components: {PlayerCommon, PlayerRecord, PlayerPano, MessageBox, PlayerSources, PluginsWrap, PlayerTheme},
    data() {
      return {
        toggles: [],

        player: null,
        playerOptions,
        source: {
          mode: 'hd',
          preRoll: {},
          midRolls: [{link: '', interval: 10}],
          hd: videoSources.hd[2],
          pano: videoSources.pano[0]
        }
      }
    },
    mounted() {
      if (!process.client) {
        return
      }

      try {
        this.player = createPixellotPlayer(this.$refs.player, this.playerOptions.configuration);

        this.loadSource()
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      loadSource() {
        const hdExist = this.source.mode === 'hd' ? this.source.hd.link : true;
        const panoExist = this.source.mode === 'pano' ? this.source.pano.link : true;

        if (!hdExist || !panoExist) {
          this.$msg.error(`Please select video source for ${this.source.mode} mode!`);

          return;
        }

        const sources = {
          hd: this.source.hd.link,
          pano: this.source.pano.link,
        }

        const preRoll = this.source.preRoll.link || null
        const midRolls = this.source.midRolls
          .filter(ad => ad.link)
          .map(ad => ({source: ad.link, interval: ad.interval}));

        try {
          console.table({sources, preRoll, midRolls, mode: this.source.mode})
          this.player.setSource(sources, preRoll, midRolls, this.source.mode);
          this.$msg.success('Sources were successfully loaded to the player.')
        } catch (error) {
          this.$msg.error('Some error occurred during setting sources to the player.');
          this.$msg.warning('If you are testing advertisement sources, make sure to disable AdBlocker. And verify that Google IMA script is loaded well!');
          console.error('Error during setSource!', error)
        }

        setTimeout(() => {
          const gotError = Boolean(this.player.vdjsPlayer.error())

          if (gotError) {
            this.$msg.error('Some error occurred during loading a video');
          }
        }, 300)
      },
    }
  }
</script>

<style lang="scss">
  #player {
    max-width: 900px;
    height: 500px;
    margin: 0 auto;
  }
</style>
