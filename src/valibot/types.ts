import type { BaseIssue, BaseSchema, Config, InferIssue, ObjectSchema } from 'valibot'

export type ValibotConfig = Config<InferIssue<BaseSchema<unknown, unknown, BaseIssue<unknown>>>>

export type AnyObjectSchema = ObjectSchema<any, any>
