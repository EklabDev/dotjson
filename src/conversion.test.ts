import { jsonToDot, dotToJson, flatten, unflatten } from './conversion';

describe('Conversion Functions', () => {
  describe('jsonToDot', () => {
    it('should convert a simple object to dot notation', () => {
      const input = { a: 1, b: 2 };
      const expected = { a: 1, b: 2 };
      expect(jsonToDot(input)).toEqual(expected);
    });

    it('should convert a nested object to dot notation', () => {
      const input = { a: { b: { c: 1 } } };
      const expected = { 'a.b.c': 1 };
      expect(jsonToDot(input)).toEqual(expected);
    });

    it('should convert an array to dot notation', () => {
      const input = { a: [1, 2, 3] };
      const expected = { 'a[0]': 1, 'a[1]': 2, 'a[2]': 3 };
      expect(jsonToDot(input)).toEqual(expected);
    });

    it('should convert a complex nested structure to dot notation', () => {
      const input = {
        a: {
          b: [1, { c: 2 }],
          d: { e: 3 },
        },
      };
      const expected = {
        'a.b[0]': 1,
        'a.b[1].c': 2,
        'a.d.e': 3,
      };
      expect(jsonToDot(input)).toEqual(expected);
    });

    it('should handle custom separator', () => {
      const input = { a: { b: 1 } };
      const expected = { a_b: 1 };
      expect(jsonToDot(input, { separator: '_' })).toEqual(expected);
    });

    it('should handle non-preserved array indices', () => {
      const input = { a: [1, 2, 3] };
      const expected = { 'a.0': 1, 'a.1': 2, 'a.2': 3 };
      expect(jsonToDot(input, { preserveArrayIndices: false })).toEqual(expected);
    });
  });

  describe('dotToJson', () => {
    it('should convert dot notation to a simple object', () => {
      const input = { a: 1, b: 2 };
      const expected = { a: 1, b: 2 };
      expect(dotToJson(input)).toEqual(expected);
    });

    it('should convert dot notation to a nested object', () => {
      const input = { 'a.b.c': 1 };
      const expected = { a: { b: { c: 1 } } };
      expect(dotToJson(input)).toEqual(expected);
    });

    it('should convert dot notation with array indices', () => {
      const input = { 'a[0]': 1, 'a[1]': 2, 'a[2]': 3 };
      const expected = { a: [1, 2, 3] };
      expect(dotToJson(input)).toEqual(expected);
    });

    it('should convert complex dot notation structure', () => {
      const input = {
        'a.b[0]': 1,
        'a.b[1].c': 2,
        'a.d.e': 3,
      };
      const expected = {
        a: {
          b: [1, { c: 2 }],
          d: { e: 3 },
        },
      };
      expect(dotToJson(input)).toEqual(expected);
    });

    it('should handle custom separator', () => {
      const input = { a_b: 1 };
      const expected = { a: { b: 1 } };
      expect(dotToJson(input, { separator: '_' })).toEqual(expected);
    });
  });

  describe('flatten and unflatten', () => {
    it('should flatten and unflatten an object', () => {
      const input = {
        a: {
          b: [1, { c: 2 }],
          d: { e: 3 },
        },
      };
      const flattened = flatten(input);
      const unflattened = unflatten(flattened);
      expect(unflattened).toEqual(input);
    });

    it('should handle custom separator', () => {
      const input = { a: { b: 1 } };
      const flattened = flatten(input, '_');
      const unflattened = unflatten(flattened, '_');
      expect(unflattened).toEqual(input);
    });
  });
});
