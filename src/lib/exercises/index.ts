/**
 * Exercise Library - Public API
 * 
 * This module exports the complete API for working with exercises
 * in a type-safe way.
 */

// Re-export everything from the types file
export * from './types';

// Export the exercise data
export { exercises, defaultContraindications } from './data';

// Export utility functions
export {
  filterExercises,
  findExercisesForTimeLimit,
  getAllCategories,
  getAllDurationRanges,
  getAllRequirements,
  getTotalDuration
} from './utils';