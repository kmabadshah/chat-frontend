import React, {useEffect} from "react";
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';

export default function Signup() {
	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
	
	const onSubmit = async (d) => {
		if (d.pass !== d.confPass) {
			setError(`confPass`, {
				type: `pass_mismatch`,
				message: `Passwords do not match`
			})
		} else {
			clearErrors()
			
			const url = "http://localhost:8080/api/users"
			
			axios.post(url, {
				uname: d.uname,
				pass: d.pass
			}, {
				validateStatus: status => status !== 200 || status !== 400
			}).then(res => {
				console.log(res.status)
				
				switch (res.status) {
					case 200: {
						console.log(`welcome aboard`)
						return
					}
					
					case 400: {
						console.log('existing user')
						setError(`confPass`, {
							type: `existing_user`,
							message: `Please choose a different username`
						})
						return
					}
				}
			}).catch(err => {
				console.error(err)
			})
			
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
				<input type="text"
				       className={`w-full mt-3`}
				       type={`password`}
				       placeholder={`password`}
				       {...register(`pass`, { required: true })} />
				<input type="text"
				       className={`w-full mt-3`}
				       type={`password`}
				       placeholder={`confirm password`}
				       {...register(`confPass`, { required: true })} />
				<ErrorMessage
					errors={errors}
					name={`confPass`}
					render={({ message }) => <p className={`text-red-400`}>{message}</p>}
				/>
				
				<div className={`flex justify-between w-full mt-3`}>
					<input type="submit" value="Log In" />
					<button className={`text-white`}>Sign up</button>
				</div>
			</form>
		</div>
	)
}