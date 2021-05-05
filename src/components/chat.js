import React from "react";
import { IoArrowBackSharp, IoCheckmarkDoneOutline } from "react-icons/io5"
import { IoMdSend } from "react-icons/io"
import { useForm } from 'react-hook-form'
import {useHistory} from "react-router-dom";

export default function Chat() {
	const history = useHistory()
	const { handleSubmit, register } = useForm()
	
	const onSubmit = (d) => {
		console.log(d)
	}
	
	return (
		<div className={`flex flex-col bg-black h-screen w-screen`}>
			<div className={"flex bg-red-400 h-60 items-center justify-center px-3"}>
				<button className={``} onClick={() => history.push("/")}><IoArrowBackSharp className={`text-2xl`} /></button>
				<h1 className={`mx-auto text-2xl`}>Jane Doe</h1>
			</div>
			
			<div className={`flex flex-col overflow-y-scroll`}>
				{[...Array(10).keys()].map((i, _) => (
					<>
						<div className="flex mt-5 justify-between items-center text-sm">
							<div className="flex items-center mr-7 p-5 bg-green-400 rounded-tr-full rounded-br-full">
								<p className={`text-justify`}>Hello World, My name is Khan MD Adnan Badshah  and I like to code</p>
								<IoCheckmarkDoneOutline className="text-6xl ml-4 text-white" />
							</div>
							
							<div className="flex flex-col text-gray-300 justify-center w-full">
								<p>28 August</p>
								<p>10:30pm</p>
							</div>
						</div>
						<div className="flex mt-5 justify-between items-center text-sm">
							<div className="flex flex-col text-gray-300 justify-center items-end w-full">
								<p>28 August</p>
								<p>10:30pm</p>
							</div>
							
							<div className="flex items-center ml-7 p-5 bg-green-400 rounded-tl-full rounded-bl-full">
								<p className={`text-justify`}>Hello World, My name is Khan MD Adnan Badshah  and I like to code</p>
								<IoCheckmarkDoneOutline className="text-6xl ml-4 text-white" />
							</div>
							
						</div>
					</>
				))}
			</div>
			
			
			<form onSubmit={handleSubmit(onSubmit)} className={`h-20 py-4 flex items-stretch justify-center`}>
				<input type="text" {...register(`msg`, { required: true })} className={`px-3 min-w-40 md:w-1/2`} />
				<button type="submit" className={`text-2xl text-white ml-2`}> <IoMdSend /> </button>
			</form>
		</div>
	)
}