import { Button } from "../components/ui/button"
import { Trash2 } from 'lucide-react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import UpdateWorkout from "./UpdateWorkout";

type WorkoutProps = {
    workout : {
        _id: string,
        title: string,
        reps: number,
        load: number,
        createdAt: string
    }
}
const Workout = ({ workout }: WorkoutProps) => {

    const { dispatch } = useWorkoutsContext();
    
    const deleteWorkout = async () => {

        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error);
        }
        else if (response.ok) {
            console.log(json);
            
            dispatch({ type: 'DELETE_WORKOUT', payload: workout });
        }
    }

    return (
        <div className="flex flex-col relative w-[400px] bg-[#fff] rounded-xl mt-[20px] mx-auto p-[20px] shadow-md">
            <h1 className="mx-0 mb-[10px] mt-0 text-[1.2em] text-primary font-extrabold">{workout.title}</h1>
            <p className="workout-p">
                <strong>Reps: </strong> 
                {workout.reps}
            </p>
            <p className="workout-p">
                <strong>Load(kg): </strong>
                {workout.load}
            </p>
            <p className="workout-p">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

            <div className="flex-row">
                <Button 
                    size="icon" 
                    className="text-white bg-error rounded-xl mt-1"
                    onClick={deleteWorkout}>
                    <Trash2 />
                </Button>

                <UpdateWorkout
                    workoutId={workout._id}
                />
            </div>
        </div>
    )
}

export default Workout