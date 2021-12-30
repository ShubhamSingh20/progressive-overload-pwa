import { RoutingContext, pagesMapping } from 'context/Routing'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from 'models';
import { VersioningWorkout, Workout } from 'models/Workout';
import WeightConverterInput from 'components/WeightConverterInput';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Progress } from 'models/Progress';
import Dexie from 'dexie';

const style = {
  card: {
    width: '30%',
    minHeight: '40%',
    height: '75vh',
    minWidth: '70%'
  }
}

interface WorkoutProgressionProps {
  versioningWorkout: Array<VersioningWorkout>
}

const WorkoutProgression: React.FC<WorkoutProgressionProps> = ({ versioningWorkout }) => (<>
  {versioningWorkout.map((d, index) =>
    <div className="card" style={{ maxWidth: '98%' }}>
      <div className="card-body">
        <h5 className="card-title">{index + 1} ({new Date(d.createdAt).toDateString()})</h5>
        <div className="d-flex flex-column justify-content-around flex-wrap">
          <p>Reps: {`${d.sets} x ${d.repCount}`}</p>
          <p>Weight: {`${d.weightInKg} Kg (${(d.weightInKg * 2.205).toFixed(2)} lbs)`}</p>
          <p>PR: {`${d.previousRecordInKg} Kg (${(d.previousRecordInKg * 2.205).toFixed(2)} lbs)`} </p>
        </div>
      </div>
    </div>)
  }
</>)

interface Props {
  workout: Workout,
  openEditForum: Function,
  onDelete: Function,
  listProgression: Function,
  children?: React.ReactNode
}

const ExerciseCard: React.FC<Props> = ({ workout, openEditForum, onDelete, listProgression }) => {
  const [listProgress, setListProgress] = useState(false)
  const [versioningWorkout, setVersioningWorkout] = useState<Array<VersioningWorkout> | null>(null)

  useEffect(() => {
    if (listProgress) listProgression(workout.id as number)
      .then((d: Progress) => !!d && setVersioningWorkout(d.workoutProgress.reverse()))
  }, [listProgress])

  return (
    <div className="card" style={{ maxWidth: '98%' }}>
      <div className="card-header">
        <p className="h4 text-capitalize">{workout.exerciseName} </p>
      </div>
      <div className="card-body">
        <div className="d-flex flex-column justify-content-around flex-wrap">
          <p>Reps: {`${workout.sets} x ${workout.repCount}`}</p>
          <p>Weight: {`${workout.weightInKg} Kg (${(workout.weightInKg * 2.205).toFixed(2)} lbs)`}</p>
          <p>PR: {`${workout.previousRecordInKg} Kg (${(workout.previousRecordInKg * 2.205).toFixed(2)} lbs)`} </p>
        </div>
        <div className="text-wrap">
          {workout.note}
        </div>
        <i className="fa fa-list-ul fa-2x" aria-hidden={true} onClick={(e) => setListProgress(!listProgress)} />
        {listProgress && !!versioningWorkout && <WorkoutProgression versioningWorkout={versioningWorkout} />}
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-between">
          <i className="fa fa-pencil fa-2x" aria-hidden={true} onClick={(e) => openEditForum(workout.id)} />
          <i className="fa fa-trash-o fa-2x" aria-hidden={true} onDoubleClick={(e) => onDelete(workout.id)} />
        </div>
      </div>
    </div>
  )
}

interface ExerciseForumProps {
  workout?: Workout | null,
  splitDay: string,
  close: Function,
  onSubmit: Function
}

const ExerciseForum = React.forwardRef((props: ExerciseForumProps, ref: React.Ref<HTMLDivElement>) => {

  const { close, onSubmit, splitDay, workout } = props;
  const [forumValues, setFormValues] = useState(!!workout ? workout : {
    splitDay: splitDay,
    exerciseName: '',
    repCount: 0,
    sets: 0,
    previousRecordInKg: 0,
    note: '',
  } as Workout)

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit(forumValues)
      }}>
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
                  value={forumValues.repCount}
                  required={true}
                  onChange={(e) => setFormValues({ ...forumValues, repCount: parseInt(e.currentTarget.value) })}
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
                  value={forumValues.weightInKg}
                  onChange={(v: number) => setFormValues({ ...forumValues, weightInKg: v })}
                />
              </div>
              <label>
                PR :{" "}
                <input
                  type="number"
                  value={forumValues.previousRecordInKg}
                  required={false}
                  onChange={(e) => setFormValues({ ...forumValues, previousRecordInKg: parseInt(e.currentTarget.value) || 0 })}
                />
              </label>
            </div>
            <div className="text-wrap">
              <label>
                Note: <textarea required={false} value={forumValues.note} rows={5} onChange={(e) => setFormValues({ ...forumValues, note: e.currentTarget.value })} />
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
  const { queryParams, setPage } = useContext(RoutingContext)
  const { splitDay } = queryParams

  const bottomListRef = useRef<HTMLDivElement>(null)

  const [newExercise, setNewExercise] = useState(false)
  const [editWorkout, setEditWorkout] = useState<Workout | null | undefined>(null)

  const [refreshLiveQuery, setRefreshLiveQuery] = useState(false)

  useEffect(() => {
    if (newExercise)
      bottomListRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [newExercise])

  const workouts: Array<Workout> | undefined = useLiveQuery(
    () =>
      db.workouts
        .where("splitDay")
        .equalsIgnoreCase(splitDay as string)
        .sortBy("id"),
    [splitDay, refreshLiveQuery]
  )

  const listWorkoutProgress = async (id: number) =>
    await db.progress.where("workoutId").equals(id).first()

  const doWorkoutVersioning = async (prev: Workout, updated: Workout) => {

    const isChanged = prev.sets !== updated.sets
      || prev.repCount !== updated.repCount
      || prev.weightInKg !== updated.weightInKg
      || prev.previousRecordInKg !== updated.previousRecordInKg

    if (!isChanged) return

    // create a new versioned workout instead to backup preview values
    const versionedWorkout = {
      sets: updated?.sets,
      repCount: updated?.repCount,
      weightInKg: updated?.weightInKg,
      previousRecordInKg: updated?.previousRecordInKg as number,
      createdAt: Date.now()
    } as VersioningWorkout

    const progress: Progress | undefined = await db.progress
      .where("workoutId")
      .equals(updated.id as number)
      .first()

    // if progress records doesn't exist then create new one
    if (!(!!progress)) {
      const cloned = {
        workoutId: editWorkout?.id,
        workoutProgress: [versionedWorkout]
      } as Progress
      db.progress.add(cloned)
    } else {
      // if progress record exist just update that
      console.log(progress)
      db.progress
        .where("workoutId")
        .equals(updated.id as number)
        .modify((e) => e.workoutProgress = [...e.workoutProgress, versionedWorkout])
    }
  }

  const updateWorkout = (id: number, modifiedWorkout: Workout) => {
    db.workouts
      .where("id")
      .equals(id)
      .modify({ ...modifiedWorkout })

    doWorkoutVersioning({ ...editWorkout } as Workout, modifiedWorkout)
    setEditWorkout(null)
    setNewExercise(false)
    setRefreshLiveQuery(!refreshLiveQuery)
  }

  const openEditForum = (id: number) => {
    setNewExercise(true)
    setEditWorkout(workouts?.find(w => w.id === id))
  }

  const deleteWorkout = (id: number) => {
    db.workouts.where("id").equals(id).delete()
    setRefreshLiveQuery(!refreshLiveQuery)
  }

  const onSubmitHandler = (newWorkout: Workout) => {
    if (!!newWorkout.id) {
      updateWorkout(newWorkout.id, newWorkout)
      return
    }

    db.workouts.add(newWorkout)
    setNewExercise(false)
  }

  return (
    <>
      <div className="card" style={{ ...style.card }}>
        <div className="card-header">
          <div className="row">
            <div className="col col-5">
              <button
                className="btn btn-outline-primary"
                style={{ marginLeft: 'auto' }}
                onClick={(e) => setPage(pagesMapping.menu)}
              >
                <i className="fa fa-arrow-left fa-2x" aria-hidden={true} />
              </button>
            </div>
            <div className="col col-7">
              <p className="h1 text-capitalize">
                {splitDay}
              </p>
            </div>
          </div>
        </div>
        <div className="card-body" style={{ overflowY: 'scroll' }}>
          {!!workouts && <div className="d-grid gap-2">
            {workouts?.filter((w) => w.id !== editWorkout?.id)?.map((w) =>
              <ExerciseCard
                workout={w}
                listProgression={listWorkoutProgress}
                openEditForum={openEditForum}
                onDelete={deleteWorkout}
              />
            )}
            {workouts.length === 0 && <h1>Wow, Such emptyness !</h1>}
            {newExercise && <ExerciseForum
              workout={editWorkout}
              ref={bottomListRef}
              close={() => {
                setNewExercise(false)
                setEditWorkout(null)
              }}
              splitDay={splitDay as string}
              onSubmit={onSubmitHandler}
            />}
          </div>}
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
    </>)
}

export default WorkoutLog
