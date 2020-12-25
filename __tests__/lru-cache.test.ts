import LruCache from './../src/lru-cache/index';

describe("LruCache", () => {
  test('set & get', () => {
    const cache = new LruCache<string, number>();
    cache.set("key1", 1);
    expect(cache.get("key1")).toEqual(1);
  });

  test('set & eviction', () => {
    const cache = new LruCache<string, number>();
    for(let i = 0; i < 3; i++) {
      cache.set(`key${i}`, i);
    }
    cache.eviction();

    expect(cache.get("key0")).toBeNull();
    expect(cache.length()).toEqual(2);
  });

  test('set & get & eviction', () => {
    const cache = new LruCache<string, number>();
    for(let i = 0; i < 3; i++) {
      cache.set(`key${i}`, i);
    }

    cache.get("key0");

    cache.eviction();

    // expected to be deleted "key1"
    expect(cache.length()).toEqual(2);
    expect(cache.get("key1")).toBeNull();
    expect(cache.get("key0")).toEqual(0);
  });
});
