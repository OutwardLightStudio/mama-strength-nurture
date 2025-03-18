import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ExercisePreferencesService, ExercisePreference } from '../ExercisePreferencesService';
import { db } from '@/lib/db';

describe('ExercisePreferencesService', () => {
  let service: ExercisePreferencesService;

  beforeEach(() => {
    service = new ExercisePreferencesService();
  });

  afterEach(async () => {
    await db.exercisePreferences.clear();
  });

  describe('setFavorite', () => {
    it('should set an exercise as favorite and return true on success', async () => {
      const exerciseId = 'gentle-pelvic-floor-recovery';
      const result = await service.setFavorite(exerciseId, true);
      
      expect(result).toBe(true);
      const isFavorite = await service.isFavorite(exerciseId);
      expect(isFavorite).toBe(true);
    });
    
    it('should update existing favorite status and return true on success', async () => {
      const exerciseId = 'gentle-pelvic-floor-recovery';
      
      let result = await service.setFavorite(exerciseId, true);
      expect(result).toBe(true);
      
      let isFavorite = await service.isFavorite(exerciseId);
      expect(isFavorite).toBe(true);
      
      result = await service.setFavorite(exerciseId, false);
      expect(result).toBe(true);
      
      isFavorite = await service.isFavorite(exerciseId);
      expect(isFavorite).toBe(false);
    });
    
    it('should throw an error when operation fails', async () => {
      // Mock the db put method to throw an error
      const originalPut = db.exercisePreferences.put;
      db.exercisePreferences.put = vi.fn().mockRejectedValue(new Error('Database error'));
      
      await expect(service.setFavorite('test-id', true)).rejects.toThrow('Failed to set favorite status');
      
      // Restore the original method
      db.exercisePreferences.put = originalPut;
    });
  });

  describe('isFavorite', () => {
    it('should return true for a favorite exercise', async () => {
      const exerciseId = 'gentle-pelvic-floor-recovery';
      await service.setFavorite(exerciseId, true);
      const isFavorite = await service.isFavorite(exerciseId);
      expect(isFavorite).toBe(true);
    });

    it('should return false for non-existent exercise preferences', async () => {
      const isFavorite = await service.isFavorite('non-existent-exercise');
      expect(isFavorite).toBe(false);
    });
  });

  describe('getExercisePreference', () => {
    it('should get exercise preference for a specific exercise', async () => {
      const exerciseId = 'gentle-pelvic-floor-recovery';
      await service.setFavorite(exerciseId, true);
      
      const preference = await service.getExercisePreference(exerciseId);
      
      expect(preference).toBeDefined();
      expect(preference?.exerciseId).toBe(exerciseId);
      expect(preference?.isFavorite).toBe(1);
    });
    
    it('should return undefined for non-existent exercise preferences', async () => {
      const preference = await service.getExercisePreference('non-existent-exercise');
      expect(preference).toBeUndefined();
    });
  });

  describe('getAllExercisePreferences', () => {
    it('should get all exercise preferences', async () => {
      await Promise.all([
        service.setFavorite('exercise-1', true),
        service.setFavorite('exercise-2', false),
        service.setFavorite('exercise-3', true)
      ]);
      
      const preferences = await service.getAllExercisePreferences();
      
      expect(preferences).toHaveLength(3);
      expect(preferences.find(p => p.exerciseId === 'exercise-1')?.isFavorite).toBe(1);
      expect(preferences.find(p => p.exerciseId === 'exercise-2')?.isFavorite).toBe(0);
      expect(preferences.find(p => p.exerciseId === 'exercise-3')?.isFavorite).toBe(1);
    });
  });

  describe('getFavoriteExerciseIds', () => {
    it('should get all favorite exercise ids', async () => {
      const exercises = [
        'gentle-pelvic-floor-recovery',
        'standing-baby-cuddle-squats',
        'diaphragmatic-breathing'
      ];
      
      // Set some exercises as favorites
      await Promise.all([
        service.setFavorite(exercises[0], true),
        service.setFavorite(exercises[1], true),
        service.setFavorite(exercises[2], false)
      ]);
      
      const favoriteIds = await service.getFavoriteExerciseIds();
      
      expect(favoriteIds).toHaveLength(2);
      expect(favoriteIds).toContain(exercises[0]);
      expect(favoriteIds).toContain(exercises[1]);
      expect(favoriteIds).not.toContain(exercises[2]);
    });
  });
});