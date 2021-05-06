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
          upsert: If(
            Exists(Var('ref')),
            Update(Select(['ref'],
            Get(Var('ref'))),
            {
              data: {
                points: Append({ X: content.X, Y: content.Y }, Select(['data', 'points'], Get(Var('ref')))),
              },
            }),

            Create(Collection('coordinates'), {
              data: {
                session: content.session,
                points: [{ X: content.X, Y: content.Y }]
                
              },
            }),
          ),
        },
        Var('upsert'),
      ),
    );
  
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    const faunaError = getFaunaError(error);

    return new Response(JSON.stringify(faunaError), { headers });
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
