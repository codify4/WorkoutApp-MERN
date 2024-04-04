import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [error, setError] = useState(null);
    
    
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
        }
        else if (response.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);
            console.log('new workout added',json);
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="w-300px h-500px p-5 mt-5 mr-6">
            <h1 className="font-extrabold text-xl">Add a New Workout</h1>
            <label className="labels-inputs">
                Title:
                <input 
                    className="labels-inputs p-[10px] my-[5px] w-[100%] border border-solid border-[#ddd] rounded-xl box-border" 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br/>
            <label className="labels-inputs ">
                Reps:
                <input 
                    className="labels-inputs p-[10px] my-[5px] w-[100%] border border-solid border-[#ddd] rounded-xl box-border" 
                    type="number" 
                    value={reps} 
                    onChange={(e) => setReps(e.target.value)}
                />
            </label>
            <br/>
            <label className="labels-inputs">
                Load(kg):
                <input 
                    className="labels-inputs p-[10px] my-[5px] w-[100%] border border-solid border-[#ddd] rounded-xl box-border" 
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