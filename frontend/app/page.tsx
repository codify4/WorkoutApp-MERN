'use client'

import { useEffect, useState } from "react";
import Workout from "./components/Workout";

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
  }, []);

  return (
    <div className="grid grid-cols-[3fr,1fr] gap-[100px]">
      {workouts &&
        workouts.map((workout) => (
          <Workout 
            key={workout._id}
            workout={workout}
          />
        ))
      }
    </div>

  );
}
