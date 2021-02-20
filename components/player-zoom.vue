<template>
  <v-col cols="6" md="2" sm="6">
    <strong>Zoom</strong>

    <div class="mt-3">
      <v-btn @click="$emit('zoom', 'in')" class="ma-2" color="teal" outlined dark icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn @click="$emit('zoom', 'out')" class="ma-2" color="teal" outlined dark icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>
  </v-col>
</template>

<script>
  export default {
    name: "player-zoom"
  }
</script>

