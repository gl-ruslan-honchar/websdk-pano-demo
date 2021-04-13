<template>
  <v-card flat class="py-2">
    <v-card-text>
      <v-row align="center" justify="center">
        <v-bottom-navigation v-model="activeThemes"  grow rounded>
          <v-btn color="deep-purple accent-3" text>
            <span>Default Theme</span>
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn color="teal accent-3" text>
            <span>Custom Theme</span>
            <v-icon>mdi-trending-up</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "player-theme-config",
  props: {
    player: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      activeThemes: 0
    }
  },
  watch: {
    activeThemes (val) {
      if (val === 1) {
        this.player && this.player.setTheme('pxlt')
      } else {
        this.player && this.player.setTheme('default')
      }
    }
  }
}
</script>

