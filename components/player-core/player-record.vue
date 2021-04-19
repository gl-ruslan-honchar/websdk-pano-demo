<template>
  <v-row>
    <v-col cols="12">
      <v-item-group multiple>
        <v-btn color="success" @click="startRecording">
          <v-icon class="mr-4">mdi-record-rec</v-icon>
          Start Recoding
        </v-btn>
        <v-btn color="success" @click="stopRecording">
          <v-icon class="mr-4">mdi-stop-circle</v-icon>
          Stop Recoding
        </v-btn>
        <v-btn color="success" @click="saveRecording">
          <v-icon class="mr-4">mdi-download</v-icon>
          Save Recoding
        </v-btn>
      </v-item-group>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "player-record",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    methods: {
      startRecording () {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        // this.player.recorder.startRecording()
      },
      stopRecording () {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        // this.player.recorder.stopRecording()
      },
      saveRecording () {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        // this.player.recorder.saveRecording()
      }
    }
  }
</script>
