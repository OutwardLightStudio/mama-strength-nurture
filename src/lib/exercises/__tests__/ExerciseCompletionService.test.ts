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
    expect(deleteCount).toBe(true);
    
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
    expect(deleteCount).toBe(true);
    
    // Verify all records are gone
    count = await db.completedExercises.count();
    expect(count).toBe(0);
  });

  it('should get a completion by ID', async () => {
    // Add a record first
    const exerciseId = 'test-exercise-1';
    const id = await service.recordCompletion(exerciseId);
    
    // Get the record by ID
    const record = await service.getCompletionById(id);
    
    // Verify record contents
    expect(record).toBeDefined();
    expect(record?.id).toBe(id);
    expect(record?.exerciseId).toBe(exerciseId);
    expect(record?.completedAt).toBeInstanceOf(Date);
  });

  it('should return undefined for non-existent completion ID', async () => {
    // Use a non-existent ID
    const nonExistentId = 999999;
    
    // Try to get the record
    const record = await service.getCompletionById(nonExistentId);
    
    // Verify it returns undefined
    expect(record).toBeUndefined();
  });

  describe('duplicate prevention', () => {
    it('should prevent recording duplicate completions on the same day', async () => {
      const exerciseId = 'test-exercise-1';
      
      // First completion should succeed
      const firstId = await service.recordCompletion(exerciseId);
      expect(firstId).toBeDefined();
      
      // Second completion should return undefined
      const secondId = await service.recordCompletion(exerciseId);
      expect(secondId).toBeUndefined();
      
      // Verify only one completion exists
      const todaysCompletion = await service.getTodaysCompletion(exerciseId);
      expect(todaysCompletion?.id).toBe(firstId);
    });

    it('should allow recording completion after previous completion is deleted', async () => {
      const exerciseId = 'test-exercise-1';
      
      // Record initial completion
      const firstId = await service.recordCompletion(exerciseId);
      expect(firstId).toBeDefined();
      
      // Delete the completion
      const deleted = await service.deleteCompletionById(firstId!);
      expect(deleted).toBe(true);
      
      // Should be able to record a new completion
      const secondId = await service.recordCompletion(exerciseId);
      expect(secondId).toBeDefined();
      expect(secondId).not.toBe(firstId);
    });
  });

  describe('getTodaysCompletion', () => {
    it('should return undefined if no completion exists today', async () => {
      const exerciseId = 'test-exercise-1';
      const completion = await service.getTodaysCompletion(exerciseId);
      expect(completion).toBeUndefined();
    });

    it('should return the most recent completion if multiple exist today', async () => {
      const exerciseId = 'test-exercise-1';
      
      // Add a completion and then delete it
      const firstId = await service.recordCompletion(exerciseId);
      await service.deleteCompletionById(firstId!);
      
      // Add another completion
      const secondId = await service.recordCompletion(exerciseId);
      
      const todaysCompletion = await service.getTodaysCompletion(exerciseId);
      expect(todaysCompletion?.id).toBe(secondId);
    });
  });
});