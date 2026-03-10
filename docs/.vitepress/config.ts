import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-forge',
  description: 'Enterprise Vue 3 Component Library',
  lang: 'en-US',
  lastUpdated: true,
  base: '/vue-forge/',

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'vue-forge',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'Composables', link: '/composables/use-form' },
      { text: 'GitHub', link: 'https://github.com/alrod-dev/vue-forge' },
    ],

    sidebar: {
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Select', link: '/components/select' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Card', link: '/components/card' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Alert', link: '/components/alert' },
            { text: 'Toggle', link: '/components/toggle' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Accordion', link: '/components/accordion' },
            { text: 'Dropdown', link: '/components/dropdown' },
            { text: 'Table', link: '/components/table' },
            { text: 'Toast', link: '/components/toast' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Skeleton', link: '/components/skeleton' },
          ],
        },
      ],
      '/composables/': [
        {
          text: 'Composables',
          items: [
            { text: 'useForm', link: '/composables/use-form' },
            { text: 'useDebounce', link: '/composables/use-debounce' },
            { text: 'useDarkMode', link: '/composables/use-dark-mode' },
            { text: 'useClickOutside', link: '/composables/use-click-outside' },
            { text: 'useInfiniteScroll', link: '/composables/use-infinite-scroll' },
            { text: 'useMediaQuery', link: '/composables/use-media-query' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alrod-dev/vue-forge' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Alfredo Wiesner',
    },

    search: {
      provider: 'local',
    },
  },
})
