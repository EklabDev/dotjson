import { splitPath } from './utils';

/**
 * Gets a value from an object using a dot notation path
 * @param obj - The object to get the value from
 * @param path - The dot notation path
 * @param separator - The separator to use (default: '.')
 * @returns The value at the specified path, or undefined if not found
 */
export function get<T = any>(obj: any, path: string, separator: string = '.'): T | undefined {
  const segments = splitPath(path, separator);
  let current = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return undefined;
    }

    if (typeof segment === 'number') {
      if (!Array.isArray(current)) {
        return undefined;
      }
      current = current[segment];
    } else {
      if (typeof current !== 'object') {
        return undefined;
      }
      current = current[segment];
    }
  }

  return current as T;
}

/**
 * Sets a value in an object using a dot notation path
 * @param obj - The object to set the value in
 * @param path - The dot notation path
 * @param value - The value to set
 * @param separator - The separator to use (default: '.')
 * @returns The modified object
 */
export function set<T = any>(obj: T, path: string, value: any, separator: string = '.'): T {
  const segments = splitPath(path, separator);
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isLast = i === segments.length - 1;

    if (isLast) {
      if (typeof segment === 'number') {
        if (!Array.isArray(current)) {
          current = [] as any;
        }
        // @ts-ignore
        current[segment] = value;
      } else {
        if (typeof current !== 'object' || current === null) {
          current = {} as any;
        }
        // @ts-ignore
        current[segment] = value;
      }
    } else {
      const nextSegment = segments[i + 1];
      if (typeof segment === 'number') {
        if (!Array.isArray(current)) {
          current = [] as any;
        }
        // @ts-ignore
        if (!current[segment]) {
          // @ts-ignore
          current[segment] = typeof nextSegment === 'number' ? [] : {};
        }
        // @ts-ignore
        current = current[segment];
      } else {
        if (typeof current !== 'object' || current === null) {
          current = {} as any;
        }
        // @ts-ignore
        if (!current[segment]) {
          // @ts-ignore
          current[segment] = typeof nextSegment === 'number' ? [] : {};
        }
        // @ts-ignore
        current = current[segment];
      }
    }
  }

  return result;
}
