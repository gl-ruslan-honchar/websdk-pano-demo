<template>
  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Title</th>
        <th class="text-left">Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Enabled</td>
        <td>
          <v-switch v-model="config.enabled" label="Enabled"/>
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  import playerOptions from "~/assets/playerOptions";

  export default {
    name: "player-recorder-table",
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        playerOptions,
      }
    },
  }
</script>

<style scoped>

</style>
