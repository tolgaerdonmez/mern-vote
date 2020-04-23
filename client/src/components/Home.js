import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="d-flex flex-direction-column justify-content-center align-items-center">
			<div className="card text-white bg-primary mb-3 mx-2" style={{ maxWidth: "20rem" }}>
				<div className="card-body">
					<h1 className="card-title text-center">Existing polls</h1>
					<p className="card-text">See the polls created by other users and vote!</p>
					<Link className="btn btn-danger" to="/polls">
						Check out other polls!
					</Link>
				</div>
			</div>
			<div className="card text-white bg-primary mb-3 mx-2" style={{ maxWidth: "20rem" }}>
				<div className="card-body">
					<h1 className="card-title text-center">Create a Poll!</h1>
					<p className="card-text">See the polls created by other users and vote!</p>
					<Link className="btn btn-danger" to="/polls/admin/create">
						Create Poll
					</Link>
				</div>
			</div>
		</div>
	);
}
