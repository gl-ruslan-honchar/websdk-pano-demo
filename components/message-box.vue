<template>
  <div>
    <v-list>
      <v-list-group v-model="msgBoxOpen" prepend-icon="mdi-message" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="'Messages'" />
          </v-list-item-content>
        </template>

        <v-list-item v-for="(msg, index) in messages" :key="index">
          <v-list-item-content>
            <v-list-item-title v-text=" msg.title" :class="`${msg.type}--text`" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
  export default {
    name: "message-box",
    data() {
      return {
        msgBoxOpen: true,
        messages: []
      }
    },
    mounted() {
      this.$root.$on('message', this.addMessage)
      this.$root.$on('message-error', this.addErrorMessage)
    },
    beforeDestroy() {
      this.$root.$off('message', this.addMessage)
      this.$root.$off('message-error', this.addErrorMessage)
    },
    methods: {
      addMessage (message) {
        if (typeof message === 'string') {
          this.messages.push({ title: message, type: 'info' })
        } else {
          this.messages.push(message)
        }

        this.msgBoxOpen = true
      },
      addErrorMessage (message) {
        this.messages.push({ title: message, type: 'error' })
        this.msgBoxOpen = true
      },
    }
  }
</script>
