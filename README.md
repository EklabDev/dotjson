# @eklabdev/dotjson

A TypeScript library for converting between JSON objects and dot notation representations, as well as comparing JSON structures.

## Installation

```bash
npm install @eklabdev/dotjson
```

## Features

- Convert nested JSON objects to flattened dot notation
- Convert dot notation back to nested JSON structures
- Deep comparison of JSON objects with detailed diff information
- Get/Set operations for nested properties using dot notation
- Type-safe operations with TypeScript support
- Customizable options for separators and array handling
- Comprehensive test coverage

## Usage

### Basic Conversion

```typescript
import { jsonToDot, dotToJson } from '@eklabdev/dotjson';

// Convert JSON to dot notation
const json = { a: { b: ['a', 'b', 'c'] }, c: 1 };
const dot = jsonToDot(json);
// Result: { 'a.b[0]': 'a', 'a.b[1]': 'b', 'a.b[2]': 'c', 'c': 1 }

// Convert dot notation back to JSON
const json2 = dotToJson(dot);
// Result: { a: { b: ['a', 'b', 'c'] }, c: 1 }
```

### JSON Comparison

```typescript
import { compareJson, isEqual } from '@eklabdev/dotjson';

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 3 } };

// Get detailed differences
const diff = compareJson(obj1, obj2);
// Result: {
//   added: {},
//   removed: {},
//   modified: { 'b.c': { old: 2, new: 3 } },
//   typeChanges: {}
// }

// Check if objects are equal
const equal = isEqual(obj1, obj2);
// Result: false
```

### Get/Set Operations

```typescript
import { get, set } from '@eklabdev/dotjson';

const obj = { a: { b: [1, { c: 2 }] } };

// Get values using dot notation
const value1 = get(obj, 'a.b[0]'); // Result: 1
const value2 = get(obj, 'a.b[1].c'); // Result: 2

// Set values using dot notation
const newObj = set(obj, 'a.b[1].d', 3);
// Result: { a: { b: [1, { c: 2, d: 3 }] } }
```

### Custom Options

```typescript
import { jsonToDot, dotToJson } from '@eklabdev/dotjson';

const options = {
  separator: '_', // Use underscore instead of dot
  preserveArrayIndices: false // Use dot notation for array indices
};

const json = { a: [1, 2, 3] };
const dot = jsonToDot(json, options);
// Result: { 'a_0': 1, 'a_1': 2, 'a_2': 3 }

const json2 = dotToJson(dot, options);
// Result: { a: [1, 2, 3] }
```

### Comparison Options

```typescript
import { compareJson } from '@eklabdev/dotjson';

const options = {
  ignoreCase: true, // Case-insensitive string comparison
  ignoreUndefined: true // Ignore undefined values
};

const obj1 = { a: 'Hello', b: undefined };
const obj2 = { a: 'hello', b: 1 };

const diff = compareJson(obj1, obj2, options);
// Result: { added: {}, removed: {}, modified: {}, typeChanges: {} }
```

## API Reference

### Core Functions

- `jsonToDot(json: any, options?: DotNotationOptions): DotNotation`
- `dotToJson(dotObj: DotNotation, options?: DotNotationOptions): any`
- `flatten(obj: any, separator?: string): DotNotation`
- `unflatten(dotObj: DotNotation, separator?: string): any`

### Comparison Functions

- `compareJson(obj1: any, obj2: any, options?: ComparisonOptions): JsonDiff`
- `isEqual(obj1: any, obj2: any, options?: ComparisonOptions): boolean`

### Get/Set Operations

- `get<T = any>(obj: any, path: string, separator?: string): T | undefined`
- `set<T = any>(obj: T, path: string, value: any, separator?: string): T`

### Utility Functions

- `splitPath(path: string, separator?: string): PathSegment[]`
- `joinPath(segments: PathSegment[], separator?: string): string`
- `getType(value: any): string`
- `isPrimitive(value: any): boolean`
- `deepClone<T>(value: T): T`

### Types

- `DotNotationOptions`
- `ComparisonOptions`
- `JsonDiff`
- `DotNotation`
- `PathSegment`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 