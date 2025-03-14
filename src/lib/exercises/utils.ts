import { Exercise, ExerciseFilters, DurationRange, ExerciseCategory, ExerciseRequirement } from './types';

/**
 * Filter exercises based on provided filters
 * 
 * @param exercises The array of exercises to filter
 * @param filters The filters to apply
 * @returns Filtered array of exercises
 */
export const filterExercises = (
  exercises: Exercise[],
  filters: ExerciseFilters
): Exercise[] => {
  return exercises.filter(exercise => {
    // Filter by category
    if (filters.category !== "All" && exercise.category !== filters.category) {
      return false;
    }
    
    // Filter by duration
    if (filters.duration !== DurationRange.ALL) {
      if (filters.duration === DurationRange.UNDER_5_MIN && exercise.duration >= 5) {
        return false;
      }
      if (filters.duration === DurationRange.FIVE_TO_TEN_MIN && (exercise.duration < 5 || exercise.duration > 10)) {
        return false;
      }
      if (filters.duration === DurationRange.OVER_10_MIN && exercise.duration <= 10) {
        return false;
      }
    }
    
    // Filter by requirement
    if (filters.requirement !== "All" && !exercise.requirements.includes(filters.requirement as ExerciseRequirement)) {
      return false;
    }
    
    // Filter by search query
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      return exercise.title.toLowerCase().includes(query) ||
        exercise.category.toLowerCase().includes(query) ||
        exercise.benefits.some(benefit => benefit.toLowerCase().includes(query)) ||
        exercise.requirements.some(req => req.toLowerCase().includes(query));
    }
    
    return true;
  });
};

/**
 * Find exercises that fit within a specific time limit
 * 
 * @param exercises The array of exercises to filter
 * @param timeLimit Maximum time in minutes
 * @returns Array of exercises that fit within the time limit, optimized for maximum use of time
 */
export const findExercisesForTimeLimit = (
  exercises: Exercise[],
  timeLimit: number
): Exercise[] => {
  // First filter to only exercises that can fit in the time limit
  const eligibleExercises = exercises.filter(ex => ex.duration <= timeLimit);
  
  // Sort by duration (longest first to optimize time usage)
  eligibleExercises.sort((a, b) => b.duration - a.duration);
  
  let remainingTime = timeLimit;
  const selected: Exercise[] = [];
  
  // Greedy algorithm - take the longest exercises that will fit
  for (const exercise of eligibleExercises) {
    if (exercise.duration <= remainingTime) {
      selected.push(exercise);
      remainingTime -= exercise.duration;
      
      if (remainingTime === 0) break;
    }
  }
  
  return selected;
};

/**
 * Get all available categories from exercises
 */
export const getAllCategories = (): string[] => {
  return ["All", ...Object.values(ExerciseCategory)];
};

/**
 * Get all available duration filters
 */
export const getAllDurationRanges = (): string[] => {
  return Object.values(DurationRange);
};

/**
 * Get all available requirement options
 */
export const getAllRequirements = (): string[] => {
  return ["All", ...Object.values(ExerciseRequirement)];
};

/**
 * Get total duration of a list of exercises
 */
export const getTotalDuration = (exercises: Exercise[]): number => {
  return exercises.reduce((total, exercise) => total + exercise.duration, 0);
};