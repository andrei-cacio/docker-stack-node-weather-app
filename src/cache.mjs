import pkg from 'async-redis';

const { createClient } = pkg;

let clientRef = null;


const ttl = {
  SHORT: 10,
  LONG: 60 * 60
}

async function initCache() {
  const client = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  });
  
  client.on('error', err => console.error('Redis client error', err));
  client.on('connect', () => console.log('Redis connection [OK]'));


  clientRef = client;
}

function toCache(key, value, ttl) {
  if (clientRef) {
    clientRef.set(key, value, 'EX', ttl);
  }
}

async function fromCache(key) {
  if (clientRef) {
    return await clientRef.get(key);    
  }
}

function invalidateKey(key) {
  if (clientRef) {
    clientRef.del(key);
  }
}

export { initCache, toCache, fromCache, invalidateKey, ttl };