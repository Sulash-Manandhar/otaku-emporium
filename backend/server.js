import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";

//custom modules
import connectDB from "./config/db.js";
import routeLogger from "./middleware/routeLogger.js";
import { statusResponse } from "./constant/common.js";
import * as errorHandler from "./middleware/errorHandler.js";

//Routes
import userRoute from "./routes/user.route.js";

const port = process.env.PORT || 5000;

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(routeLogger);

//Routes
app.get("/status", (_req, res) => {
  res.json(statusResponse);
});

app.use("/api/user", userRoute);
// app.use("/api/files", require("./routes/fileRoute"));
// app.use("/api/apparels", require("./routes/apparelRoute"));

app.use(errorHandler.boomErrorHandler);
app.use(errorHandler.validationErrorHandler);
app.use(errorHandler.genericErrorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
