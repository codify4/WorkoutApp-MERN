import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

import { Pencil } from 'lucide-react';

import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const UpdateWorkout = () => {

    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, reps, load};
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: 'PATCH',
            body: JSON.stringify(workout)
        });

        const json = await response.json();

        if(response.ok) {
            console.log(json);
            dispatch({ type: 'UPDATE_WORKOUT', payload: workout });
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

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reps" className="text-right">
              Reps
            </Label>
            <Input id="reps" value={reps} onChange={(e) => setReps(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="load" className="text-right">
              Load(kg)
            </Label>
            <Input id="load" value={load} onChange={(e) => setLoad(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default UpdateWorkout