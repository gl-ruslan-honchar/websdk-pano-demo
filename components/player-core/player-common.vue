<template>
  <div class="pa-4">
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="playerTitle"
          :disabled="!player"
          @click:append-outer="setTitle"
          @click:clear="clearTitle"
          append-outer-icon="mdi-check-circle-outline"
          clear-icon="mdi-close-circle"
          label="Player title"
          type="text"
          clearable
          solo
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "player-common",
    props: {
      player: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        playerTitle: 'Pixellot Player'
      }
    },
    watch: {
      player: {
        immediate: true,
        handler(player) {
          if (player) {
            this.setTitle()
          }
        }
      }
    },
    methods: {
      setTitle() {
        try {
          this.player.setTitle(this.playerTitle);
          this.$msg.success(`Player title set to '${this.playerTitle}'`)
        } catch (error) {
          this.$msg.error('Failed to set player title!')
          console.error('Failed to set player title!', error)
        }
      },
      clearTitle () {
        this.playerTitle = ''
      }
    }
  }
</script>
