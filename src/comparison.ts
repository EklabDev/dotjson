import { JsonDiff, ComparisonOptions } from './types';
import { jsonToDot } from './conversion';
import { getType } from './utils';

/**
 * Compares two JSON objects and returns the differences
 * @param obj1 - The first object to compare
 * @param obj2 - The second object to compare
 * @param options - Options for the comparison
 * @returns The differences between the objects
 */
export function compareJson(obj1: any, obj2: any, options: ComparisonOptions = {}): JsonDiff {
  const { ignoreCase = false, ignoreUndefined = false } = options;
  const dot1 = jsonToDot(obj1, options);
  const dot2 = jsonToDot(obj2, options);

  const diff: JsonDiff = {
    added: {},
    removed: {},
    modified: {},
    typeChanges: {},
  };

  // Find added and modified properties
  for (const key in dot2) {
    if (!(key in dot1)) {
      if (!ignoreUndefined || dot2[key] !== undefined) {
        diff.added[key] = dot2[key];
      }
    } else {
      const value1 = dot1[key];
      const value2 = dot2[key];

      if (ignoreUndefined && (value1 === undefined || value2 === undefined)) {
        continue;
      }

      if (ignoreCase && typeof value1 === 'string' && typeof value2 === 'string') {
        if (value1.toLowerCase() !== value2.toLowerCase()) {
          diff.modified[key] = { old: value1, new: value2 };
        }
      } else if (value1 !== value2) {
        const type1 = getType(value1);
        const type2 = getType(value2);

        if (type1 !== type2) {
          diff.typeChanges[key] = { old: type1, new: type2 };
        } else {
          diff.modified[key] = { old: value1, new: value2 };
        }
      }
    }
  }

  // Find removed properties
  for (const key in dot1) {
    if (!(key in dot2)) {
      if (!ignoreUndefined || dot1[key] !== undefined) {
        diff.removed[key] = dot1[key];
      }
    }
  }

  return diff;
}

/**
 * Checks if two JSON objects are equal
 * @param obj1 - The first object to compare
 * @param obj2 - The second object to compare
 * @param options - Options for the comparison
 * @returns Whether the objects are equal
 */
export function isEqual(obj1: any, obj2: any, options: ComparisonOptions = {}): boolean {
  const diff = compareJson(obj1, obj2, options);
  console.log(diff);
  return (
    Object.keys(diff.added).length === 0 &&
    Object.keys(diff.removed).length === 0 &&
    Object.keys(diff.modified).length === 0 &&
    Object.keys(diff.typeChanges).length === 0
  );
}
