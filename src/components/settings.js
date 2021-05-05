import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {FaUserPlus} from "react-icons/fa";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Context} from "../app";
import { ErrorMessage } from '@hookform/error-message';

export default function Settings() {
	const [inputDialogVisible, setInputDialogVisible] = useState(true)
	const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm()
	const {user} = useContext(Context)
	
	const onAddFriend = async (d) => {
		const url = "http://localhost:8080/api/users/" + d.funame
		
		try {
			const res = await axios.get(url, { validateStatus: status => status === 200 || status === 404 })
			
			if (res.status === 200) {
				clearErrors()
				
				const url = "http://localhost:8080/api/friends"
				
				const res = await axios.post(url, {
					srcID: user.id,
					tarID: res.data.id
				}, {validateStatus: status => status === 200})
				
				console.log(res.data)
				
				reset()
				setInputDialogVisible(false)
			} else {
				setError(`funame`, {
					type: "invalid_uname",
					message: "Please choose a different name"
				})
			}
			
		} catch(err) {
			console.error(err)
		}
		
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
					<form onSubmit={handleSubmit(onAddFriend)} className="absolute w-60 h-40 bg-gray-400 m-auto left-0 right-0 top-0 bottom-0 flex flex-col">
						<input type="text" className={`w-full h-1/2`}
						       {...register(`funame`, { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name={`funame`}
							render={({ message }) => <p className={`text-black text-sm mt-1`}>{message}</p>}
						/>
						<div className="flex flex-grow borderize">
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