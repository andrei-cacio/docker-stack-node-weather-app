import fetch from 'node-fetch';

async function get(url) {
  const res = await fetch(url, { method: 'GET' });
  const json = await res.json();

  return json;
}

export { get };