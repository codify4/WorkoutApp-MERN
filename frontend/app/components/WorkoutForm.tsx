import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newWorkout = {title, reps, load};

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(newWorkout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        else if (response.ok) {
            setEmptyFields([]);
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);
            
            console.log('new workout added',json);
            
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="absolute top-[70px] left-10 2xl:left-3 z-50 w-500px h-500px p-5 mt-5 mr-6">
            <h1 className="font-extrabold text-xl">Add a New Workout</h1>
            <label className="labels-inputs">
                Title:
                <br />
                <input 
                    className={emptyFields.includes('title') ? 'input-error input-field': 'input-field'}
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br/>
            <label className="labels-inputs ">
                Reps:
                <br />
                <input 
                    className={(emptyFields ?? []).includes('reps') ? 'input-error input-field': 'input-field'}
                    type="number" 
                    value={reps} 
                    onChange={(e) => setReps(e.target.value)}
                />
            </label>
            <br/>
            <label className="labels-inputs">
                Load(kg):
                <br />
                <input 
                    className={(emptyFields ?? []).includes('load') ? 'input-error input-field': 'input-field'}
                    type="number" 
                    value={load} 
                    onChange={(e) => setLoad(e.target.value)}
                />
            </label>
            <br/>
            <button type="submit" className="bg-primary text-white p-[10px] rounded-xl cursor-pointer">Add</button>

            {error && <div className="p-[10px] bg-[#ffefef] border border-solid border-error text-error rounded-xl my-[10px]">{error}</div>}
        </form>
    );
}

export default WorkoutForm