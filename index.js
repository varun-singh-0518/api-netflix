import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectUsingMongoose} from "./confiq/mongoose.js";
import userRouter from "./routes/UserRoutes.js";

const app = express();

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); //This allows the application to handle JSON data in request bodies.

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5001, () => {
  connectUsingMongoose();
  console.log("server started");
});
