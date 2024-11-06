import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
  config: {
    scalars: {
      JWT: 'string',
      Date: 'Date',
    },
    enumsAsTypes: true,
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;