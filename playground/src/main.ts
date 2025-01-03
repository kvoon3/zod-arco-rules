import ArcoVue from '@arco-design/web-vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { i18n, loadLanguageAsync } from './i18n'

import '@valibot/i18n'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

async function enableMocking() {
  if (!import.meta.env.DEV)
    return

  return (await import('./mocks/browser'))
    .worker
    .start()
}

enableMocking().then(() => {
  const app = createApp(App)
  const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
  })

  app.use(router)
  app.use(ArcoVue)
  app.use(i18n)
  loadLanguageAsync('en')

  app.mount('#app')

  watchEffect(() => document.body.setAttribute('arco-theme', isDark.value ? 'dark' : ''))
})
