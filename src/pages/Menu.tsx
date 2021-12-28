import Toggle from "components/Toggle"
import { useEffect, useContext } from "react"
import { WorkoutContext } from "context/WorkoutContext"
import { BRO_SPLIT, PPL_SPLIT, SplitTypeEnum } from "constants/Workout"
import { RoutingContext, pagesMapping } from "context/Routing"

const style = {
  container: {
    marginTop: '10%'
  },
  card: {
    width: '30%',
    minHeight: '80%',
  }
}

function MenuPage() {
  const { 
    currentSplitType, setCurrentSplitType, 
    workoutSplits, setWorkoutSplit 
  } = useContext(WorkoutContext)

  const {setPath} = useContext(RoutingContext)

  return (
    <>
      <div className="d-flex justify-content-center" style={style.container}>
        <div className="card" style={{ minHeight: '50%', minWidth: '50%' }}>
          <div className="card-header text-center">
            <h3>Progressive Overload</h3>
          </div>
          <div className="d-grid gap-2">
            {workoutSplits.map((d) => 
              <button 
                type="button"
                className="btn btn-lg btn-outline-primary" 
                onClick={() => setPath(pagesMapping.workoutLog, {splitDay: d.toLowerCase()})}
                >{d}
              </button>
              )}
          </div>
          {/* <div className="card-footer text-center">
            <Toggle
              title="Workout Split"
              label="workout-split"
              onToggle={() => setCurrentSplitType(currentSplitType === SplitTypeEnum.PPL ? SplitTypeEnum.BRO : SplitTypeEnum.PPL)}
            />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default MenuPage
