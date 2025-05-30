/**
 * Options for dot notation operations
 */
export interface DotNotationOptions {
  /**
   * Custom separator for dot notation (default: '.')
   */
  separator?: string;
  /**
   * Whether to preserve array indices (default: true)
   */
  preserveArrayIndices?: boolean;
}

/**
 * Options for JSON comparison
 */
export interface ComparisonOptions extends DotNotationOptions {
  /**
   * Whether to ignore case in string comparisons (default: false)
   */
  ignoreCase?: boolean;
  /**
   * Whether to ignore undefined values (default: false)
   */
  ignoreUndefined?: boolean;
}

/**
 * Represents a difference between two JSON objects
 */
export interface JsonDiff {
  /**
   * Properties that were added (keys in dot notation)
   */
  added: Record<string, any>;
  /**
   * Properties that were removed (keys in dot notation)
   */
  removed: Record<string, any>;
  /**
   * Properties that were modified (keys in dot notation)
   */
  modified: Record<string, { old: any; new: any }>;
  /**
   * Properties that had type changes (keys in dot notation)
   */
  typeChanges: Record<string, { old: string; new: string }>;
}

/**
 * Type for the flattened object using dot notation
 */
export type DotNotation = Record<string, any>;

/**
 * Type for the path segments in dot notation
 */
export type PathSegment = string | number;
