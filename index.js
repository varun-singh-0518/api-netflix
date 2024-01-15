import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectUsingMongoose} from "./confiq/mongoose.js";
import userRouter from "./routes/UserRoutes.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); //This allows the application to handle JSON data in request bodies.

app.get("/", (req, res) => {
  res.send("HI!!!! Welcome");
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5001, () => {
  connectUsingMongoose();
  console.log("server started");
});
