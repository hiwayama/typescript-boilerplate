/**
 * LRUのメモリキャッシュ
 */
export default class LruCache<K, V> {
  private map: Map<K, V>
  private keys: K[];

  constructor() {
    this.map = new Map<K, V>();
    this.keys = [];
  }

  /**
   * キャッシュから値を取得
   * @param key {K} 指定型のkey
   * @return {V | null} キャッシュに対応する値がある場合はその値。なければnull
   */
  get(key: K): V | null {
    const value = this.map.get(key);
    if (value == null) {
      return null;
    }
    this.access(key);
    return value;
  }

  /**
   * キャッシュに値を追加
   * @param key {K} 指定型のkey
   * @param value {V} 指定型のvalue
   */
  set(key: K, value: V) {
    const v = this.map.get(key);
    if (v == null) {
      this.map.set(key, value);
      this.keys.push(key);
    } else {
      this.access(key);
    }
  }

  /**
   * 最も参照がなかった要素を1つ削除
   */
  eviction(): V | null {
    const key = this.keys.shift();
    if (key != null) {
      const value = this.map.get(key);
      if (value != null) {
        this.map.delete(key);
        return value;
      }
    }
    return null;
  }

  /**
   * @return {number} 登録された要素数
   */
  length(): number {
    return this.map.size;
  }

  /**
   * 指定値にアクセスした場合の処理
   * @param key {K} 指定型のkey
   */
  private access(key: K) {
    // 指定keyを除いたあと最後尾に詰め直す
    this.keys = this.keys.filter((k) => k !== key);
    this.keys.push(key);
  }
}
