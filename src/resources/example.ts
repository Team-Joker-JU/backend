const Example = () => {
  const body = JSON.stringify(null);
  const headers = { 'Content-type': 'application/json' };
  return new Response(body, { headers });
};

export default Example;
