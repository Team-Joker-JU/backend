import faunadb from 'faunadb';
import { customFetch, getFaunaError } from './faunaUtils';

const faunaClient = new faunadb.Client({
  secret: 'fnAEHfPJc6ACBUNVmyCgsStqET7iPr8NeemhnI3r',
  fetch: customFetch,
});

export { faunaClient };
