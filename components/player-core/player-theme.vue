<template>
  <div class="py-2">
    <v-btn-toggle v-model="activeThemes" grow mandatory>
      <v-btn color="primary" text>
        <v-icon color="primary" class="mr-2">mdi-home</v-icon>
        <span>Default Theme</span>
      </v-btn>
      <v-btn color="secondary" text>
        <v-icon color="secondary" class="mr-2">mdi-trending-up</v-icon>
        <span>Custom Theme</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "player-theme",
  props: {
    player: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      activeThemes: 0,
      warningShown: false
    }
  },
  watch: {
    activeThemes: {
      immediate: true,
      handler (val) {
        if (val === 1) {
          this.player && this.player.setTheme('pxlt')
        } else {
          this.player && this.player.setTheme('default')
        }

        if (!this.warningShown) {
          this.$msg.warning('Changing theme is a beta feature, and it\'s not yet supported!')
          this.warningShown = true
        }
      }
    }
  }
}
</script>

