<template>
  <v-card>
    <v-img
      :src="require('@/assets/neuroticism.jpg')"
      height="200px"
      lazy
    >
      <v-card-title
        class="image-title"
        v-html="$t('neuroticism.title')"
      />
    </v-img>
    <v-card-text>
      <div v-html="$t('neuroticismPage.text1')" />
      <blockquote class="blockquote">
        <v-icon>{{ mdiFormatQuoteOpen }}</v-icon>
        <span v-html="$t('neuroticismPage.quote')" />
        <v-icon>{{ mdiFormatQuoteClose }}</v-icon>
      </blockquote>
      <span v-html="$t('neuroticismPage.text2')" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiFormatQuoteOpen, mdiFormatQuoteClose } from '@mdi/js'

export default {
  name: 'Neuroticism',
  data: () => ({
    mdiFormatQuoteClose,
    mdiFormatQuoteOpen
  }),
  head () {
    return {
      title: this.$t('neuroticism.seo.title'),
      meta: [
        { hid: 'title', name: 'title', content: this.$t('neuroticism.seo.title') },
        { hid: 'description', name: 'description', content: this.$t('neuroticism.seo.description') },
        { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') },
        // Open Graph
        { hid: 'og:title', name: 'og:title', content: this.$t('neuroticism.seo.title') },
        { hid: 'og:description', name: 'og:description', content: this.$t('neuroticism.seo.description') },
        { hid: 'twitter:title', name: 'twitter:title', content: this.$t('neuroticism.seo.title') },
        { hid: 'twitter:description', name: 'twitter:description', content: this.$t('neuroticism.seo.description') }
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
