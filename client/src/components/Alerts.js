import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

function Alerts() {
	const alert = useAlert();
	const alerts = useSelector(state => state.alerts);
	useEffect(() => {
		const { message, status } = alerts;
		switch (status) {
			case "error":
				alert.error(message);
				break;
			case "success":
				alert.success(message);
				break;
			default:
				break;
		}
	}, [alerts, alert]);
	return <></>;
}

export default Alerts;
