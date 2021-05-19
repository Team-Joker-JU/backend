import { Router } from 'itty-router';
import { getCoordsByPage, postCoord } from './resources/coords';

const router = Router();

router
  .get('/api/coord/:page', getCoordsByPage)
  .post('/api/coord', postCoord)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request) => router.handle(request);
