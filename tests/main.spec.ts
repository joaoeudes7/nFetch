import nfetch from '../src/index';
import { initServeTest } from './utils';

const { url } = initServeTest();

describe('Methods', () => {
  it('Test GET', async () => {
    const { data } = await nfetch.get(url);
    expect(data).toBe('GET');
  })

  it('Test POST', async () => {
    const { data } = await nfetch.post(url, {});
    expect(data).toBe('POST');
  })

  it('Test PUT', async () => {
    const { data } = await nfetch.put(url, {});
    expect(data).toBe('PUT');
  })

  it('Test DELETE', async () => {
    const { data } = await nfetch.delete(url, {});
    expect(data).toBe('DELETE');
  })
});

describe('Multi-request', () => {
})

describe('Body', () => {
})
