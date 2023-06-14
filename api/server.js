import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import petsRoute from "./routes/pets.js";
import usersRoute from "./routes/users.js";
import clinicRoute from "./routes/clinics.js";
import roomsRoute from "./routes/rooms.js";
import groomersRoute from "./routes/groomer.js";
import timeRoute from "./routes/times.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000

//DB connection
const connect = async () => {
    await mongoose.connect(process.env.MONGO)
        .then(() => console.log("Connected to the Mongo Database"))
        .catch(err => console.log(err));
};
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
});

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Applicaion started on the home page");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/pets", petsRoute);
app.use("/api/clinics", clinicRoute);
app.use("/api/rooms", roomsRoute)
app.use("/api/groomers", groomersRoute)
app.use("/api/time", timeRoute)
app.use("/api/users", usersRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(PORT, () => {
    connect()
    console.log(`Connected to backend on port ${PORT}`);
})