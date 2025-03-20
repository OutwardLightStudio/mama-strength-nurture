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

  it('should delete a completion by ID', async () => {
    // Add a record first
    const exerciseId = 'test-exercise-1';
    const id = await service.recordCompletion(exerciseId);
    
    // Verify it was added
    let record = await db.completedExercises.get(id);
    expect(record).toBeDefined();
    
    // Delete by ID
    const deleteCount = await service.deleteCompletionById(id);
    expect(deleteCount).toBe(1);
    
    // Verify it's gone
    record = await db.completedExercises.get(id);
    expect(record).toBeUndefined();
  });

  it('should clear all completions', async () => {
    // Add multiple records
    await service.recordCompletion('test-exercise-1');
    await service.recordCompletion('test-exercise-2');
    
    // Verify records exist
    let count = await db.completedExercises.count();
    expect(count).toBeGreaterThan(0);
    
    // Clear all records
    const deleteCount = await service.clearAllCompletions();
    expect(deleteCount).toBeGreaterThan(0);
    
    // Verify all records are gone
    count = await db.completedExercises.count();
    expect(count).toBe(0);
  });
});