import Dexie, { Table } from 'dexie';

interface ExercisePreference {
  exerciseId: string;
  isFavorite: 0 | 1;
}

interface CompletedExercise {
  id?: number;  // Auto-incrementing primary key
  exerciseId: string;
  completedAt: Date;
}

export class MamaStrengthDB extends Dexie {
  exercisePreferences!: Table<ExercisePreference>;
  completedExercises!: Table<CompletedExercise>;

  constructor() {
    super('mamaStrengthDB');
    
    this.version(2).stores({
      exercisePreferences: 'exerciseId, isFavorite',
      completedExercises: '++id, exerciseId, completedAt'
    });
  }
}

export const db = new MamaStrengthDB();