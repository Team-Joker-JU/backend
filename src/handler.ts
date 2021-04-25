import { Router } from 'itty-router';
import Example from './resources/example';
import { getAllCoords, postCoord } from './resources/coords';

import {
  json,
  missing,
  error,
  status,
  withContent,
  withParams,
  ThrowableRouter,
  // @ts-ignore
} from 'itty-router-extras';

const router = Router();

router
  .get('/api/example', Example)
  .get('/api/coord', withContent, getAllCoords)
  .post('/api/coord', postCoord)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request) => router.handle(request);
