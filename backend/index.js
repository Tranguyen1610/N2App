const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const userRouters = require("./routes/userRoutes");
const videoRouters = require("./routes/videoRoutes");
const courseRouters = require("./routes/courseRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const orderRouters = require("./routes/orderRoutes");
const typeRouters = require("./routes/typeRoutes");
const commentRouters = require("./routes/commentRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/middleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/user", userRouters);
app.use("/api/video", videoRouters);
app.use("/api/course", courseRouters);
app.use("/api/upload", uploadRoutes);
app.use("/api/type",typeRouters);
app.use("/api/comment",commentRouters);
app.use("/api/order",orderRouters);
app.use("/api/paymentMedthod",paymentMethodRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`.yellow.bold));
