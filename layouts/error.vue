<template>
  <v-app dark>
    <v-alert type="error" prominent>
      <v-row align="center">
        <v-col class="grow">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </v-col>
        <v-col class="shrink">
          <v-btn to="/" nuxt>Home page</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;

    return { title }
  },
  mounted() {
    this.$router.replace('/error');
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
