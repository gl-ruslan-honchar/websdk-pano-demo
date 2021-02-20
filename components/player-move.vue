<template>
  <v-col cols="6" md="5" sm="6">
    <strong>Move</strong>

    <div class="mt-3">
      <div>

        <v-btn @click="$emit('move', 'up')" class="ma-2" color="teal" outlined dark icon>
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn @click="$emit('move', 'down')" class="ma-2" color="teal" outlined dark icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
      <div>
        <v-btn @click="$emit('move', 'left')" class="ma-2" color="teal" outlined dark icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="$emit('move', 'right')" class="ma-2" color="teal" outlined dark icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>
  </v-col>
</template>

<script>
  export default {
    name: "player-pan"
  }
</script>
