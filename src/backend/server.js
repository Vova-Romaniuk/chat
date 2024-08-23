const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");

const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
