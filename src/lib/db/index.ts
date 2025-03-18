import Dexie, { Table } from 'dexie';

interface ExercisePreference {
  exerciseId: string;
  isFavorite: 0 | 1;
}

export class MamaStrengthDB extends Dexie {
  exercisePreferences!: Table<ExercisePreference>;

  constructor() {
    super('mamaStrengthDB');
    
    this.version(1).stores({
      exercisePreferences: 'exerciseId, isFavorite'
    });
  }
}

export const db = new MamaStrengthDB();