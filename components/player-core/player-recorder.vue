<template>
  <v-row>
    <v-col cols="12">
      <div>
        <v-switch v-model="recorderConfig.enabled" :disabled="true" label="Enabled"/>
      </div>

      <v-item-group :disabled="!recorderConfig.enabled" multiple>
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

    <v-col cols="12">
      <div class="mt-3">
        <v-btn class="mt-3" @click="applyOptions" :loading="applying" :disabled="applying"
               color="teal" outlined>
          Apply
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import playerOptions from "~/assets/playerOptions";

  export default {
    name: "player-recorder",
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

        recorderConfig: playerOptions.configuration.recorder,
      }
    },
    methods: {
      applyOptions() {
        this.applying = true;

        this.player.updateOptions({recorder: this.recorderConfig});

        setTimeout(() => {
          this.applying = false;
        }, 500);
      },
      startRecording() {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        this.player.recorder.startRecording()
      },
      stopRecording() {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        this.player.recorder.stopRecording()
      },
      saveRecording() {
        this.$msg.warning('This feature is not yet implemented. Coming soon.');
        this.player.recorder.saveRecording()
      }
    }
  }
</script>
