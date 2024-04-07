import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../components/ui/dialog"

import { Pencil } from 'lucide-react';

import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const UpdateWorkout = ({ workoutId }) => {

    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, reps, load};
        const response = await fetch(`http://localhost:4000/api/workouts/${workoutId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workout)
        });

        const json = await response.json();

        if(response.ok) {
          console.log(json);
          dispatch({ type: 'UPDATE_WORKOUT', payload: json });
          setTitle("");
          setReps("");
          setLoad("");
        }
        else {
          console.error("Update failed", workout);
        }
    }
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="bg-neutral-100 hover:bg-neutral-300 rounded-xl p-2 ml-4 text-black">
            <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white rounded-full">
        <DialogHeader>
          <DialogTitle>Edit Workout</DialogTitle>
          <DialogDescription>
            Make changes to your workout. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Title
              </Label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Reps
              </Label>
              <Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Load(kg)
              </Label>
              <Input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className="col-span-3" />
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateWorkout