'use client'

import { useEffect, useState } from "react";
import Workout from "./components/Workout";
import WorkoutForm from "./components/WorkoutForm";

export default function Home() {

  const [workouts, setWorkouts] = useState(null);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const json = await response.json();

      console.log("Response:", response);
      console.log("JSON Data:", json);  

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, [workouts]);

  return (
    <div className="flex items-center my-5 ml-[50px] mr-[200px]">

      <div>
        <WorkoutForm />
      </div>

      <div className="grid grid-cols-3 gap-10">
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
