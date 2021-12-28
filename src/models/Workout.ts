export const SCHEMA_VERSION = 1;

type SplitDay = 'push'|'pull'|'leg';

export interface Workout{
  id?: number,
  splitDay: SplitDay,
  exerciseName: string,
  repCount: number,
  weightInKg: number,
  previousRecordInKg: number,
  note: string
}
