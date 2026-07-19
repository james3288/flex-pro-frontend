import instance from "../others/axiosInstance";

/**
 * getExtendedSubscription(id, options)
 * options:
 *   - cache (boolean) default true
 *   - ttl (ms) default 60_000
 *   - maxCache (number) default 100
 *   - signal (AbortSignal) optional (if supported by your axios)
 */
const defaultOptions = {
  cache: true,
  ttl: 60_000,
  maxCache: 100,
};

const cache = new Map(); // key -> { data, expiresAt, promise }

function evictIfNeeded(maxSize) {
  while (cache.size > maxSize) {
    // Map preserves insertion order; remove oldest
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
}

const getExtendedSubscription = async (id, opts = {}) => {
  const {
    cache: useCache,
    ttl,
    maxCache,
    signal,
  } = { ...defaultOptions, ...opts };

  if (!id) {
    return Promise.reject(
      new TypeError("getExtendedSubscription: id is required")
    );
  }

  const url = `/api/get_extended_subscription/${id}`;

  // Check cache/dedupe
  if (useCache) {
    const entry = cache.get(id);
    if (entry) {
      // still valid
      if (entry.expiresAt && entry.expiresAt > Date.now()) {
        if (entry.data !== undefined) return entry.data;
        if (entry.promise) return entry.promise;
      } else {
        cache.delete(id);
      }
    }
  }

  const requestPromise = (async () => {
    try {
      // Axios accepts AbortSignal as { signal } in request config (modern axios).
      const config = signal ? { signal } : undefined;
      const { data } = await instance.get(url, config);
      if (useCache) {
        cache.set(id, { data, expiresAt: Date.now() + ttl });
        evictIfNeeded(maxCache);
      }
      return data;
    } catch (err) {
      // if we stored a pending promise for this id, remove it so future calls can retry
      const stored = cache.get(id);
      if (stored && stored.promise) {
        cache.delete(id);
      }
      throw err;
    }
  })();

  // store pending promise (so concurrent calls are deduped)
  if (useCache) {
    cache.set(id, { promise: requestPromise, expiresAt: Date.now() + ttl });
    evictIfNeeded(maxCache);
  }

  return requestPromise;
};

// helpers
getExtendedSubscription.clearCache = () => cache.clear();
getExtendedSubscription.deleteCacheEntry = (id) => cache.delete(id);

export default getExtendedSubscription;
