import { Resolvers } from '../generated/graphql';
import * as helloWorldMutations from './hello-world/mutations';
import * as helloWorldQueries from './hello-world/queries';

const Query = {
  ...helloWorldQueries
}

const Mutation = {
  ...helloWorldMutations
}

export const resolvers: Resolvers = {
  Query,
  Mutation
}