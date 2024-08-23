const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User.js");

// @route    POST
// @desc     Authenticate user (Login)
// @access   Public
router.post(
	"/login",
	[
		check("email", "Please include a valid email!").isEmail(),
		check("password", "Password is required!").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email: email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials!" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials!" }] });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: "240h",
				},
				(err, token) => {
					if (err) throw err;

					res.json({ token: token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route    POST
// @desc     Register user
// @access   Public
router.post(
	"/register",
	[
		check("fullName", "Full name is required!").not().isEmpty(),
		check("username", "Username is required!").not().isEmpty(),
		check("email", "Please include a valid email!").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters!"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { fullName, email, password, username } = req.body;

		try {
			const userEmail = await User.findOne({ email: email });
			const userName = await User.findOne({ username: username });

			if (userEmail) {
				return res.status(409).send({
					errors: "Email already exists!",
					field: "email",
				});
			}

			if (userName) {
				return res.status(409).send({
					errors: "Username already exists!",
					field: "username",
				});
			}

			const user = new User({
				fullName,
				email,
				password,
				username,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: "240h",
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token: token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
