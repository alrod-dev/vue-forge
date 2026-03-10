import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VueForge from '../../../src/index'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout)
  },
  enhanceApp({ app }) {
    app.use(VueForge)
  },
} satisfies Theme
