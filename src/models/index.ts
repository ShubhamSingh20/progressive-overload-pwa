import Dexie, { Table } from "dexie";
import { Workout, SCHEMA_VERSION } from "models/Workout";

class WorkoutDb extends Dexie {
  workouts!: Table<Workout>;

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
        note`
    });
  }
}

export const db = new WorkoutDb();
