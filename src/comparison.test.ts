import { compareJson, isEqual } from './comparison';

describe('Comparison Functions', () => {
  describe('compareJson', () => {
    it('should detect added properties', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 1, b: 2 };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({ b: 2 });
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({});
      expect(diff.typeChanges).toEqual({});
    });

    it('should detect removed properties', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1 };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({ b: 2 });
      expect(diff.modified).toEqual({});
      expect(diff.typeChanges).toEqual({});
    });

    it('should detect modified properties', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({ b: { old: 2, new: 3 } });
      expect(diff.typeChanges).toEqual({});
    });

    it('should detect type changes', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: '1' };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({});
      expect(diff.typeChanges).toEqual({ a: { old: 'number', new: 'string' } });
    });

    it('should handle nested objects', () => {
      const obj1 = { a: { b: 1 } };
      const obj2 = { a: { b: 2 } };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({ 'a.b': { old: 1, new: 2 } });
      expect(diff.typeChanges).toEqual({});
    });

    it('should handle arrays', () => {
      const obj1 = { a: [1, 2, 3] };
      const obj2 = { a: [1, 4, 3] };
      const diff = compareJson(obj1, obj2);
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({ 'a[1]': { old: 2, new: 4 } });
      expect(diff.typeChanges).toEqual({});
    });

    it('should handle case-insensitive string comparison', () => {
      const obj1 = { a: 'Hello' };
      const obj2 = { a: 'hello' };
      const diff = compareJson(obj1, obj2, { ignoreCase: true });
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({});
      expect(diff.typeChanges).toEqual({});
    });

    it('should handle undefined values', () => {
      const obj1 = { a: undefined };
      const obj2 = { a: 1 };
      const diff = compareJson(obj1, obj2, { ignoreUndefined: true });
      expect(diff.added).toEqual({});
      expect(diff.removed).toEqual({});
      expect(diff.modified).toEqual({});
      expect(diff.typeChanges).toEqual({});
    });
  });

  describe('isEqual', () => {
    it('should return true for equal objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for different objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 3 } };
      expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should handle case-insensitive string comparison', () => {
      const obj1 = { a: 'Hello' };
      const obj2 = { a: 'hello' };
      expect(isEqual(obj1, obj2, { ignoreCase: true })).toBe(true);
    });

    it('should handle undefined values', () => {
      const obj1 = { a: undefined };
      const obj2 = { a: 1 };
      expect(isEqual(obj1, obj2, { ignoreUndefined: true })).toBe(true);
    });
  });
});
