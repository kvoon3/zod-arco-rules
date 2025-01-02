<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { availableLocales, loadLanguageAsync } from '~/i18n'

const { locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <nav flex items-center justify-center gap8 text-center>
    <button i-ph-translate-duotone icon-btn @click="toggleLocales()" />
    <button i-ph-sun-dim-duotone dark="i-ph-moon-stars-duotone" icon-btn @click="() => toggleDark()" />
  </nav>
</template>
