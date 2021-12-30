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


export interface VersioningWorkout{
  sets: number,
  workoutId: number,
  repCount: number,
  weightInKg: number,
  previousRecordInKg: number,
  createdAt: number
}