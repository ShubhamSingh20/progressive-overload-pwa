import React, { createContext, useState, useMemo } from 'react';
import { db } from 'models';
import { Workout } from 'models/Workout';
import {SplitTypeEnum, PPL_SPLIT} from 'constants/Workout'

interface WorkoutContextType {
  currentSplitType: SplitTypeEnum,
  workoutSplits: string[],
  setCurrentSplitType: Function,
  setWorkoutSplit: Function,
  updateWorkout: Function,
}

export const WorkoutContext = createContext<WorkoutContextType>({
  currentSplitType: SplitTypeEnum.PPL,
  workoutSplits: PPL_SPLIT,
  setCurrentSplitType: () => {},
  setWorkoutSplit: () => {},
  updateWorkout: () => {}
});

const WorkoutProvider : React.FC = ({children}) => {
  const [workoutSplits, setWorkoutSplit] = useState(PPL_SPLIT)
  const [currentSplitType, setCurrentSplitType] = useState(SplitTypeEnum.PPL)
  
  const updateWorkout = (id: number, editedWorkout: Workout, cb?: Function) => {
    db.workouts.where("id").equals(id).modify({...editedWorkout})
    if(!!cb) cb()
  }

  

  const value = useMemo(
    () => ({
      currentSplitType, 
      setCurrentSplitType, 
      setWorkoutSplit, 
      workoutSplits,
      updateWorkout,
    }), 
    [
      currentSplitType, 
      setCurrentSplitType, 
      workoutSplits, 
      setWorkoutSplit,
      updateWorkout
    ]
  )

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  )
}

export default WorkoutProvider
