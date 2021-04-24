import { faunaClient } from '../config/db';
import { getFaunaError } from '../config/faunaUtils';
import faunadb from 'faunadb';
const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Sum,
  Delete,
  Add,
  Select,
  Let,
  Var,
  Update,
} = faunadb.query;

async function postCoord() {
  const headers = { 'Content-type': 'application/json' };
  try {
    const result = await faunaClient.query(
      Add(Collection('coordinates'), {
        data: {
          X: 1,
          Y: 2,
        },
      }),
    );
    return new Response(JSON.stringify('Added'), { headers });
  } catch (error) {
    const faunaError = getFaunaError(error);
    return new Response(JSON.stringify(faunaError.status), { headers });
  }
}

async function getAllCoords() {
  try {
    const result = await faunaClient.query(Get(Ref(Collection('coordinates'))));
    const headers = { 'Content-type': 'application/json' };
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {}
}

export { postCoord, getAllCoords };
