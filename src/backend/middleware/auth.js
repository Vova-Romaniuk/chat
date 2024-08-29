const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (mongoose.Types.ObjectId.isValid(decoded.user.id)) {
			req.user = { id: mongoose.Types.ObjectId(decoded.user.id) };
		} else {
			return res.status(400).json({ msg: "Invalid user ID in token" });
		}

		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid!" });
	}
};
