import nfetch from '../src/index';
import { initServeTest } from './utils';

const url = 'http://localhost:3000';

describe('Methods', () => {
  beforeAll(() => initServeTest())

  it('Test GET', async () => {
    const res = await nfetch.get(url);
    const { method } = await res.data();

    expect(method).toBe('GET');
  })

  it('Test POST', async () => {
    const res = await nfetch.post(url, {});
    const { method } = await res.data();

    expect(method).toBe('POST');
  })

  it('Test PUT', async () => {
    const res = await nfetch.put(url, {});
    const { method } = await res.data();

    expect(method).toBe('PUT');
  })

  it('Test DELETE', async () => {
    const res = await nfetch.delete(url, {});
    const { method } = await res.data();

    expect(method).toBe('DELETE');
  })
});

describe('Multi-request', () => {
})

describe('Body Response', () => {
  const test = 'test'

  it('Test POST', async () => {
    const res = await nfetch.post(`${url}/body`, { test });
    expect(await res.data()).toBe({ test });
  })

  it('Test PUT', async () => {
    const res = await nfetch.put(`${url}/body`, { test });
    expect(await res.data()).toBe({ test });
  })

  it('Test DELETE', async () => {
    const res = await nfetch.delete(`${url}/body`, { test });
    expect(await res.data()).toBe({ test });
  })
})
