import { RoutingContext } from 'context/Routing'
import React, { useContext, useEffect, useRef, useState } from 'react';

const style = {
  container: {
    marginTop: '10%'
  },
  card: {
    width: '30%',
    minHeight: '40%',
    height: '75vh',
    minWidth: '70%'
  }
}

interface Props {
  exerciseName: string,
  children?: React.ReactNode
}

const exercisesTmp = ['Bench Press', 'Incline Bench Press', 'Cable Fly', 'Lateral Raises'];

const ExerciseCard: React.FC<Props> = ({ exerciseName, children }) => {
  return (
    <div className="card" style={{ maxWidth: '98%' }}>
      <div className="card-header">
        <p className="h4 text-capitalize">{exerciseName} </p>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column justify-content-around flex-wrap">
          <p>Rep: 42</p>
          <p>Weight: 42kg (131 lbs)</p>
          <p>PR: 12Kg (25 lbs) </p>
        </div>
        <div className="text-wrap">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <i className="fa fa-pencil fa-2x" aria-hidden={true} />
          <i className="fa fa-trash-o fa-2x" aria-hidden={true} />
        </div>
      </div>
    </div>
  )
}

interface ExerciseForumProps {
}

const ExerciseForum = React.forwardRef((props : ExerciseForumProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <>
      <div className="card" style={{ maxWidth: '98%' }}>
        <h1>Hello World</h1>
      </div>
      <div ref={ref}/>
    </>
  )
})

function WorkoutLog() {
  const { queryParams } = useContext(RoutingContext)
  const { splitDay } = queryParams

  const bottomListRef = useRef<HTMLDivElement>(null)

  const [exercises, setExercise] = useState(exercisesTmp)
  const [newExercise, setNewExercise] = useState(false)

  useEffect(() => {
    if(newExercise) 
      bottomListRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [newExercise])

  return (
    <>
      <div className="d-flex justify-content-center" style={style.container}>
        <div className="card" style={{ ...style.card }}>
          <div className="card-header text-center">
            <p className="h3 text-capitalize">{splitDay}</p>
          </div>
          <div className="card-body" style={{ overflowY: 'scroll' }}>
            <div className="d-grid gap-2">
              {exercises.map((d) =>
                <ExerciseCard exerciseName={d} />
              )}
              {newExercise && <ExerciseForum ref={bottomListRef}/>}
            </div>
          </div>
          <div className="card-footer">
            <button 
              type="button" 
              className="btn col-12 me-2 btn-outline-primary" 
              onClick={(e) => {
                e.preventDefault()
                setNewExercise(true)
              }}
            >
              <i className="fa fa-plus fa-2x" aria-hidden={true} />
            </button>
          </div>
        </div>
      </div>
    </>)
}

export default WorkoutLog
