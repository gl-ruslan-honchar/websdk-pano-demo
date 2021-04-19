<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-icon color="primary" v-text="'mdi-message'"/>
        Messages Log
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text style="height: 435px" class="overflow-y-auto">
      <v-alert v-for="(item, index) in messages" :key="index" :type="item.type" outlined text dense>
        {{ item.message }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "message-box",
    data() {
      return {
        messages: []
      }
    },
    created() {
      this.$msg.$on('message', this.addMessage)
    },
    beforeDestroy() {
      this.$msg.$off('message', this.addMessage)
    },
    methods: {
      addMessage(message) {
        if (typeof message === 'string') {
          this.messages.push({ message, type: 'info' })
        } else {
          this.messages.push(message)
        }
      },
    }
  }
</script>
