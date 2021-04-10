import { Router } from 'itty-router';

import Example from './resources/example';

const router = Router();

router
  .get('/api/example', Example)
  .get('*', () => new Response('Not found', { status: 404 }));

export const handleRequest = (request: Request) => router.handle(request);
