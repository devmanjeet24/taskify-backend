const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const taskRoutes = require("./routes/task.route");

const app = express();
app.get("/", (req, res) => {
    res.json("hii");
});
app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

console.log("AUTH ROUTES LOADED");

app.use(cors({
  origin: "*", 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;