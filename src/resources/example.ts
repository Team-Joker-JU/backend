const Example = () => {
  const body = {
    work: 'ing',
  };
  const headers = { 'Content-type': 'application/json' };
  return new Response(JSON.stringify(body), { headers });
};

export default Example;
