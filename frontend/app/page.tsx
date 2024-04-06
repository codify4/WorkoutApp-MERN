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
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center my-5 ml-[50px] mr-[200px]">

      <WorkoutForm />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 mt-[450px] 2xl:ml-96 lg:ml-96 2xl:mt-[20px] lg:mt-[20px]">
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
