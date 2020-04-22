import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alerts extends Component {
	componentDidUpdate(prevProps) {
		const { alert, alerts } = this.props;
		if (prevProps.alerts !== alerts) {
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
		}
	}
	render() {
		return <Fragment />;
	}
}

const mapStateToProps = state => ({
	alerts: state.alerts,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
