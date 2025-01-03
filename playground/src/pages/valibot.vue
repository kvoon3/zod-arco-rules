<script setup lang="ts">
import * as v from 'valibot'
import { useI18n } from 'vue-i18n'
import { valibotArcoRules } from 'zod-arco-rules'

const { t } = useI18n()

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(4), v.nonEmpty()),
  post: v.pipe(v.string(), v.minLength(2), v.nonEmpty()),
  isRead: v.boolean(),
})

const { rules, handleSubmit } = valibotArcoRules(schema)

type Form = v.InferInput<typeof schema>

const form = reactive<Form>({
  name: '',
  post: '',
  isRead: false,
})

const submitted = ref<Form[]>([])

const onSubmit = handleSubmit((value) => {
  submitted.value.push(value)
}, {
  onError(error) {
    console.error('error', error)
  },
})
</script>

<template>
  <a-form
    :model="form"
    :rules
    label-align="left"
    @submit="onSubmit"
  >
    <a-form-item
      field="name" :tooltip="t('form.username.tooltip')" :label="t('form.username.label')"
    >
      <a-input
        v-model="form.name"
        :placeholder="t('form.username.placeholder')"
      />
    </a-form-item>
    <a-form-item field="post" :label="t('form.post.label')">
      <a-input v-model="form.post" :placeholder="t('form.post.placeholder')" />
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead">
        {{ t('form.manual') }}
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">
        {{ t('button.submit') }}
      </a-button>
    </a-form-item>
  </a-form>
  <div border-t py5 dark:border-dark-1 flex="~ justify-between items-center">
    <span text-lg font-semibold>
      {{ t('txt.request-body') }}
    </span>
    <button i-ph-trash-duotone @click="submitted = []" />
  </div>
  <section flex="~ col" rounded bg-gray-100:75 p2 text-gray-500 leading-loose font-mono divide-y dark:bg-black hover:bg-op-100 dark:divide-dark>
    <div v-if="!submitted.length" font-semibold>
      {{ t('txt.no-data') }}
    </div>
    <div v-for="item, key in submitted" :key>
      <span>
        {{ item }}
      </span>
    </div>
  </section>
</template>
