import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExerciseService } from '../ExerciseService';
import { Exercise, ExerciseCategory, ExerciseRequirement, DurationRange, QuickPickType, ExerciseBenefit } from '../types';

// Mock exercise data for testing
const mockExercises: Exercise[] = [
  {
    id: "gentle-pelvic-floor-recovery",
    title: "Gentle Pelvic Floor Recovery",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 5,
    image: "image-url-1.jpg",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH, 
      ExerciseBenefit.CORE_ACTIVATION
    ],
    connectionTips: ["Make eye contact with your baby"]
  },
  {
    id: "standing-baby-cuddle-squats",
    title: "Standing Baby Cuddle Squats",
    category: ExerciseCategory.BABY_INCLUSIVE,
    duration: 8,
    image: "image-url-2.jpg",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.BABY_CARRIER_OR_HOLD
    ],
    benefits: [
      ExerciseBenefit.LEG_STRENGTH, 
      ExerciseBenefit.POSTURE_SUPPORT
    ],
    connectionTips: ["Sing a gentle song"]
  },
  {
    id: "quick-standing-core-activation",
    title: "Quick Standing Core Activation",
    category: ExerciseCategory.SHORT_ROUTINES,
    duration: 3,
    image: "image-url-3.jpg",
    requirements: [
      ExerciseRequirement.STANDING,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION, 
      ExerciseBenefit.POSTURE_IMPROVEMENT
    ],
    connectionTips: ["Maintain proper alignment"]
  },
  {
    id: "diaphragmatic-breathing",
    title: "Diaphragmatic Breathing",
    category: ExerciseCategory.RECOVERY_BASICS,
    duration: 3,
    image: "image-url-4.jpg",
    requirements: [
      ExerciseRequirement.NO_EQUIPMENT,
      ExerciseRequirement.CAN_DO_WHILE_NURSING
    ],
    benefits: [
      ExerciseBenefit.CORE_ACTIVATION, 
      ExerciseBenefit.STRESS_RELIEF
    ],
    connectionTips: ["Practice deep breathing"]
  },
  {
    id: "pelvic-floor-activation",
    title: "Pelvic Floor Activation",
    category: ExerciseCategory.PELVIC_FLOOR,
    duration: 3,
    image: "image-url-5.jpg",
    requirements: [
      ExerciseRequirement.FLOOR_SPACE,
      ExerciseRequirement.NO_EQUIPMENT
    ],
    benefits: [
      ExerciseBenefit.PELVIC_FLOOR_STRENGTH, 
      ExerciseBenefit.PELVIC_STABILITY
    ],
    connectionTips: ["Position baby safely within view"]
  }
];

const mockContraindications = ["Not medically approved", "Active infection"];

describe('ExerciseService', () => {
  let exerciseService: ExerciseService;

  beforeEach(() => {
    // Create a fresh instance for each test
    exerciseService = new ExerciseService(mockExercises, mockContraindications);
  });

  describe('constructor', () => {
    it('should create an instance with provided exercises and contraindications', () => {
      expect(exerciseService).toBeDefined();
      expect(exerciseService.getAllExercises()).toHaveLength(5);
      expect(exerciseService.defaultContraindications).toEqual(mockContraindications);
    });
  });

  describe('getAllExercises', () => {
    it('should return all exercises', () => {
      const allExercises = exerciseService.getAllExercises();
      expect(allExercises).toEqual(mockExercises);
      expect(allExercises).toHaveLength(5);
    });
  });

  describe('filterExercises', () => {
    it('should filter by category', () => {
      const result = exerciseService.filterExercises({
        category: ExerciseCategory.RECOVERY_BASICS,
        duration: DurationRange.ALL,
        requirement: "All"
      });
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("gentle-pelvic-floor-recovery");
      expect(result[1].id).toBe("diaphragmatic-breathing");
    });

    it('should filter by duration - under 5 min', () => {
      const result = exerciseService.filterExercises({
        category: "All",
        duration: DurationRange.UNDER_5_MIN,
        requirement: "All"
      });
      expect(result).toHaveLength(3);
      expect(result.every(ex => ex.duration < 5)).toBe(true);
    });

    it('should filter by duration - 5-10 min', () => {
      const result = exerciseService.filterExercises({
        category: "All",
        duration: DurationRange.FIVE_TO_TEN_MIN,
        requirement: "All"
      });
      expect(result).toHaveLength(2);
      result.forEach(ex => {
        expect(ex.duration).toBeGreaterThanOrEqual(5);
        expect(ex.duration).toBeLessThanOrEqual(10);
      });
    });

    it('should filter by requirement', () => {
      const result = exerciseService.filterExercises({
        category: "All",
        duration: DurationRange.ALL,
        requirement: ExerciseRequirement.CAN_DO_WHILE_NURSING
      });
      expect(result).toHaveLength(2);
      result.forEach(ex => {
        expect(ex.requirements).toContain(ExerciseRequirement.CAN_DO_WHILE_NURSING);
      });
    });

    it('should filter by search query - title', () => {
      const result = exerciseService.filterExercises({
        category: "All",
        duration: DurationRange.ALL,
        requirement: "All",
        searchQuery: "breathing"
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("diaphragmatic-breathing");
    });

    it('should filter by search query - category', () => {
      const result = exerciseService.filterExercises({
        category: "All",
        duration: DurationRange.ALL,
        requirement: "All",
        searchQuery: "pelvic"
      });
      expect(result).toHaveLength(2);
      // Both exercise #1 and #5 have "pelvic" in their benefits or category
      expect(result.map(ex => ex.id).sort()).toEqual(["gentle-pelvic-floor-recovery", "pelvic-floor-activation"]);
    });

    it('should return random exercises when random option is true', () => {
      // Mock Math.random to ensure deterministic behavior
      const originalRandom = Math.random;
      Math.random = vi.fn().mockReturnValue(0.5);

      const result = exerciseService.filterExercises(
        {
          category: "All",
          duration: DurationRange.ALL,
          requirement: "All"
        },
        { random: true }
      );
      
      expect(result).toHaveLength(5);
      // Restore Math.random
      Math.random = originalRandom;
    });

    it('should limit the number of returned exercises when limit option is provided', () => {
      const result = exerciseService.filterExercises(
        {
          category: "All",
          duration: DurationRange.ALL,
          requirement: "All"
        },
        { limit: 3 }
      );
      
      expect(result).toHaveLength(3);
    });

    it('should combine multiple filters correctly', () => {
      const result = exerciseService.filterExercises({
        category: ExerciseCategory.RECOVERY_BASICS,
        duration: DurationRange.UNDER_5_MIN,
        requirement: ExerciseRequirement.CAN_DO_WHILE_NURSING
      });
      
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("diaphragmatic-breathing");
    });
  });

  describe('findExercisesForTimeLimit', () => {
    it('should find exercises that fit within a time limit', () => {
      const result = exerciseService.findExercisesForTimeLimit(10);
      expect(result.length).toBeGreaterThan(0);
      
      const totalDuration = result.reduce((sum, ex) => sum + ex.duration, 0);
      expect(totalDuration).toBeLessThanOrEqual(10);
    });

    it('should prioritize longer exercises to optimize time usage', () => {
      const result = exerciseService.findExercisesForTimeLimit(8);
      // The first exercise should be the 8-minute one (longest that fits)
      expect(result[0].duration).toBe(8);
    });

    it('should return an empty array if no exercises fit the time limit', () => {
      const result = exerciseService.findExercisesForTimeLimit(1);
      expect(result).toHaveLength(0);
    });
  });

  describe('getTotalDuration', () => {
    it('should calculate the total duration of exercises', () => {
      const exercises = [
        mockExercises[0], // 5 minutes
        mockExercises[2], // 3 minutes
        mockExercises[3]  // 3 minutes
      ];
      
      const totalDuration = exerciseService.getTotalDuration(exercises);
      expect(totalDuration).toBe(11);
    });

    it('should return 0 for an empty array', () => {
      const totalDuration = exerciseService.getTotalDuration([]);
      expect(totalDuration).toBe(0);
    });
  });

  describe('getQuickPickOption', () => {
    it('should return the correct quick pick option by type', () => {
      const option = exerciseService.getQuickPickOption(QuickPickType.MICRO);
      expect(option).toBeDefined();
      expect(option?.type).toBe(QuickPickType.MICRO);
      expect(option?.minutes).toBe(2);
    });

    it('should return undefined for an invalid quick pick type', () => {
      // @ts-expect-error Testing with invalid type
      const option = exerciseService.getQuickPickOption('invalid-type');
      expect(option).toBeUndefined();
    });
  });

  describe('findExercisesForQuickPick', () => {
    it('should find exercises for a specific quick pick type', () => {
      const result = exerciseService.findExercisesForQuickPick(QuickPickType.MICRO);
      expect(result).toBeDefined();
      
      // Should return at most the number of exercises specified in the quickPickOption
      const option = exerciseService.getQuickPickOption(QuickPickType.MICRO);
      expect(result.length).toBeLessThanOrEqual(option?.exerciseCount || 0);
      
      // Total duration should not exceed the minutes specified
      const totalDuration = exerciseService.getTotalDuration(result);
      expect(totalDuration).toBeLessThanOrEqual(option?.minutes || 0);
    });

    it('should return randomized exercises when randomize is true', () => {
      // Mock Math.random for deterministic test results
      const originalRandom = Math.random;
      
      // First call with one set of random values
      Math.random = vi.fn().mockImplementation(() => 0.1);
      const result1 = exerciseService.findExercisesForQuickPick(QuickPickType.RESET, true);
      
      // Second call with different random values
      Math.random = vi.fn().mockImplementation(() => 0.9);
      const result2 = exerciseService.findExercisesForQuickPick(QuickPickType.RESET, true);
      
      // Log results for debugging
      console.log('Result 1:', result1.map(e => e.id));
      console.log('Result 2:', result2.map(e => e.id));
      
      // The two randomized results should be different (either in content or order)
      let isDifferent = false;
      if (result1.length === result2.length) {
        for (let i = 0; i < result1.length; i++) {
          if (result1[i].id !== result2[i].id) {
            isDifferent = true;
            break;
          }
        }
      } else {
        isDifferent = true;
      }
      
      expect(isDifferent).toBe(true);
      
      // Restore Math.random
      Math.random = originalRandom;
    });

    it('should return an empty array for an invalid quick pick type', () => {
      // @ts-expect-error Testing with invalid type
      const result = exerciseService.findExercisesForQuickPick('invalid-type');
      expect(result).toEqual([]);
    });
  });

  describe('utility methods', () => {
    it('getAllCategories should return all categories plus "All"', () => {
      const categories = exerciseService.getAllCategories();
      expect(categories).toContain("All");
      expect(categories).toContain(ExerciseCategory.RECOVERY_BASICS);
      expect(categories.length).toBeGreaterThan(1);
    });

    it('getAllDurationRanges should return all duration ranges', () => {
      const ranges = exerciseService.getAllDurationRanges();
      expect(ranges).toEqual(Object.values(DurationRange));
    });

    it('getAllRequirements should return all requirements plus "All"', () => {
      const requirements = exerciseService.getAllRequirements();
      expect(requirements).toContain("All");
      expect(requirements).toContain(ExerciseRequirement.FLOOR_SPACE);
      expect(requirements.length).toBeGreaterThan(1);
    });
  });

  describe('getExerciseById', () => {
    it('should return the correct exercise by ID', () => {
      const allExercises = exerciseService.getAllExercises();
      const firstExercise = allExercises[0];
      
      const foundExercise = exerciseService.getExerciseById(firstExercise.id);
      
      expect(foundExercise).toBeDefined();
      expect(foundExercise?.id).toBe(firstExercise.id);
      expect(foundExercise?.title).toBe(firstExercise.title);
    });

    it('should return undefined for non-existent exercise ID', () => {
      const nonExistentId = 'non-existent-exercise-id';
      
      const foundExercise = exerciseService.getExerciseById(nonExistentId);
      
      expect(foundExercise).toBeUndefined();
    });
  });
});