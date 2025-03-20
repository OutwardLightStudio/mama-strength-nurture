import { db } from '../db';

export interface CompletedExercise {
  id?: number;  // Auto-incrementing primary key
  exerciseId: string;
  completedAt: Date;
}

export class ExerciseCompletionService {
  /**
   * Records an exercise as completed if it hasn't been completed today
   * @param exerciseId The ID of the completed exercise
   * @returns Promise that resolves to the ID of the completion record, or undefined if already completed today
   */
  async recordCompletion(exerciseId: string): Promise<number | undefined> {
    try {
      // Check if already completed today
      const existingCompletion = await this.getTodaysCompletion(exerciseId);
      if (existingCompletion) {
        return undefined; // Already completed today
      }

      // Record new completion
      return await db.completedExercises.add({
        exerciseId,
        completedAt: new Date()
      });
    } catch (error) {
      console.error(`Failed to record exercise completion ${exerciseId}:`, error);
      throw new Error(`Failed to record completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Removes a completion record for an exercise
   * @param exerciseId The ID of the exercise to unmark as completed
   * @returns Promise that resolves to true if removed, false if not found
   * @throws Error if the operation fails
   */
  async removeCompletion(exerciseId: string): Promise<boolean> {
    try {
      // Delete the most recent completion for this exercise
      const latestCompletion = await db.completedExercises
        .where('exerciseId')
        .equals(exerciseId)
        .reverse()
        .first();

      if (latestCompletion?.id) {
        await db.completedExercises.delete(latestCompletion.id);
        return true;
      }
      return false; // No completion found
    } catch (error) {
      console.error(`Failed to remove exercise completion ${exerciseId}:`, error);
      throw new Error(`Failed to remove completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deletes a specific completion record by its ID
   * @param id The ID of the completion record to delete
   * @returns Promise that resolves to true if deleted
   */
  async deleteCompletionById(id: number): Promise<boolean> {
    try {
      await db.completedExercises.delete(id);
      return true; // Successfully deleted
    } catch (error) {
      console.error(`Failed to delete exercise completion with ID ${id}:`, error);
      throw new Error(`Failed to delete completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Deletes all completion records
   * @returns Promise that resolves to a boolean indicating success
   */
  async clearAllCompletions(): Promise<boolean> {
    try {
      await db.completedExercises.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear all exercise completions:', error);
      throw new Error(`Failed to clear completions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Checks if an exercise was completed today
   * @param exerciseId The ID of the exercise
   * @returns Promise that resolves to true if the exercise was completed today
   */
  async wasCompletedToday(exerciseId: string): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await db.completedExercises
      .where('exerciseId')
      .equals(exerciseId)
      .filter(completion => 
        completion.completedAt >= today && completion.completedAt < tomorrow
      )
      .count();

    return count > 0;
  }

  /**
   * Gets today's completion record for an exercise if it exists
   * @param exerciseId The ID of the exercise
   * @returns Promise that resolves to the completion record or undefined if not found
   */
  async getTodaysCompletion(exerciseId: string): Promise<CompletedExercise | undefined> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const completions = await db.completedExercises
      .where('exerciseId')
      .equals(exerciseId)
      .filter(completion => 
        completion.completedAt >= today && completion.completedAt < tomorrow
      )
      .toArray();

    // Return the most recent completion if multiple exist
    return completions.sort((a, b) => 
      b.completedAt.getTime() - a.completedAt.getTime()
    )[0];
  }

  /**
   * Gets all exercises completed within a date range
   * @param startDate Start of the date range
   * @param endDate End of the date range
   * @returns Promise that resolves to an array of completion records
   */
  async getCompletionsInRange(startDate: Date, endDate: Date) {
    return await db.completedExercises
      .where('completedAt')
      .between(startDate, endDate)
      .toArray();
  }

  /**
   * Gets a completion record by its ID
   * @param id The ID of the completion record
   * @returns Promise that resolves to the completion record or undefined if not found
   */
  async getCompletionById(id: number): Promise<CompletedExercise | undefined> {
    try {
      return await db.completedExercises.get(id);
    } catch (error) {
      console.error(`Failed to get exercise completion with ID ${id}:`, error);
      throw new Error(`Failed to get completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const exerciseCompletionService = new ExerciseCompletionService();