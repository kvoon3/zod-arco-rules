<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { availableLocales, loadLanguageAsync } from '~/i18n'

const { locale } = useI18n()
const route = useRoute()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <nav flex items-center justify-between text-center>
    <div border rounded px2 py1 dark:border-dark-1>
      <RouterLink :class="route.path === '/' ? 'op100' : 'op50'" to="/">
        Zod
      </RouterLink>
      <span mx2 border dark:border-dark-1 />
      <RouterLink :class="route.path === '/valibot' ? 'op100' : 'op50'" to="/valibot">
        Valibot
      </RouterLink>
    </div>

    <div space-x-6>
      <button i-ph-translate-duotone icon-btn @click="toggleLocales()" />
      <button i-ph-sun-dim-duotone dark="i-ph-moon-stars-duotone" icon-btn @click="() => toggleDark()" />
    </div>
  </nav>
</template>
