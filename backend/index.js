const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const userRouters = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/middleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/user", userRouters);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`.yellow.bold));
