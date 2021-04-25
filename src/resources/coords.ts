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

async function postCoord(request: Request) {
  const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  try {
    const content = await request.json();
    const result = await faunaClient.query(
      Create(Collection('coordinates'), {
        data: {
          X: content.X,
          Y: content.Y,
          session: 0,
        },
      }),
    );
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    const faunaError = getFaunaError(error);
    return new Response(JSON.stringify(faunaError.status), { headers });
  }
}

const getAllCoords = async (request: Request) => {
  const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const id = 296843889070834181;
    const result = await faunaClient.query(
      Get(Ref(Collection('coordinates'), id)),
    );
    console.log(result);
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { headers });
  }
};

export { postCoord, getAllCoords };
