import { db } from '../db';

export class ExercisePreferencesService {
  async setFavorite(exerciseId: string, isFavorite: boolean): Promise<void> {
    // TODO: make sure this is an "upsert" operation
    // i.e. if the exerciseId already exists, update it, otherwise create a new entry
    // This is a workaround for the lack of upsert in Dexie
    const existingPreference = await db.exercisePreferences.get(exerciseId);
    if (existingPreference) {
      await db.exercisePreferences.update(exerciseId, {
        isFavorite: isFavorite ? 1 : 0
      });
      return;
    }
    // If it doesn't exist, create a new entry
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