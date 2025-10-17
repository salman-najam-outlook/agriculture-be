const { createClient } = require('redis');

class Redis {
  constructor() {
    this.client = null;
    this.clientPromise = null;
  }

  async getClient() {
    // If a client is already connected, reuse it
    if (this.client && this.client.isOpen) {
      return this.client;
    }

    // If a connection is in progress, wait for it
    if (this.clientPromise) {
      return this.clientPromise;
    }

    // Otherwise, initiate a new connection
    const host = process.env.REDIS_HOST || 'localhost';
    const port = process.env.REDIS_PORT || 6379;
    const password = process.env.REDIS_PASSWORD || null;

    const url = password
      ? `redis://:${password}@${host}:${port}`
      : `redis://${host}:${port}`;

    const client = createClient({ url });

    client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });

    this.clientPromise = client.connect()
      .then(() => {
        this.client = client;
        console.log(`✅ Redis connected successfully on ${host}:${port}`);
        return client;
      })
      .catch((err) => {
        console.error('❌ Redis failed to connect:', err);
        this.clientPromise = null;
        throw err;
      });

    return this.clientPromise;
  }

  async setKeyWithTtl(key, value, ttlSeconds) {
    try {
      const client = await this.getClient();
      await client.set(key, value, { EX: ttlSeconds, NX: true });
    } catch (error) {
      console.error(`Redis SET error for key: ${key}`, error);
    }
  }

  async getKey(key) {
    try {
      const client = await this.getClient();
      return await client.get(key);
    } catch (error) {
      console.error(`Redis GET error for key: ${key}`, error);
      return null;
    }
  }

  async removeKey(key) {
    try {
      const client = await this.getClient();
      await client.del(key);
    } catch (error) {
      console.error(`Redis DEL error for key: ${key}`, error);
    }
  }

  async incrementCounter(key, ttlSeconds = 2592000) {
    try {
      const client = await this.getClient();
      await client.incr(key);
      await client.expire(key, ttlSeconds);
    } catch (error) {
      console.error(`Redis INCR error for key: ${key}`, error);
    }
  }
}

module.exports = new Redis();