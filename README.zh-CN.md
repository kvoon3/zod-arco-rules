# zod-arco-rules

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

将 Zod 或 Valibot schema 转换成 Arco Design Vue 表单校验规则 - 写一次 schema，同时得到「类型安全 + 表单校验」

## 安装

```sh
# 使用 Zod
npm i zod zod-arco-rules

# 使用 Valibot
npm i valibot zod-arco-rules
```

## 快速上手

### 组合式 api (推荐)

```vue
<script setup lang="ts">
import * as z from 'zod'
import { useForm } from 'zod-arco-rules'
// import { useForm } from 'zod-arco-rules/valibot'

const { rules, form, handleSubmit, reset } = useForm(z.object({
  name: z.string().nonempty().default('Kevin'),
  post: z.string().min(2).max(30),
  isRead: z.boolean().default(false),
}))

const onSubmit = handleSubmit((values) => {
  console.log('✅ valid', values)
  reset()
})
</script>

<template>
  <a-form :model="form" :rules @submit="onSubmit">
    <!-- ... -->
  </a-form>
</template>
```

### 手动用法（已有表单数据时）

```vue
<script setup lang="ts">
import * as z from 'zod'
import { arcoRules, handleSubmit } from 'zod-arco-rules'
// import { arcoRules, handleSubmit } from 'zod-arco-rules/valibot'

const rules = arcoRules(z.object({
  name: z.string().nonempty(),
  post: z.string().min(2).max(30),
  isRead: z.boolean(),
}))

const form = ref({
  name: '',
  post: '',
  isRead: false
})

const onSubmit = handleSubmit((values) => {
  // Handle the validated values here
}, { rules })
</script>

<template>
  <a-form :model="form" :rules @submit="onSubmit">
    <!-- ... -->
  </a-form>
</template>
```

## Todos

- [x] Valibot support
- [x] useForm

## License

[MIT](./LICENSE) License © 2024-PRESENT [Kevin Kwong](https://github.com/kvoon3)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/zod-arco-rules?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/zod-arco-rules
[npm-downloads-src]: https://img.shields.io/npm/dm/zod-arco-rules?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/zod-arco-rules
[bundle-src]: https://img.shields.io/bundlephobia/minzip/zod-arco-rules?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=zod-arco-rules
[license-src]: https://img.shields.io/github/license/kvoon3/zod-arco-rules.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/kvoon3/zod-arco-rules/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/zod-arco-rules
