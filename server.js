const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const userRoutes = require("./routes/user.routes");
const poolRoutes = require("./routes/pool.routes");
const depositeRoutes = require("./routes/deposite.routes");

const { sendEmail } = require("./utils/auth");
const { isAuth } = require("./utils/middleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/pools", poolRoutes);
app.use("/api/deposite", depositeRoutes);

app.post("/api/send-email", sendEmail);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
