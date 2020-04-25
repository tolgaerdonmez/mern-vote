import { Router } from "express";
import { jwt, hasAuthorization } from "../middlewares/auth";

import Poll from "../models/poll";
import User from "../models/user";

const router = Router();

router
	.route("/api/polls")
	.get(async (req, res) => {
		try {
			const query = Poll.find({ isPrivate: false });
			const polls = await query;
			res.status(200).json({ polls });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	})
	.post(jwt, hasAuthorization, async (req, res) => {
		try {
			const user = await User.findById(req.body.user);
			const poll = await Poll.create(req.body);
			user.polls.push(poll._id);
			await user.save();
			return res.status(201).json({ message: "New poll created!", poll });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	});

router.get("/api/polls/user/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const { polls } = await User.findById(userId).populate("polls");
		res.status(200).json({ polls });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router
	.route("/api/polls/:pollId")
	.get((req, res) => {
		try {
			res.status(200).json(req.poll);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	})
	.post(async (req, res) => {
		try {
			const votedList = req.cookies["voted"] === undefined ? [] : req.cookies["voted"];
			if (votedList.find(id => id == req.poll._id)) throw new Error("Already voted");

			const { optionId } = req.body;
			const isVoted = req.poll.vote(optionId);
			if (!isVoted) throw new Error("Poll expired!");
			const option = isVoted;

			await req.poll.save();

			res.cookie("voted", [...votedList, req.poll._id]);

			res.status(201).json({
				message: `Voted to ${option.option}, now has ${option.votes}`,
			});
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	})
	.put(jwt, hasAuthorization, async (req, res) => {
		try {
			Object.keys(req.body.poll).forEach(key => {
				req.poll[key] = req.body.poll[key];
			});
			await req.poll.save();
			res.status(200).json({ message: "Poll updated!", poll: req.poll });
		} catch (error) {
			res.status(400).json({ error: error.message });
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
