import { db } from '../db';

export interface ExercisePreference {
  exerciseId: string;
  isFavorite: 0 | 1;
}

export class ExercisePreferencesService {
  /**
   * Sets favorite status for an exercise (upsert operation)
   * Ensures there is only one document per exercise ID since exerciseId is the primary key
   * @param exerciseId The ID of the exercise
   * @param isFavorite Whether the exercise is a favorite
   * @returns Promise that resolves to true if the operation was successful
   * @throws Error if the operation fails
   */
  async setFavorite(exerciseId: string, isFavorite: boolean): Promise<boolean> {
    try {
      await db.exercisePreferences.put({ 
        exerciseId, 
        isFavorite: isFavorite ? 1 : 0 
      });
      
      // Verify the operation was successful by retrieving the record
      const record = await db.exercisePreferences.get(exerciseId);
      return record?.isFavorite === (isFavorite ? 1 : 0);
    } catch (error) {
      console.error(`Failed to set favorite status for exercise ${exerciseId}:`, error);
      throw new Error(`Failed to set favorite status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Checks if an exercise is marked as a favorite
   * @param exerciseId The ID of the exercise
   * @returns Boolean indicating if the exercise is a favorite
   */
  async isFavorite(exerciseId: string): Promise<boolean> {
    const preference = await db.exercisePreferences.get(exerciseId);
    return preference?.isFavorite === 1;
  }

  /**
   * Gets the exercise preference for a specific exercise
   * @param exerciseId The ID of the exercise
   * @returns ExercisePreference object or undefined if not found
   */
  async getExercisePreference(exerciseId: string): Promise<ExercisePreference | undefined> {
    return await db.exercisePreferences.get(exerciseId);
  }

  /**
   * Gets all exercise preferences
   * @returns Array of ExercisePreference objects
   */
  async getAllExercisePreferences(): Promise<ExercisePreference[]> {
    return await db.exercisePreferences.toArray();
  }

  /**
   * Gets all favorite exercises
   * @returns Array of exercise IDs that are marked as favorites
   */
  async getFavoriteExerciseIds(): Promise<string[]> {
    const favorites = await db.exercisePreferences
      .where('isFavorite')
      .equals(1)
      .toArray();
    return favorites.map(f => f.exerciseId);
  }
}

export const exercisePreferencesService = new ExercisePreferencesService();