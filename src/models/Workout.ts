export const SCHEMA_VERSION = 1;

type SplitDay = 'push'|'pull'|'leg';

export interface Workout{
  id?: number,
  splitDay: SplitDay,
  sets: number,
  exerciseName: string,
  repCount: number,
  weightInKg: number,
  note: string,
  previousRecordInKg: number,
}
