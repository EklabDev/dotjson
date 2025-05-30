import { splitPath, joinPath, getType, isPrimitive, deepClone } from './utils';

describe('Utility Functions', () => {
  describe('splitPath', () => {
    it('should split a simple path', () => {
      expect(splitPath('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    it('should split a path with array indices', () => {
      expect(splitPath('a[0].b[1]')).toEqual(['a', 0, 'b', 1]);
    });

    it('should handle custom separator', () => {
      expect(splitPath('a_b_c', '_')).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty path', () => {
      expect(splitPath('')).toEqual([]);
    });

    it('should handle path with only array indices', () => {
      expect(splitPath('[0][1][2]')).toEqual([0, 1, 2]);
    });
  });

  describe('joinPath', () => {
    it('should join simple path segments', () => {
      expect(joinPath(['a', 'b', 'c'])).toBe('a.b.c');
    });

    it('should join path segments with array indices', () => {
      expect(joinPath(['a', 0, 'b', 1])).toBe('a[0].b[1]');
    });

    it('should handle custom separator', () => {
      expect(joinPath(['a', 'b', 'c'], '_')).toBe('a_b_c');
    });

    it('should handle empty segments', () => {
      expect(joinPath([])).toBe('');
    });

    it('should handle segments with only array indices', () => {
      expect(joinPath([0, 1, 2])).toBe('[0][1][2]');
    });
  });

  describe('getType', () => {
    it('should return correct type for primitives', () => {
      expect(getType(1)).toBe('number');
      expect(getType('hello')).toBe('string');
      expect(getType(true)).toBe('boolean');
      expect(getType(null)).toBe('null');
      expect(getType(undefined)).toBe('undefined');
    });

    it('should return correct type for objects', () => {
      expect(getType({})).toBe('object');
      expect(getType([])).toBe('array');
      expect(getType(() => {})).toBe('function');
    });
  });

  describe('isPrimitive', () => {
    it('should return true for primitive values', () => {
      expect(isPrimitive(1)).toBe(true);
      expect(isPrimitive('hello')).toBe(true);
      expect(isPrimitive(true)).toBe(true);
      expect(isPrimitive(null)).toBe(true);
      expect(isPrimitive(undefined)).toBe(true);
    });

    it('should return false for non-primitive values', () => {
      expect(isPrimitive({})).toBe(false);
      expect(isPrimitive([])).toBe(false);
      expect(isPrimitive(() => {})).toBe(false);
    });
  });

  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(1)).toBe(1);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    it('should clone objects', () => {
      const obj = { a: 1, b: [2, 3], c: { d: 4 } };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
      expect(cloned.c).not.toBe(obj.c);
    });

    it('should handle circular references', () => {
      const obj: any = { a: 1 };
      obj.self = obj;
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned.self).toBe(cloned);
    });
  });
});
