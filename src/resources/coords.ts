const postCoord = () => {
  const body = {
    status: 'added to database',
  };
  const headers = { 'Content-type': 'application/json' };
  return new Response(JSON.stringify(body), { headers });
};

const getAllCoords = () => {
  const body = {
    work: 'ing',
  };
  const headers = { 'Content-type': 'application/json' };
  return new Response(JSON.stringify(body), { headers });
};

export { postCoord, getAllCoords };
