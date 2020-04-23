import { Router } from "express";
import { jwt, hasAuthorization } from "../middlewares/auth";

import Poll from "../models/poll";
import User from "../models/user";

const router = Router();

router
	.route("/api/polls")
	.get((req, res) => {
		Poll.find((err, polls) => {
			if (err) {
				return res.status(400).json({ error: err });
			}
			return res.status(200).json({ polls });
		});
	})
	.post(jwt, hasAuthorization, async (req, res) => {
		try {
			const user = await User.findById(req.body.user);
			const poll = await Poll.create(req.body);
			user.polls.push(poll._id);
			await user.save();
			return res.status(201).json({ message: "New poll created!", poll });
		} catch (error) {
			return res.status(400).json({ error });
		}
	});

router.get("/api/polls/user/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const { polls } = await User.findById(userId).populate("polls");
		res.status(200).json({ polls });
	} catch (error) {
		res.status(400).json({ error });
	}
});

router
	.route("/api/polls/:pollId")
	.get((req, res) => {
		try {
			res.status(200).json(req.poll);
		} catch (error) {
			res.status(400).json({ error });
		}
	})
	.post(async (req, res) => {
		try {
			const { optionId } = req.body;
			const options = req.poll.options;
			const option = options.find(x => x._id == optionId);
			option.votes++;
			await req.poll.save();
			console.log(req.poll);
			res.status(201).json({
				message: `Voted to ${option.option}, now has ${option.votes}`,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({ error: "Can't vote!" });
		}
	})
	.put(jwt, hasAuthorization, async (req, res) => {
		try {
			const { question, options } = req.body;
			req.poll.question = question;
			req.poll.options = options;
			await req.poll.save();
			res.status(200).json({ message: "Poll updated!", poll: req.poll });
		} catch (error) {
			console.log(error);
			res.status(400).json({ error: "Can't update poll!" });
		}
	})
	.delete(jwt, hasAuthorization, async (req, res) => {
		try {
			const user = await User.findById(req.body.user);

			user.polls = user.polls.filter(poll => poll !== req.poll._id);

			await req.poll.remove();
			await user.save();
			res.status(200).json({ message: "Poll deleted!" });
		} catch (error) {
			res.status(400).json({ error: "Can't delete poll!" });
		}
	});

router.param("pollId", async (req, res, next, pollId) => {
	const poll = await Poll.findById(pollId);
	req.poll = poll;
	next();
});

export default router;
