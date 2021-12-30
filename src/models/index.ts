import Dexie, { Table } from "dexie";
import { Workout } from "models/Workout";
import { Progress } from "models/Progress";

const SCHEMA_VERSION = 1
class WorkoutDb extends Dexie {
  workouts!: Table<Workout>
  progress!: Table<Progress>

  constructor() {
    super("workoutDb");
    this.version(SCHEMA_VERSION).stores({
      workouts: `
        ++id,
        splitDay,
        sets,
        exerciseName,
        repCount,
        weightInKg,
        previousRecordInKg,
        note`,
      progress: `
        ++id,
        workoutId,
        *workoutProgress
      `
    });
  }
}

export const db = new WorkoutDb();
