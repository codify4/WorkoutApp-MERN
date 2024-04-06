'use client'

import { useEffect } from "react";
import Workout from "./components/Workout";
import WorkoutForm from "./components/WorkoutForm";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const json = await response.json();

      console.log("Response:", response);
      console.log("JSON Data:", json);  

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="flex items-center my-5 ml-[50px] mr-[200px]">

      <WorkoutForm />

      <div className="grid grid-cols-3 gap-10 ml-96">
        {workouts &&
          workouts.map((workout) => (
            <Workout 
              key={workout._id}
              workout={workout}
            />
          ))
        }
      </div>
    </div>

  );
}
