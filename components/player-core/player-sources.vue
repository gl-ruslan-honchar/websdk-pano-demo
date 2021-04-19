<template>
  <div>

    <v-card class="mb-12">
      <v-tabs v-model="activeTab">
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          <v-icon left>mdi-video</v-icon>
          Video Sources
        </v-tab>

        <v-tab href="#tab-2">
          <v-icon left>mdi-google-ads</v-icon>
          Advertisement Sources
        </v-tab>


        <v-tabs-items v-model="activeTab" class="pa-6">
          <v-tab-item value="tab-1">
            <sources-video :video-data="videoData" />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <sources-ads :video-data="videoData" />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>

    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="videoData.mode"
          :items="[{id: 'hd', title: 'HD mode'}, {id: 'pano', title: 'Pano mode'}]"
          item-text="title"
          item-value="id"
          label="Default video mode"
        />
      </v-col>
      <v-col cols="12" md="8" align="end">
        <v-btn color="indigo" class="white--text" :disabled="!canLoadVideo" :loading="loadingSources" @click="loadSources"
               outlined large>
          Load sources to the player
          <v-icon v-text="'mdi-cloud-upload'" right dark/>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import videoSources from '~/assets/player-sources'
  import SourcesVideo from "~/components/player-core/sources/sources-video";
  import SourcesAds from "~/components/player-core/sources/sources-ads";

  export default {
    name: "player-sources",
    components: {SourcesAds, SourcesVideo},
    props: {
      videoData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeTab: 0,
        loadingSources: false,
        videoLinkOptions: videoSources
      }
    },
    computed: {
      canLoadVideo() {
        return this.loadingSources || this.videoData.mode === 'hd'
          ? this.videoData.hd.link
          : this.videoData.pano.link;
      }
    },
    methods: {
      loadSources() {
        this.loadingSources = true;
        this.$emit('load-sources');

        setTimeout(() => {
          this.loadingSources = false;
        }, 500);
      }
    }
  }
</script>

