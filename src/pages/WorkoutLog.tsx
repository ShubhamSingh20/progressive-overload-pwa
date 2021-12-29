import { RoutingContext } from 'context/Routing'
import WeightConverterInput from 'components/WeightConverterInput';
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
          <p>Reps: 3 x 12</p>
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
  close: Function,
  onSubmit: Function
}

const ExerciseForum = React.forwardRef((props: ExerciseForumProps, ref: React.Ref<HTMLDivElement>) => {

  const { close, onSubmit } = props;
  const [forumValues, setFormValues] = useState({
    exerciseName: '',
    reps: 0,
    sets: 0,
    weights: 0,
    pr: 0,
    note: ''
  })

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="card" style={{ maxWidth: '98%' }}>
          <div className="card-header">
            <label>
              Exercise Name* :{" "}
              <input 
                type="text" 
                value={forumValues.exerciseName} 
                required={true} 
                onChange={(e) => setFormValues({ ...forumValues, exerciseName: e.currentTarget.value })} 
              />
            </label>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column justify-content-around flex-wrap">
              <label>
                Reps* :{" "}
                <input 
                  type="number" 
                  value={forumValues.reps} 
                  required={true}
                  onChange={(e) => setFormValues({ ...forumValues, reps: parseInt(e.currentTarget.value) })} 
                />
              </label>
              <label>
                Sets* :{" "}
                <input 
                  type="number" 
                  value={forumValues.sets} 
                  required={true} 
                  onChange={(e) => setFormValues({ ...forumValues, sets: parseInt(e.currentTarget.value) })} 
                />
              </label>
              <div className="d-flex">
                Weights* :{" "} 
                <WeightConverterInput 
                  value={forumValues.weights} 
                  onChange={(v:number) => setFormValues({ ...forumValues, weights: v})} 
                />
              </div>
              <label>
                PR :{" "}
                <input 
                  type="number" 
                  value={forumValues.pr} 
                  required={false}
                  onChange={(e) => setFormValues({ ...forumValues, pr: parseInt(e.currentTarget.value) || 0 })} 
                />
              </label>
            </div>
            <div className="text-wrap">
              <label>
                Note: <textarea required={false} value={forumValues.note} rows={5}/>
              </label>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <button className="btn  btn-outline-primary" type="submit">
                Save
              </button>
              <button className="btn  btn-outline-primary" onClick={(e) => close()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      <div ref={ref} />
    </>
  )
})

function WorkoutLog() {
  const { queryParams } = useContext(RoutingContext)
  const { splitDay } = queryParams

  const bottomListRef = useRef<HTMLDivElement>(null)

  const [exercises, setExercise] = useState(exercisesTmp)
  const [newExercise, setNewExercise] = useState(false)

  const onSubmitHandler = (e: React.MouseEvent) => {

  }

  useEffect(() => {
    if (newExercise)
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
              {exercises.map((d) => <ExerciseCard exerciseName={d} />)}
              {newExercise && <ExerciseForum ref={bottomListRef} close={() => setNewExercise(false)} onSubmit={onSubmitHandler}/>}
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
