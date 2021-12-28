import React, { createContext, useState, useMemo } from 'react';
import {SplitTypeEnum, PPL_SPLIT} from 'constants/Workout'

interface WorkoutContextType {
  currentSplitType: SplitTypeEnum,
  workoutSplits: string[],
  setCurrentSplitType: Function,
  setWorkoutSplit: Function
}

export const WorkoutContext = createContext<WorkoutContextType>({
  currentSplitType: SplitTypeEnum.PPL,
  workoutSplits: PPL_SPLIT,
  setCurrentSplitType: () => {},
  setWorkoutSplit: () => {}
});

const WorkoutProvider : React.FC = ({children}) => {
  const [workoutSplits, setWorkoutSplit] = useState(PPL_SPLIT)
  const [currentSplitType, setCurrentSplitType] = useState(SplitTypeEnum.PPL)
  
  const value = useMemo(
    () => ({
      currentSplitType, 
      setCurrentSplitType, 
      setWorkoutSplit, 
      workoutSplits 
    }), 
    [
      currentSplitType, 
      setCurrentSplitType, 
      workoutSplits, 
      setWorkoutSplit
    ]
  )

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  )
}

export default WorkoutProvider
