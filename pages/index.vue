<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <websdk-player />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WebsdkPlayer from "~/components/websdk-player";

export default {
  name: "MainPage",
  components: {WebsdkPlayer},
  head: {
    title: 'Pixellot WebSDK Demo'
  }
}
</script>
