import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import {Context} from "../app";
import axios from "axios";

export default function Home() {
	const history = useHistory()
	const { user, setUser, friends, setFriends } = React.useContext(Context)
	
	useEffect(() => {
		if (user) {
			const url = "http://localhost:8080/api/friends/" + user.id
			axios.get(url, { validateStatus: status => status === 200 })
				.then(res => {
					if (res.data == null) setFriends([])
					else setFriends(res.data)
				})
				.catch(err => console.error(err))
		} else {
			const uname = localStorage.getItem("uname")
			let url = "http://localhost:8080/api/users/" + uname
			
			axios.get(url, { validateStatus: status =>  status === 200 || status === 404 })
				.then(async res => {
					if (res.status === 200) {
						setUser(res.data)
						
						const tempUser = res.data
						
						const url = "http://localhost:8080/api/friends/" + tempUser.id
						const res2 = await axios.get(url, { validateStatus: status => status === 200 })
						
						if (res2.data == null) setFriends([])
						else {
							setFriends(res2.data)
							console.log(res2.data)
						}
					} else {
						history.push("/login")
					}
				})
				.catch(err => {
					console.error(err)
				})
		}
	}, [])
	
	return (
		<div className={`flex flex-col bg-black h-screen overflow-hidden`}>
			<div className="flex h-16">
				<Link to={`/`} className={`bg-red-400 w-1/2 flex items-center justify-center py-2 border-r border-black`}>Home</Link>
				<Link to={`/settings`} className={`bg-red-400 w-1/2 flex items-center justify-center py-2`}>Settings</Link>
			</div>
			
			<div className="flex flex-col overflow-y-scroll">
				{friends && friends.map((fr, i) => (
					<div key={i} onClick={() => history.push("/chat")} className={`flex h-20 border-b-2 border-gray-700 items-center px-2 mt-5 justify-between`}>
						<div className={`rounded-full h-4/6 w-12 bg-red-400 flex items-center justify-center`}> D </div>
						
						<div className="flex flex-col mx-4 text-white">
							<div className="flex justify-between">
								<h1 className={``}>{fr["uname"]}</h1>
								<div className={`h-4 w-4 rounded-full bg-green-400 mt-2`}></div>
							</div>
							<p className={``}>I am  a rockster who loves to...</p>
						</div>
						
						<div className={`flex-col text-white text-sm`}>
							<p>24th July</p>
							<p>10:30 pm</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}