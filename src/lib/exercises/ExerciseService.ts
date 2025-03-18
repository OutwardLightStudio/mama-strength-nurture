import { exercises, defaultContraindications as contraindications } from './data';
import { Exercise, ExerciseFilters, DurationRange, ExerciseCategory, ExerciseRequirement, QuickPickOption, QuickPickType } from './types';

/**
 * ExerciseService - Centralized service for managing exercise data and operations
 */
export class ExerciseService {
  private exercises: Exercise[];
  readonly defaultContraindications: string[];

  constructor(exercises: Exercise[], defaultContraindications: string[]) {
    this.exercises = exercises;
    this.defaultContraindications = defaultContraindications;
  }

  /**
   * Get all exercises
   */
  getAllExercises(): Exercise[] {
    return this.exercises;
  }

  /**
   * Filter exercises based on provided filters and optionally return N random exercises
   */
  filterExercises(
    filters: ExerciseFilters,
    options?: { random?: boolean; limit?: number }
  ): Exercise[] {
    let filtered = this.exercises.filter(exercise => {
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

    if (options?.random) {
      filtered = filtered.sort(() => 0.5 - Math.random());
    }

    if (options?.limit && options.limit > 0) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  /**
   * Find exercises that fit within a specific time limit
   */
  findExercisesForTimeLimit(timeLimit: number): Exercise[] {
    // First filter to only exercises that can fit in the time limit
    const eligibleExercises = this.exercises.filter(ex => ex.duration <= timeLimit);
    
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
  }

  /**
   * Get all available categories from exercises
   */
  getAllCategories(): string[] {
    return ["All", ...Object.values(ExerciseCategory)];
  }

  /**
   * Get all available duration filters
   */
  getAllDurationRanges(): string[] {
    return Object.values(DurationRange);
  }

  /**
   * Get all available requirement options
   */
  getAllRequirements(): string[] {
    return ["All", ...Object.values(ExerciseRequirement)];
  }

  /**
   * Get total duration of a list of exercises
   */
  getTotalDuration(exercises: Exercise[]): number {
    return exercises.reduce((total, exercise) => total + exercise.duration, 0);
  }

  /**
   * Get a specific quick pick option
   */
  getQuickPickOption(type: QuickPickType): QuickPickOption | undefined {
    return this.quickPickOptions.find(option => option.type === type);
  }

  /**
   * Find exercises for a specific quick pick type
   */
  findExercisesForQuickPick(type: QuickPickType): Exercise[] {
    const option = this.getQuickPickOption(type);
    if (!option) return [];
    
    return this.findExercisesForTimeLimit(option.minutes).slice(0, option.exerciseCount);
  }

  /**
   * Available quick pick options
   */
  readonly quickPickOptions: QuickPickOption[] = [
    {
      type: QuickPickType.MICRO,
      minutes: 2,
      title: "Micro Movement",
      description: "Perfect for when baby is fussy or you only have a moment",
      color: "bg-mama-light-pink",
      exerciseCount: 2
    },
    {
      type: QuickPickType.RESET,
      minutes: 5,
      title: "Quick Reset",
      description: "A short but effective reset for your body and mind",
      color: "bg-mama-light-blue",
      exerciseCount: 3
    },
    {
      type: QuickPickType.MINI,
      minutes: 10,
      title: "Mini Session",
      description: "A more complete movement session when you have a bit more time",
      color: "bg-mama-sage",
      exerciseCount: 4
    }
  ];
}

// Create and export a singleton instance
export const exerciseService = new ExerciseService(exercises, contraindications);