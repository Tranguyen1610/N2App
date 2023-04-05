const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const userRouters = require("./routes/userRoutes");
const videoRouters = require("./routes/videoRoutes");
const courseRouters = require("./routes/courseRoutes");
const typeRouters = require("./routes/typeRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/middleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/user", userRouters);
app.use("/api/video", videoRouters);
app.use("/api/course", courseRouters);
app.use("/api/type",typeRouters);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`.yellow.bold));
