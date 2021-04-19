<template>
  <v-row>
    <v-col cols="12" lg="6">
      <h4>HD:</h4>
      <v-row class="mt-6" justify="center" align="center">
        <v-col cols="12" md="6">
          <v-select
            v-model="videoData.hd"
            :items="playerSources.hd"
            item-text="title"
            item-value="link"
            label="Predefined video options"
            return-object
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="videoData.hd.link"
            :disabled="!videoData.hd.allowCustom"
            label="Video link"
            placeholder="https://test.com/video.mp4"
            outlined
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" lg="6">
      <h4>Pano:</h4>
      <v-row class="mt-6" justify="center" align="center">
        <v-col cols="12" md="6">
          <v-select
            v-model="videoData.pano"
            :items="playerSources.pano"
            item-text="title"
            item-value="link"
            label="Predefined video options"
            return-object
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="videoData.pano.link"
            :disabled="!videoData.pano.allowCustom"
            label="Video link"
            placeholder="https://test.com/video.mp4"
            outlined
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import playerSources from '~/assets/player-sources'

  export default {
    name: "sources-video",
    props: {
      videoData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        playerSources
      }
    }
  }
</script>

