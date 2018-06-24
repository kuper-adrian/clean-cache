/**
 * Class for objects stored in cache.
 */
class CacheItem {
  constructor(value, ttl) {
    this.value = value;
    this.expiresAt = (new Date()).getTime() + ttl;
  }
}

/**
 * Class for caching objects in memory based on a key for a given amount of "cache time" (ttl).
 */
class Cache {
  /**
   * Constructor.
   *
   * @param {number} ttl Time an item remains in cache (in ms).
   */
  constructor(ttl = 60000) {
    this.items = {};
    this.ttl = ttl;
  }

  /**
   * Adds an object to the cache.
   *
   * Throws an error, if there already is an object under the given key.
   *
   * @param {string} key Key to store the item under
   * @param {object} value The object to store in cache
   */
  add(key, value, ttl = null) {
    if (key === null) {
      throw new Error("Can't add object under key 'null'");
    } else if (key === undefined) {
      throw new Error("Can't add object under key 'undefined'");
    }

    if (value === null) {
      throw new Error("Can't add 'null' to cache");
    } else if (value === undefined) {
      throw new Error("Can't add 'undefined' to cache");
    }

    if (this.items[key] !== undefined && this.items[key] !== null) {
      // if the item in cache exceeded the cache item, it is invalid and can be replaced
      if (Cache.isItemInvalid(this.items[key])) {
        // add item to cache
        this.items[key] = new CacheItem(value, ttl === null ? this.ttl : ttl);
      } else {
        throw new Error(`There already is an object stored under the key '${key}'`);
      }
    } else {
      this.items[key] = new CacheItem(value, ttl === null ? this.ttl : ttl);
    }
  }

  /**
   * Retrieves an object from the cache and returns it. If no object is found
   * for the given key, null is returned instead.
   *
   * @param {string} key Key of object to retrieve.
   */
  retrieve(key) {
    if (key === null) {
      throw new Error("Invalid argument 'null'");
    } else if (key === undefined) {
      throw new Error("Invalid argument 'undefined'");
    }

    if (this.items[key] !== undefined && this.items[key] !== null) {
      if (Cache.isItemInvalid(this.items[key])) {
        delete this.items[key]; // remove item from cache
        return null;
      }
      return this.items[key].value;
    }
    return null;
  }

  /**
   * Removes all objects that exceeded their ttl from the cache.
   */
  tidy() {
    Object.keys(this.items).forEach((key) => {
      if (Cache.isItemInvalid(this.items[key])) {
        delete this.items[key]; // remove item from cache
      }
    });
  }

  count() {
    let count = 0;
    Object.values(this.items).forEach((value) => {
      if (!Cache.isItemInvalid(value)) {
        count += 1;
      }
    });
    return count;
  }

  /**
   * Returns true if item is expired.
   *
   * @param {CacheItem} item item to validate
   */
  static isItemInvalid(item) {
    if (item === null) {
      throw new Error("Invalid parameter 'null'");
    } else if (item === undefined) {
      throw new Error("Invalid parameter 'undefined'");
    }

    return (new Date()).getTime() >= item.expiresAt;
  }
}

exports.Cache = Cache;
