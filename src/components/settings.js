import React from "react";
import {Link} from "react-router-dom";

export default function Settings() {
	return (
		<div className={`flex flex-col bg-black w-screen h-screen`}>
			<div className="flex">
				<Link to={`/`} className={`bg-red-400`}>Home</Link>
				<Link to={`/settings`} className={`bg-red-400`}>Settings</Link>
			</div>
		</div>
	)
}