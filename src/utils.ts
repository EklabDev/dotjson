import { PathSegment } from './types';

/**
 * Splits a dot notation path into segments
 * @param path - The dot notation path
 * @param separator - The separator to use (default: '.')
 * @returns Array of path segments
 */
export function splitPath(path: string, separator: string = '.'): PathSegment[] {
  const segments: PathSegment[] = [];
  let current = '';
  let inBrackets = false;

  for (let i = 0; i < path.length; i++) {
    const char = path[i];

    if (char === '[') {
      if (current) {
        segments.push(current);
        current = '';
      }
      inBrackets = true;
    } else if (char === ']') {
      if (current) {
        segments.push(parseInt(current, 10));
        current = '';
      }
      inBrackets = false;
    } else if (char === separator && !inBrackets) {
      if (current) {
        segments.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current) {
    segments.push(current);
  }

  return segments;
}

/**
 * Joins path segments into a dot notation path
 * @param segments - Array of path segments
 * @param separator - The separator to use (default: '.')
 * @returns The dot notation path
 */
export function joinPath(segments: PathSegment[], separator: string = '.'): string {
  return segments
    .map((segment, index) => {
      if (typeof segment === 'number') {
        return `[${segment}]`;
      }
      // Add separator if not the first segment
      return index > 0 ? separator + segment : segment;
    })
    .join('');
}

/**
 * Gets the type of a value as a string
 * @param value - The value to get the type of
 * @returns The type as a string
 */
export function getType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * Checks if a value is a primitive type
 * @param value - The value to check
 * @returns Whether the value is a primitive
 */
export function isPrimitive(value: any): boolean {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'undefined'
  );
}

/**
 * Deep clones a value
 * @param value - The value to clone
 * @param seen - WeakMap to track already cloned objects
 * @returns The cloned value
 */
export function deepClone<T>(value: T, seen = new WeakMap()): T {
  if (isPrimitive(value)) {
    return value;
  }

  if (seen.has(value as object)) {
    return seen.get(value as object) as T;
  }

  if (Array.isArray(value)) {
    const result = value.map((item) => deepClone(item, seen));
    seen.set(value as object, result);
    return result as unknown as T;
  }

  if (typeof value === 'object' && value !== null) {
    const result: Record<string, any> = {};
    seen.set(value as object, result);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = deepClone((value as any)[key], seen);
      }
    }
    return result as T;
  }

  return value;
}
