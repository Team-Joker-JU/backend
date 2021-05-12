import { Router } from 'itty-router';
import Example from './resources/example';
import { getCoordsByPage, postCoord } from './resources/coords';

const router = Router();

router
  .get('/api/example', Example)
  .get('/api/coord/:page', getCoordsByPage)
  .post('/api/coord', postCoord)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request) => router.handle(request);
