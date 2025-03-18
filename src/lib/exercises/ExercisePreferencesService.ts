import { db } from '../db';

export class ExercisePreferencesService {
  async setFavorite(exerciseId: string, isFavorite: boolean): Promise<void> {
    await db.exercisePreferences.put({ 
      exerciseId, 
      isFavorite: isFavorite ? 1 : 0 
    });
  }

  async getFavorite(exerciseId: string): Promise<boolean> {
    const preference = await db.exercisePreferences.get(exerciseId);
    return preference?.isFavorite === 1;
  }

  async getAllFavorites(): Promise<string[]> {
    const favorites = await db.exercisePreferences
      .where('isFavorite')
      .equals(1)
      .toArray();
    return favorites.map(f => f.exerciseId);
  }
}

export const exercisePreferencesService = new ExercisePreferencesService();