import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
function SharePollModal({ pollUrl, buttonProps, buttonTitle }) {
	const [show, setShow] = useState(false);
	const [ref, setRef] = useState(null);
	const [message, setMessage] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button onClick={handleShow} {...buttonProps}>
				{buttonTitle ? buttonTitle : "Share"}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					{message !== null ? (
						<div class="alert alert-dismissible alert-info">
							<button type="button" class="close" data-dismiss="alert">
								&times;
							</button>
							Poll url copied to clipboard!
						</div>
					) : null}
					<input cols="30" value={pollUrl} rows="10" className="form-control" ref={ref => setRef(ref)} />
					<button
						className="btn btn-success my-2"
						onClick={() => {
							ref.select();
							document.execCommand("copy");
							setMessage(true);
						}}>
						Copy to Clipboard
					</button>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SharePollModal;
