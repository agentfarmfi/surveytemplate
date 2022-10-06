<template>
  <v-card>
    <v-img
      :src="require('@/assets/conscientiousness.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('conscientiousness.title')"
      />
    </v-img>
    <v-card-text>
      <span v-html="$t('conscientiousnessPage.text1')" />
      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        <span v-html="$t('conscientiousnessPage.quote')" />
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>
      <span v-html="$t('conscientiousnessPage.text2')" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Conscientiousness',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('conscientiousness.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('conscientiousness.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('conscientiousness.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('conscientiousness.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('conscientiousness.seo.description') }
      ]
    }
  }
}
</script>

<style>
.image-title {
  font-family: 'Passion One', cursive;
  font-size: 3rem;
  text-transform: uppercase;
}
</style>
