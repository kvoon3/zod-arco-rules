<script setup lang="ts">
import * as z from 'zod'
import { zodArcoRules } from 'zod-arco-rules'

const schema = z.object({
  name: z.string().min(4).nonempty(),
  post: z.string().min(2).max(30).nonempty(),
  isRead: z.boolean(),
})

type Form = z.infer<typeof schema>

const form = reactive<Form>({
  name: '',
  post: '',
  isRead: false,
})

const { rules, handleSubmit } = zodArcoRules(schema)

const submitted = ref<Form[]>([])

const onSubmit = handleSubmit(async (values) => {
  const response = await fetch('/message', {
    method: 'POST',
    body: JSON.stringify(values),
  })
  const data = await response.json()
  submitted.value.push(data)
}, {
  onError(error) {
    console.error(error)
  },
})
</script>

<template>
  <div mxa mt4 rounded container>
    <h1 mt10 block h1 h15 text-center text-2xl font-semibold leading-loose font-mono>
      Zod Arco Rules Playground
    </h1>
    <main mxa w-150 border rounded p10>
      <a-form
        :model="form"
        :rules
        label-align="left"
        @submit="onSubmit"
      >
        <a-form-item
          field="name" tooltip="Please enter username" label="Username"
        >
          <a-input
            v-model="form.name"
            placeholder="please enter your username..."
          />
        </a-form-item>
        <a-form-item field="post" label="Post">
          <a-input v-model="form.post" placeholder="please enter your post..." />
        </a-form-item>
        <a-form-item field="isRead">
          <a-checkbox v-model="form.isRead">
            I have read the manual
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>
      <div border-t py5 text-lg font-semibold flex="~ justify-between items-center">
        <span>
          Request Body
        </span>
        <button i-ph-trash-duotone @click="submitted = []" />
      </div>
      <section flex="~ col" rounded bg-gray-100:75 p2 text-gray-500 leading-loose font-mono divide-y dark:bg-black hover:bg-op-100 dark:divide-dark>
        <div v-if="!submitted.length" font-semibold>
          No Data
        </div>
        <div v-for="item, key in submitted" :key>
          <span>
            {{ item }}
          </span>
        </div>
      </section>
    </main>
  </div>
</template>
