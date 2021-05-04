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
  Equals,
  Exists,
  If,
  Append,
} = faunadb.query;

async function postCoord(request: Request) {
  const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  try {
    const content = await request.json();

    const result = await faunaClient.query(
      Let(
        {
          ref: Match(Index('getSession'), content.session),
          doc: Get(Var('ref')),
          array: Select(['data', 'points'], Var('doc')),
          upsert: If(
            Exists(Var('ref')),
            Update(Select(['ref'], Get(Var('doc'))), {
              data: {
                points: Append({ X: content.X, Y: content.Y }, Var('array')),
              },
            }),

            Create(Collection('coordinates'), {
              data: {
                points: [{ X: content.X, Y: content.Y }],
                session: content.session,
              },
            }),
          ),
        },
        Var('upsert'),
      ),
    );

    console.log(result);

    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    const faunaError = getFaunaError(error);
    console.error(error);
    console.error(error.requestResult);
    return new Response(JSON.stringify(faunaError.status), { headers });
  }
}

const getCoordsBySession = async (request: Request) => {
  const headers = {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    // @ts-ignore
    const sessionID = request.params.session;
    console.log(sessionID);

    const result = await faunaClient.query(
      Get(Ref(Collection('coordinates'), sessionID)),
    );
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { headers });
  }
};

export { postCoord, getCoordsBySession };
