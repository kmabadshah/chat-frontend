import React, {useEffect} from "react";
import { useForm } from 'react-hook-form'
import { Context } from "../app"
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"

export default function Login() {
	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
	const { user, setUser } = React.useContext(Context)
	const history = useHistory()
	
	useEffect(() => {
		const uname = localStorage.getItem("uname")
		if (uname) {
			const url = "http://localhost:8080/api/users/" + uname
			axios.get(url, { validateStatus: status =>  status === 200 || status === 404 })
				.then(res => {
					if (res.status === 200) {
						setUser(res.data)
						
						history.push("/")
					}
				})
				.catch(err => {
					console.error(err)
				})
		}
	}, [])
	
	const onSubmit = async (d) => {
		const url = "http://localhost:8080/api/users/" + d.uname
		const res = await axios.get(url, { validateStatus: status => status === 200 || status === 404 })
		
		switch (res.status) {
			case 200: {
				if (res.data.pass !== d.pass) {
					setError(`pass`, {
						type: `wrong_pass`,
						message: `Invalid password`
					})
				} else {
					clearErrors()
					
					localStorage.setItem("uname", res.data.uname)
					
					setUser(res.data)
					
					history.push("/")
				}
				
				break
			}
			
			case 404: {
				setError(`uname`, {
					type: `wrong_uname`,
					message: `Invalid username`
				})
				
				break
			}
		}
	}
	
	return (
		<div className={'bg-black h-screen flex flex-col justify-center items-center w-screen'}>
			<form className={`flex flex-col items-center justify-center w-1/2`} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={'text-red-400 text-4xl'}>Let's chat</h1>
				
				<input type="text"
				       className={`w-full mt-3`}
				       placeholder={`username`}
				       {...register(`uname`, { required: true })} />
				<ErrorMessage
					errors={errors}
					name={`uname`}
					render={({ message }) => <p className={`text-red-400 text-sm mt-1`}>{message}</p>}
				/>
				
				<input type="text"
				       className={`w-full mt-3`}
				       type={`password`}
				       placeholder={`password`}
				       {...register(`pass`, { required: true })} />
				<ErrorMessage
					errors={errors}
					name={`pass`}
					render={({ message }) => <p className={`text-red-400 text-sm mt-1`}>{message}</p>}
				/>
				
				<div className={`flex justify-between w-full mt-3`}>
					<input type="submit" value="Log In" />
					<Link to="/signup" className={`text-white`}>Sign up</Link>
				</div>
			</form>
		</div>
	)
}
