<template>
  <v-row>
    <v-col cols="12" lg="12">
      <h4>Pre-roll:</h4>

      <v-row class="mt-6" justify="center" align="center">
        <v-col cols="12" md="6">
          <v-select
            v-model="videoData.preRoll"
            :items="playerSources.ads"
            item-text="title"
            item-value="link"
            label="Pre-roll Ad"
            return-object
            outlined
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="videoData.preRoll.link"
            :disabled="!videoData.preRoll.allowCustom"
            label="Custom link"
            placeholder="https://vast-ad-preroll.xml"
            outlined
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" lg="12">
      <h4>Mid-rolls:</h4>

      <v-row v-for="(midRoll, index) in videoData.midRolls" :key="index" class="mt-6" justify="center" align="center">
        <v-col cols="12" md="9">
          <v-text-field
            v-model="midRoll.link"
            label="Mid-roll VAST link"
            placeholder="https://vast-ad-preroll.xml"
            outlined
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="midRoll.interval"
            suffix="sec."
            label="Interval"
            type="number"
            placeholder="10"
            outlined
          />
        </v-col>
      </v-row>

      <v-row class="my-6" justify="start" align="center">
        <v-btn @click="addMidRoll">Add Mid-roll</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import playerSources from "~/assets/player-sources";

  export default {
    name: "sources-ads",
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
    },
    methods: {
      addMidRoll () {
        this.videoData.midRolls.push({ link: '', interval: 10 })
      }
    }
  }
</script>


