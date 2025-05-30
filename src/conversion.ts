import { DotNotation, DotNotationOptions } from './types';
import { splitPath, isPrimitive } from './utils';

/**
 * Converts a JSON object to dot notation
 * @param json - The JSON object to convert
 * @param options - Options for the conversion
 * @returns The flattened object using dot notation
 */
export function jsonToDot(json: any, options: DotNotationOptions = {}): DotNotation {
  const { separator = '.', preserveArrayIndices = true } = options;
  const result: DotNotation = {};

  function flatten(obj: any, prefix: string = '') {
    if (isPrimitive(obj)) {
      result[prefix] = obj;
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((value, index) => {
        const newPrefix = preserveArrayIndices
          ? `${prefix}[${index}]`
          : `${prefix}${prefix ? separator : ''}${index}`;
        flatten(value, newPrefix);
      });
      return;
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newPrefix = prefix ? `${prefix}${separator}${key}` : key;
        flatten(obj[key], newPrefix);
      }
    }
  }

  flatten(json);
  return result;
}

/**
 * Converts a dot notation object back to JSON
 * @param dotObj - The dot notation object to convert
 * @param options - Options for the conversion
 * @returns The nested JSON object
 */
export function dotToJson(dotObj: DotNotation, options: DotNotationOptions = {}): any {
  const { separator = '.' } = options;
  const result: any = {};

  for (const path in dotObj) {
    const segments = splitPath(path, separator);
    let current = result;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;

      if (isLast) {
        current[segment] = dotObj[path];
      } else {
        const nextSegment = segments[i + 1];
        if (typeof nextSegment === 'number') {
          current[segment] = current[segment] || [];
        } else {
          current[segment] = current[segment] || {};
        }
        current = current[segment];
      }
    }
  }

  return result;
}

/**
 * Flattens a JSON object using dot notation
 * @param obj - The object to flatten
 * @param separator - The separator to use (default: '.')
 * @returns The flattened object using dot notation
 */
export function flatten(obj: any, separator: string = '.'): DotNotation {
  return jsonToDot(obj, { separator });
}

/**
 * Unflattens a dot notation object back to JSON
 * @param dotObj - The dot notation object to unflatten
 * @param separator - The separator to use (default: '.')
 * @returns The nested JSON object
 */
export function unflatten(dotObj: DotNotation, separator: string = '.'): any {
  return dotToJson(dotObj, { separator });
}
