import { VersioningWorkout } from "models/Workout"

export interface Progress{
  id?: number,
  workoutId: number,
  workoutProgress: Array<VersioningWorkout>
}
