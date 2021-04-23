import faunadb from 'faunadb';

const connectDB = () => {
  try {
    const c = new faunadb.Client({
      secret: 'your secret',
      fetch: (url: any, params: any) => {
        const signal = params.signal;
        delete params.signal;
        const abortPromise = new Promise<Response>((resolve) => {
          if (signal) {
            signal.onabort = resolve;
          }
        });
        return Promise.race([abortPromise, fetch(url, params)]);
      },
    });
    console.log(`FaunaDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
