import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import en from 'zod-i18n-map/locales/en/zod.json'
import zhCN from 'zod-i18n-map/locales/zh-CN/zod.json'

const resources = {
  'zh-CN': { zod: zhCN },
  'en': { zod: en },
}

i18next.init({
  lng: '',
  resources,
})

z.setErrorMap(zodI18nMap)

function setI18nLanguage(lang: keyof typeof resources) {
  i18next.changeLanguage(lang)
}

export {
  setI18nLanguage,
  z,
}
