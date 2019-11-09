// import nfetch from '../src/index';

// async function initServeTest() {
//   const server =

//   // Samples requests
//   server.get('/', (req, res) => res.end(req.method));
//   server.post('/', (req, res) => res.end(req.method));
//   server.put('/', (req, res) => res.end(req.method));
//   server.patch('/', (req, res) => res.end(req.method));
//   server.delete('/', (req, res) => res.end(req.method));

//   return server;
// }

// describe('GET', () => {
//   it('Sample', async () => {
//     const { url } = await initServeTest();

//     const result = await nfetch.get(url);
//     expect(await result.text()).toBe('GET');
//   })
// });
