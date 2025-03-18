import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ExercisePreferencesService } from '../ExercisePreferencesService';
import { db } from '@/lib/db';

describe('ExercisePreferencesService', () => {
  let service: ExercisePreferencesService;

  beforeEach(() => {
    service = new ExercisePreferencesService();
  });

  afterEach(async () => {
    await db.exercisePreferences.clear();
  });

  it('should set an exercise as favorite', async () => {
    const exerciseId = 'gentle-pelvic-floor-recovery';
    await service.setFavorite(exerciseId, true);
    const isFavorite = await service.getFavorite(exerciseId);
    expect(isFavorite).toBe(true);
  });

  it('should return false for non-existent exercise preferences', async () => {
    const isFavorite = await service.getFavorite('non-existent-exercise');
    expect(isFavorite).toBe(false);
  });

  it('should get all favorite exercises', async () => {
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

    const favorites = await service.getAllFavorites();
    expect(favorites).toHaveLength(2);
    expect(favorites).toContain(exercises[0]);
    expect(favorites).toContain(exercises[1]);
    expect(favorites).not.toContain(exercises[2]);
  });

  it('should update existing favorite status', async () => {
    const exerciseId = 'gentle-pelvic-floor-recovery';
    
    await service.setFavorite(exerciseId, true);
    let isFavorite = await service.getFavorite(exerciseId);
    expect(isFavorite).toBe(true);

    await service.setFavorite(exerciseId, false);
    isFavorite = await service.getFavorite(exerciseId);
    expect(isFavorite).toBe(false);
  });
});