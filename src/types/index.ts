import type { FieldRule, ValidatedError } from './arco'

// generaged by this lib
export interface Result {
  rules: ArcoRules
  handleSubmit: (
    handler: (values: object) => void,
    options?: {
      onSuccess?: (values: object) => void
      onError?: (error: Record<PropertyKey, string | string[]>) => void
    },
  ) => ArcoSubmitHandler
}

type ArcoSubmitHandler = (arg: {
  values: object
  errors: ArcoErrors | undefined
}, ev: Event) => any

export type ArcoRules = Record<PropertyKey, FieldRule>

export type ArcoErrors = Record<PropertyKey, ValidatedError>
