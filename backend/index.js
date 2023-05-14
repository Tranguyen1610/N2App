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
const otpRoutes = require("./routes/otpRoutes");
const contentRoutes = require("./routes/contentRoutes");
const requestRoutes = require("./routes/requestRoutes");


const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/middleware");

const app = express();
dotenv.config();
connectDB();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/user", userRouters);
app.use("/api/video", videoRouters);
app.use("/api/course", courseRouters);
app.use("/api/upload", uploadRoutes);
app.use("/api/type", typeRouters);
app.use("/api/comment", commentRouters);
app.use("/api/order", orderRouters);
app.use("/api/paymentMedthod", paymentMethodRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/request", requestRoutes);

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use("/stripe", express.raw({ type: "*/*" }));
app.post("/api/payment", async (req, res) => {
    try {
        // Getting data from client
        let { amount } = req.body;
        // Simple validation
        if (!amount)
            return res.status(400).json({ message: "Invalid data" });
        amount = parseInt(amount);

        // Initiate payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: "VND",
            payment_method_types: ["card"],
            metadata: { amount },
        });
        // Extracting the client secret
        const clientSecret = paymentIntent.client_secret;
        // Sending the client secret as response
        res.json({ message: "Payment initiated", clientSecret });
    } catch (err) {
        // Catch any error and send error 500 to client
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/stripe", async (req, res) => {
    // Get the signature from the headers
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        // Check if the event is sent from Stripe or a third party
        // And parse the event
        event = await stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        // Handle what happens if the event is not from Stripe
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
    // Event when a payment is initiated
    if (event.type === "payment_intent.created") {
        console.log(`${event.data.object.metadata.coin} payment initated!`);
    }
    // Event when a payment is succeeded
    if (event.type === "payment_intent.succeeded") {
        // fulfilment
        console.log(`${event.data.object.metadata.coin} payment succeeded!`);
    }
    res.json({ ok: true });
});



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`.yellow.bold));
