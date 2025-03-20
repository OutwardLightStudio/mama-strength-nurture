import '@/lib/db/test-setup';
import { describe, it, expect, beforeEach } from 'vitest';
import { ExerciseCompletionService } from '../ExerciseCompletionService';
import { db } from '../../db';

describe('ExerciseCompletionService', () => {
  let service: ExerciseCompletionService;

  beforeEach(() => {
    service = new ExerciseCompletionService();
  });

  it('should record an exercise completion', async () => {
    const exerciseId = 'test-exercise-1';
    const id = await service.recordCompletion(exerciseId);
    
    expect(id).toBeDefined();
    const record = await db.completedExercises.get(id);
    expect(record).toBeDefined();
    expect(record?.exerciseId).toBe(exerciseId);
    expect(record?.completedAt).toBeInstanceOf(Date);
  });

  it('should check if exercise was completed today', async () => {
    const exerciseId = 'test-exercise-1';
    
    // Initially should not be completed
    let isCompleted = await service.wasCompletedToday(exerciseId);
    expect(isCompleted).toBe(false);

    // Record completion
    await service.recordCompletion(exerciseId);
    
    // Now should show as completed
    isCompleted = await service.wasCompletedToday(exerciseId);
    expect(isCompleted).toBe(true);
  });

  it('should remove a completion record', async () => {
    const exerciseId = 'test-exercise-1';
    
    // Record completion
    await service.recordCompletion(exerciseId);
    
    // Verify it's completed
    let isCompleted = await service.wasCompletedToday(exerciseId);
    expect(isCompleted).toBe(true);

    // Remove completion
    await service.removeCompletion(exerciseId);
    
    // Verify it's no longer completed
    isCompleted = await service.wasCompletedToday(exerciseId);
    expect(isCompleted).toBe(false);
  });

  it('should get completions in date range', async () => {
    const exerciseId1 = 'test-exercise-1';
    const exerciseId2 = 'test-exercise-2';
    
    // Record completions
    await service.recordCompletion(exerciseId1);
    await service.recordCompletion(exerciseId2);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const completions = await service.getCompletionsInRange(today, tomorrow);
    expect(completions).toHaveLength(2);
    expect(completions.map(c => c.exerciseId)).toContain(exerciseId1);
    expect(completions.map(c => c.exerciseId)).toContain(exerciseId2);
  });
});