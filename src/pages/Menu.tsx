// import Toggle from "components/Toggle"
import { useEffect, useContext } from "react"
import { WorkoutContext } from "context/WorkoutContext"
import { RoutingContext, pagesMapping } from "context/Routing"

const style = {
  container: {
    marginTop: '10%'
  },
  card: {
    minHeight: '97vh',
    maxHeight: '97vh'
  }
}

function MenuPage() {
  const {
    currentSplitType, setCurrentSplitType,
    workoutSplits, setWorkoutSplit
  } = useContext(WorkoutContext)

  const { setPath } = useContext(RoutingContext)

  return (
    <>
      <div className="card" style={{ ...style.card }}>
        <div className="card-header text-center">
          <h3>Progressive Overload</h3>
        </div>
        <div className="d-grid gap-3">
          {workoutSplits.map((d) =>
            <button
              type="button"
              className="btn btn-lg btn-outline-primary"
              onClick={() => setPath(pagesMapping.workoutLog, { splitDay: d.toLowerCase() })}
            >
              <p className="h1">{d}</p>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default MenuPage
