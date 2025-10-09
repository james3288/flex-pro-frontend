import instance from "../others/axiosInstance";

// Cache map: path -> { objectUrl, size, etag, lastModified }
const cache = new Map();

/**
 * Clear the image cache (revokes object URLs)
 */
export const clearImageCache = () => {
  for (const value of cache.values()) {
    try {
      if (value?.objectUrl) URL.revokeObjectURL(value.objectUrl);
    } catch (e) {
      // ignore
    }
  }
  cache.clear();
};

const loadImageData = async (path) => {
  if (!path) return null;

  try {
    // Try HEAD request to get metadata (content-length / etag / last-modified)
    let headHeaders = {};
    try {
      const headResp = await instance.head(path);
      headHeaders = headResp.headers || {};
    } catch (headErr) {
      // HEAD may not be supported by the server; we'll fallback to full GET below
      headHeaders = {};
    }

    const size = headHeaders["content-length"] || headHeaders["Content-Length"];
    const etag = headHeaders["etag"];
    const lastModified = headHeaders["last-modified"];

    const cached = cache.get(path);

    // If we have cached metadata and it matches, return cached objectUrl
    if (cached) {
      const sizeMatches = size ? String(cached.size) === String(size) : true;
      const etagMatches = etag ? cached.etag === etag : true;
      const lmMatches = lastModified
        ? cached.lastModified === lastModified
        : true;

      if (sizeMatches && etagMatches && lmMatches && cached.objectUrl) {
        return cached.objectUrl;
      }
    }

    // Otherwise fetch the blob
    const response = await instance.get(path, { responseType: "blob" });
    const blob = response.data;

    // Create object URL for the blob
    const objectUrl = URL.createObjectURL(blob);

    // Revoke previously cached objectUrl to avoid memory leaks
    if (cached?.objectUrl) {
      try {
        URL.revokeObjectURL(cached.objectUrl);
      } catch (e) {
        // ignore
      }
    }

    // Use headers from GET if HEAD did not provide them
    const respHeaders = response.headers || {};
    const finalSize = size || respHeaders["content-length"] || blob.size;
    const finalEtag = etag || respHeaders["etag"];
    const finalLastModified = lastModified || respHeaders["last-modified"];

    // Store metadata in cache
    cache.set(path, {
      objectUrl,
      size: finalSize,
      etag: finalEtag,
      lastModified: finalLastModified,
    });

    return objectUrl;
  } catch (error) {
    console.error(`Error fetching image at ${path}:`, error?.message || error);
    return null;
  }
};

export default loadImageData;
