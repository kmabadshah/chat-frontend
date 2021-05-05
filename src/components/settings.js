import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FaUserPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";

export default function Settings() {
	const [inputDialogVisible, setInputDialogVisible] = useState(true)
	const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm()
	
	const onAddFriend = (d) => {
		console.log(d)
		reset()
		setInputDialogVisible(false)
	}
	
	return (
		<div className={`flex flex-col bg-black w-screen h-screen`}>
			<div className="flex h-16">
				<Link to={`/`} className={`bg-red-400 w-1/2 flex items-center justify-center py-2 border-r border-black`}>Home</Link>
				<Link to={`/settings`} className={`bg-red-400 w-1/2 flex items-center justify-center py-2`}>Settings</Link>
			</div>
			
			<div className={`relative w-full h-full`}>
				<button onClick={() => setInputDialogVisible(true)} className="flex w-full text-white px-2 justify-between items-center border-b-2 border-gray-400 mt-5">
					<p>Add a friend</p>
					<FaUserPlus />
				</button>
				
				{inputDialogVisible && (
					<form onSubmit={handleSubmit(onAddFriend)} className="absolute w-60 h-20 bg-gray-400 m-auto left-0 right-0 top-0 bottom-0">
						<input type="text" className={`w-full h-1/2`}
						       {...register(`funame`, { required: true })}
						/>
						<div className="flex h-1/2">
							<input type="submit" value="Submit"
							       className={`w-1/2 bg-transparent border-r-2 border-white`}
							/>
							<button className={`w-1/2`} onClick={() => setInputDialogVisible(false)}>Cancel</button>
						</div>
					</form>
				)}
			</div>
		</div>
	)
}