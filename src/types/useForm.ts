import type { Ref } from 'vue'
import type { ArcoRules, HandleSubmit } from '.'

export interface UseFormResult<T = any> {
  rules: ArcoRules
  form: Ref<T>
  reset: () => void
  handleSubmit: HandleSubmit
}
