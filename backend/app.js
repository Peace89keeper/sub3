import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./routes/userRoute.js"; // <--- Import the user routes
import schemeRouter from "./routes/schemeRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    // 1. Hardcode the exact URL Vite uses. Do NOT use an array or process.env here.
    origin: "http://localhost:5173", 
    // 2. Explicitly allow all methods needed
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    // 3. Allow cookies to pass through
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/schemes", schemeRouter);

app.use(cookieParser()); // Add this line!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter); // <--- Use the user routes
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

export default app;
