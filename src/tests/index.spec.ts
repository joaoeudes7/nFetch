import nFetch from '../index';

test('GET', async () => {
  const res = await nFetch.get('https://jsonplaceholder.typicode.com/todos/1')
  const data = res.data
  expect(typeof data).toEqual('object')
});

test('POST', async () => {
  const obj = { title: 'foo', body: 'bar', userId: 1 };
  const res = await nFetch.post('https://jsonplaceholder.typicode.com/todos/1', obj)
  const data = res.data

  expect(data).toBe(obj)
});
