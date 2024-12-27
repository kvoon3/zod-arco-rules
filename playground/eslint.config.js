import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'eslint-comments/no-unlimited-disable': 'warn',
    },
  },
)
