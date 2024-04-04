type WorkoutProps = {
    workout : {
        title: string,
        reps: number,
        load: number,
        createdAt: string
    }
}
const Workout = ({ workout }: WorkoutProps) => {

    return (
        <div className="flex flex-col relative w-[400px] bg-[#fff] rounded-xl my-[20px] mx-auto p-[20px] shadow-md">
            <h1 className="mx-0 mb-[10px] mt-0 text-[1.2em] text-[var(--primary)]">{workout.title}</h1>
            <p className="workout-p">Reps {workout.reps}</p>
            <p className="workout-p">Load(kg): {workout.load}</p>
            <p className="workout-p">{workout.createdAt}</p>
        </div>
    )
}

export default Workout