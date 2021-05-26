import { faunaClient } from '../config/db';
import { getFaunaError } from '../config/faunaUtils';
import faunadb, { Any } from 'faunadb';
const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Select,
  Let,
  Var,
  Update,
  Exists,
  If,
  Append,
  Map,
  Lambda,
  Reverse,
} = faunadb.query;

const headers = {
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

/**
 * Posting coords to database
 * Include session and X,Y coordinate in a json object
 */
async function postCoord(request: Request) {
  try {
    const content = await request.json();

    const result = await faunaClient.query(
      Let(
        {
          ref: Match(Index('getSession'), content.session),
          upsert: If(
            Exists(Var('ref')),
            Update(Select(['ref'], Get(Var('ref'))), {
              data: {
                points: Append(
                  { collision: content.collision, X: content.X, Y: content.Y },
                  Select(['data', 'points'], Get(Var('ref'))),
                ),
              },
            }),

            Create(Collection('coordinates'), {
              data: {
                session: content.session,
                points: [
                  { collision: content.collision, X: content.X, Y: content.Y },
                ],
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

/**
 * Getting coordinates from database
 * Example: /api/coord/1 will give the newest 5 routes, /2 will give the second newest 5 routes
 */
const getCoordsByPage = async (request: Request) => {
  try {
    // @ts-ignore
    const page = request.params.page;

    const getCorrect = await faunaClient.query(
      Map(
        Paginate(Match(Index('all_coords')), {
          size: (page - 1) * 5,
          before: null,
        }),

        Lambda('X', Get(Var('X'))),
      ),
    );

    var before = null;
    if (page != 1) {
      // @ts-ignore
      before = getCorrect.data[0].ref.value.id;
    }

    const result = await faunaClient.query(
      Map(
        Reverse(
          Paginate(Match(Index('all_coords')), {
            size: 5,
            before:
              before === null
                ? before
                : [Ref(Collection('coordinates'), before)],
          }),
        ),
        Lambda('X', Get(Var('X'))),
      ),
    );

    //Translate for front end
    var coordinates: any[] = [];

    // @ts-ignore
    for (let index = 0; index < result.data.length; index++) {
      // @ts-ignore
      coordinates.push(result.data[index].data.points);
    }

    return new Response(JSON.stringify(coordinates), { headers });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { headers });
  }
};

export { postCoord, getCoordsByPage };
