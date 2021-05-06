import React, {useContext, useEffect, useState} from "react";
import { IoArrowBackSharp, IoCheckmarkDoneOutline } from "react-icons/io5"
import { IoMdSend } from "react-icons/io"
import { useForm } from 'react-hook-form'
import {useHistory} from "react-router-dom";
import {Context} from "../app";
import axios from "axios";

export default function Chat() {
	const history = useHistory()
	const { handleSubmit, register } = useForm()
	const {user, currentChatFriend} = useContext(Context)
	const [messages, setMessages] = useState()
	
	useEffect(() => {
		(async () => {
			const url = "http://localhost:8080/api/messages/" + user.id
			
			try {
				const res = await axios.get(url, {validateStatus: status => status === 200})
				setMessages(res.data)
			} catch(err) {
				console.error(err)
			}
		})()
	}, [])
	
	const onSubmit = async (d) => {
		try {
			const url1 = "http://localhost:8080/api/messages"
			await axios.post(url1, {
				srcID: user.id,
				tarID: currentChatFriend.id,
				text: d.msg
			}, {validateStatus: status => status === 200})
			
			const url2 = "http://localhost:8080/api/messages/" + user.id
			const res2 = await axios.get(url2, {validateStatus: status => status === 200})
			setMessages(res2.data)
			
		} catch(err) {
			console.error(err)
		}
	}
	
	return (
		<div className={`flex flex-col bg-black h-screen w-screen`}>
			<div className={"flex bg-red-400 h-20 items-center justify-center px-3"}>
				<button className={``} onClick={() => history.push("/")}><IoArrowBackSharp className={`text-2xl`} /></button>
				<h1 className={`mx-auto text-2xl`}>Jane Doe</h1>
			</div>
			
			<div className={`flex flex-col overflow-y-scroll`}>
				{messages && messages.map((msg, i) => msg.tarID === user.id ? (
					<div className="flex mt-5 justify-between items-center text-sm">
						<div className="flex items-center mr-7 p-5 bg-green-400 rounded-tr-full rounded-br-full">
							<p className={`text-justify`}>{msg.text}</p>
							<IoCheckmarkDoneOutline className="text-6xl ml-4 text-white" />
						</div>
						
						<div className="flex flex-col text-gray-300 justify-center w-full">
							<p>28 August</p>
							<p>10:30pm</p>
						</div>
					</div>) : (
					<div className="flex mt-5 justify-between items-center text-sm">
						<div className="flex flex-col text-gray-300 justify-center items-end w-full">
							<p>28 August</p>
							<p>10:30pm</p>
						</div>
						
						<div className="flex items-center ml-7 p-5 bg-green-400 rounded-tl-full rounded-bl-full">
							<p className={`text-justify`}>{msg.text}</p>
							<IoCheckmarkDoneOutline className="text-6xl ml-4 text-white" />
						</div>
					
					</div>
				) )}
			</div>
			
			
			<form onSubmit={handleSubmit(onSubmit)} className={`h-20 py-4 flex mt-auto items-stretch justify-center`}>
				<input type="text" {...register(`msg`, { required: true })} className={`px-3 min-w-40 md:w-1/2`} />
				<button type="submit" className={`text-2xl text-white ml-2`}> <IoMdSend /> </button>
			</form>
		</div>
	)
}