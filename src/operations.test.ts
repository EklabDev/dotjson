import { get, set } from './operations';

describe('Get/Set Operations', () => {
  describe('get', () => {
    it('should get a value from a simple object', () => {
      const obj = { a: 1 };
      expect(get(obj, 'a')).toBe(1);
    });

    it('should get a value from a nested object', () => {
      const obj = { a: { b: { c: 1 } } };
      expect(get(obj, 'a.b.c')).toBe(1);
    });

    it('should get a value from an array', () => {
      const obj = { a: [1, 2, 3] };
      expect(get(obj, 'a[0]')).toBe(1);
      expect(get(obj, 'a[1]')).toBe(2);
      expect(get(obj, 'a[2]')).toBe(3);
    });

    it('should get a value from a nested array', () => {
      const obj = { a: [1, { b: 2 }] };
      expect(get(obj, 'a[1].b')).toBe(2);
    });

    it('should return undefined for non-existent paths', () => {
      const obj = { a: 1 };
      expect(get(obj, 'b')).toBeUndefined();
      expect(get(obj, 'a.b')).toBeUndefined();
      expect(get(obj, 'a[0]')).toBeUndefined();
    });

    it('should handle custom separator', () => {
      const obj = { a: { b: 1 } };
      expect(get(obj, 'a_b', '_')).toBe(1);
    });

    it('should handle type-safe get', () => {
      const obj = { a: { b: 'hello' } };
      const value = get<string>(obj, 'a.b');
      expect(value).toBe('hello');
    });
  });

  describe('set', () => {
    it('should set a value in a simple object', () => {
      const obj = { a: 1 };
      const result = set(obj, 'b', 2);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should set a value in a nested object', () => {
      const obj = { a: { b: 1 } };
      const result = set(obj, 'a.c', 2);
      expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it('should set a value in an array', () => {
      const obj = { a: [1, 2, 3] };
      const result = set(obj, 'a[1]', 4);
      expect(result).toEqual({ a: [1, 4, 3] });
    });

    it('should set a value in a nested array', () => {
      const obj = { a: [1, { b: 2 }] };
      const result = set(obj, 'a[1].c', 3);
      expect(result).toEqual({ a: [1, { b: 2, c: 3 }] });
    });

    it('should create intermediate objects and arrays', () => {
      const obj = {};
      const result = set(obj, 'a[0].b.c', 1);
      expect(result).toEqual({ a: [{ b: { c: 1 } }] });
    });

    it('should handle custom separator', () => {
      const obj = { a: 1 };
      const result = set(obj, 'b_c', 2, '_');
      expect(result).toEqual({ a: 1, b: { c: 2 } });
    });

    it('should handle type-safe set', () => {
      const obj = { a: 1 };
      const result = set<typeof obj>(obj, 'b', 2);
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should not modify the original object', () => {
      const obj = { a: 1 };
      const result = set(obj, 'b', 2);
      expect(obj).toEqual({ a: 1 });
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });
});
